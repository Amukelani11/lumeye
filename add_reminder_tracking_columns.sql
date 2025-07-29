-- Add reminder tracking columns to abandoned_carts table
ALTER TABLE abandoned_carts 
ADD COLUMN IF NOT EXISTS first_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_reminder_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS second_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS second_reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- Add reminder tracking columns to checkout_abandonments table
ALTER TABLE checkout_abandonments 
ADD COLUMN IF NOT EXISTS first_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_reminder_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS second_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS second_reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_first_reminder 
ON abandoned_carts(first_reminder_sent, last_cart_activity);

CREATE INDEX IF NOT EXISTS idx_abandoned_carts_second_reminder 
ON abandoned_carts(second_reminder_sent, last_cart_activity);

CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_first_reminder 
ON checkout_abandonments(first_reminder_sent, checkout_started_at);

CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_second_reminder 
ON checkout_abandonments(second_reminder_sent, checkout_started_at); 