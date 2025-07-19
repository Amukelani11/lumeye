-- Create visitor tracking tables for real-time admin dashboard

-- Visitor tracking table
CREATE TABLE IF NOT EXISTS visitor_tracking (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  action TEXT NOT NULL, -- 'page_view', 'cart_add', 'checkout_start', 'purchase', 'email_capture'
  page TEXT,
  email TEXT,
  cart_value DECIMAL(10,2) DEFAULT 0,
  items JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abandoned carts table
CREATE TABLE IF NOT EXISTS abandoned_carts (
  id SERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  email TEXT,
  cart_value DECIMAL(10,2) DEFAULT 0,
  items JSONB,
  last_cart_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  captured_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'cart_active', -- 'cart_active', 'email_captured', 'converted'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Checkout abandonments table
CREATE TABLE IF NOT EXISTS checkout_abandonments (
  id SERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  email TEXT,
  cart_value DECIMAL(10,2) DEFAULT 0,
  items JSONB,
  checkout_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'checkout_started', -- 'checkout_started', 'converted'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Live visitors table (for real-time dashboard)
CREATE TABLE IF NOT EXISTS live_visitors (
  id SERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  current_page TEXT,
  email TEXT,
  cart_value DECIMAL(10,2) DEFAULT 0,
  items JSONB,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'browsing', -- 'browsing', 'cart', 'checkout', 'purchased'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_session_id ON visitor_tracking(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_timestamp ON visitor_tracking(timestamp);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_status ON abandoned_carts(status);
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_status ON checkout_abandonments(status);
CREATE INDEX IF NOT EXISTS idx_live_visitors_last_activity ON live_visitors(last_activity);

-- Disable RLS for these tables (they're for tracking, not user data)
ALTER TABLE visitor_tracking DISABLE ROW LEVEL SECURITY;
ALTER TABLE abandoned_carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_abandonments DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_visitors DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON visitor_tracking TO service_role;
GRANT ALL ON abandoned_carts TO service_role;
GRANT ALL ON checkout_abandonments TO service_role;
GRANT ALL ON live_visitors TO service_role; 