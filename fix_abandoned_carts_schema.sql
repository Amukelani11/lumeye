-- Fix abandoned_carts table schema
-- Run this in your Supabase SQL Editor to ensure all columns exist

-- Drop and recreate the abandoned_carts table with the correct schema
DROP TABLE IF EXISTS abandoned_carts CASCADE;

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_session_id ON abandoned_carts(session_id);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_email ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_status ON abandoned_carts(status);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_captured_at ON abandoned_carts(captured_at);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_last_cart_activity ON abandoned_carts(last_cart_activity);

-- Disable RLS for this table
ALTER TABLE abandoned_carts DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON abandoned_carts TO service_role;
GRANT ALL ON abandoned_carts_id_seq TO service_role;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema'; 