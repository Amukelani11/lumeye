-- Create tables for abandoned cart and checkout tracking
-- Run this in your Supabase SQL Editor

-- Abandoned carts table
CREATE TABLE IF NOT EXISTS abandoned_carts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    cart_data JSONB NOT NULL,
    total_value DECIMAL(10,2) NOT NULL,
    items_count INTEGER NOT NULL,
    abandoned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    recovered_at TIMESTAMP WITH TIME ZONE,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    email_sent_count INTEGER DEFAULT 0,
    is_recovered BOOLEAN DEFAULT FALSE
);

-- Checkout abandonments table
CREATE TABLE IF NOT EXISTS checkout_abandonments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    checkout_data JSONB NOT NULL,
    total_value DECIMAL(10,2) NOT NULL,
    items_count INTEGER NOT NULL,
    abandoned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    recovered_at TIMESTAMP WITH TIME ZONE,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    email_sent_count INTEGER DEFAULT 0,
    is_recovered BOOLEAN DEFAULT FALSE
);

-- Order tracking status updates table
CREATE TABLE IF NOT EXISTS order_tracking_updates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    tracking_status VARCHAR(50) NOT NULL,
    tracking_number VARCHAR(100),
    location VARCHAR(255),
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_session_id ON abandoned_carts(session_id);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_email ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_abandoned_at ON abandoned_carts(abandoned_at);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_is_recovered ON abandoned_carts(is_recovered);

CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_session_id ON checkout_abandonments(session_id);
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_email ON checkout_abandonments(email);
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_abandoned_at ON checkout_abandonments(abandoned_at);
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_is_recovered ON checkout_abandonments(is_recovered);

CREATE INDEX IF NOT EXISTS idx_order_tracking_updates_order_id ON order_tracking_updates(order_id);
CREATE INDEX IF NOT EXISTS idx_order_tracking_updates_created_at ON order_tracking_updates(created_at);

-- Add tracking_status column to orders table if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_status VARCHAR(50) DEFAULT 'pending';

-- Update orders table to include more tracking statuses
ALTER TABLE orders 
DROP CONSTRAINT IF EXISTS orders_shipping_status_check;

ALTER TABLE orders 
ADD CONSTRAINT orders_shipping_status_check 
CHECK (shipping_status IN ('pending', 'packed', 'collected', 'in_transit', 'out_for_delivery', 'delivered', 'returned'));

-- Function to mark cart as abandoned
CREATE OR REPLACE FUNCTION mark_cart_abandoned(
    p_session_id VARCHAR(255),
    p_email VARCHAR(255) DEFAULT NULL,
    p_cart_data JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    cart_record RECORD;
    abandoned_cart_id UUID;
BEGIN
    -- Get cart data if not provided
    IF p_cart_data IS NULL THEN
        SELECT 
            c.id,
            c.session_id,
            jsonb_agg(
                jsonb_build_object(
                    'product_id', ci.product_id,
                    'quantity', ci.quantity,
                    'unit_price', ci.unit_price,
                    'product_name', p.name,
                    'product_image', p.images->0
                )
            ) as items,
            COALESCE(SUM(ci.unit_price * ci.quantity), 0) as total_value,
            COALESCE(SUM(ci.quantity), 0) as items_count
        INTO cart_record
        FROM carts c
        LEFT JOIN cart_items ci ON c.id = ci.cart_id
        LEFT JOIN products p ON ci.product_id = p.id
        WHERE c.session_id = p_session_id
        GROUP BY c.id, c.session_id;
    ELSE
        cart_record := p_cart_data;
    END IF;

    -- Insert abandoned cart record
    INSERT INTO abandoned_carts (
        session_id,
        email,
        cart_data,
        total_value,
        items_count
    ) VALUES (
        p_session_id,
        p_email,
        COALESCE(p_cart_data, cart_record.items),
        cart_record.total_value,
        cart_record.items_count
    ) RETURNING id INTO abandoned_cart_id;

    RETURN abandoned_cart_id;
END;
$$ LANGUAGE plpgsql;

-- Function to mark checkout as abandoned
CREATE OR REPLACE FUNCTION mark_checkout_abandoned(
    p_session_id VARCHAR(255),
    p_email VARCHAR(255),
    p_checkout_data JSONB
)
RETURNS UUID AS $$
DECLARE
    abandoned_checkout_id UUID;
BEGIN
    INSERT INTO checkout_abandonments (
        session_id,
        email,
        checkout_data,
        total_value,
        items_count
    ) VALUES (
        p_session_id,
        p_email,
        p_checkout_data,
        (p_checkout_data->>'total_value')::DECIMAL(10,2),
        (p_checkout_data->>'items_count')::INTEGER
    ) RETURNING id INTO abandoned_checkout_id;

    RETURN abandoned_checkout_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update order tracking status
CREATE OR REPLACE FUNCTION update_order_tracking(
    p_order_id UUID,
    p_tracking_status VARCHAR(50),
    p_tracking_number VARCHAR(100) DEFAULT NULL,
    p_location VARCHAR(255) DEFAULT NULL,
    p_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    tracking_update_id UUID;
BEGIN
    -- Update order tracking status
    UPDATE orders 
    SET 
        tracking_status = p_tracking_status,
        tracking_number = COALESCE(p_tracking_number, tracking_number),
        updated_at = NOW()
    WHERE id = p_order_id;

    -- Insert tracking update record
    INSERT INTO order_tracking_updates (
        order_id,
        tracking_status,
        tracking_number,
        location,
        description
    ) VALUES (
        p_order_id,
        p_tracking_status,
        p_tracking_number,
        p_location,
        p_description
    ) RETURNING id INTO tracking_update_id;

    RETURN tracking_update_id;
END;
$$ LANGUAGE plpgsql; 