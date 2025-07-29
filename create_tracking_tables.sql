-- Create tracking tables for visitor analytics
-- Run this in your Supabase SQL Editor

-- Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS visitor_tracking CASCADE;
DROP TABLE IF EXISTS abandoned_carts CASCADE;
DROP TABLE IF EXISTS checkout_abandonments CASCADE;
DROP TABLE IF EXISTS live_visitors CASCADE;

-- 1. Create visitor_tracking table
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

-- 2. Create abandoned_carts table
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

-- 3. Create checkout_abandonments table
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

-- 4. Create live_visitors table
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
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_action ON visitor_tracking(action);

CREATE INDEX IF NOT EXISTS idx_abandoned_carts_session_id ON abandoned_carts(session_id);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_email ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_status ON abandoned_carts(status);

CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_session_id ON checkout_abandonments(session_id);
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_email ON checkout_abandonments(email);
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_status ON checkout_abandonments(status);

CREATE INDEX IF NOT EXISTS idx_live_visitors_session_id ON live_visitors(session_id);
CREATE INDEX IF NOT EXISTS idx_live_visitors_last_activity ON live_visitors(last_activity);
CREATE INDEX IF NOT EXISTS idx_live_visitors_status ON live_visitors(status);

-- Disable RLS for all tracking tables
ALTER TABLE visitor_tracking DISABLE ROW LEVEL SECURITY;
ALTER TABLE abandoned_carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE checkout_abandonments DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_visitors DISABLE ROW LEVEL SECURITY;

-- Grant ALL permissions to service_role
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Grant specific permissions to each table
GRANT ALL ON visitor_tracking TO service_role;
GRANT ALL ON visitor_tracking_id_seq TO service_role;
GRANT ALL ON abandoned_carts TO service_role;
GRANT ALL ON abandoned_carts_id_seq TO service_role;
GRANT ALL ON checkout_abandonments TO service_role;
GRANT ALL ON checkout_abandonments_id_seq TO service_role;
GRANT ALL ON live_visitors TO service_role;
GRANT ALL ON live_visitors_id_seq TO service_role;

-- Grant permissions to anon and authenticated users for read access
GRANT SELECT ON visitor_tracking TO anon, authenticated;
GRANT SELECT ON abandoned_carts TO anon, authenticated;
GRANT SELECT ON checkout_abandonments TO anon, authenticated;
GRANT SELECT ON live_visitors TO anon, authenticated;

-- Grant insert/update permissions to anon and authenticated users
GRANT INSERT, UPDATE ON visitor_tracking TO anon, authenticated;
GRANT INSERT, UPDATE ON abandoned_carts TO anon, authenticated;
GRANT INSERT, UPDATE ON checkout_abandonments TO anon, authenticated;
GRANT INSERT, UPDATE ON live_visitors TO anon, authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- Verify tables were created
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name IN ('visitor_tracking', 'abandoned_carts', 'checkout_abandonments', 'live_visitors')
ORDER BY table_name, ordinal_position; 