-- Fix tracking tables - Add missing columns
-- Run this in your Supabase SQL Editor

-- Add missing columns to existing tables (if they exist)
DO $$
BEGIN
  -- Add status column to abandoned_carts if it doesn't exist
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'abandoned_carts') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'abandoned_carts' AND column_name = 'status') THEN
      ALTER TABLE abandoned_carts ADD COLUMN status TEXT DEFAULT 'cart_active';
    END IF;
  END IF;
  
  -- Add status column to checkout_abandonments if it doesn't exist
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'checkout_abandonments') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'checkout_abandonments' AND column_name = 'status') THEN
      ALTER TABLE checkout_abandonments ADD COLUMN status TEXT DEFAULT 'checkout_started';
    END IF;
  END IF;
  
  -- Add status column to live_visitors if it doesn't exist
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'live_visitors') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'live_visitors' AND column_name = 'status') THEN
      ALTER TABLE live_visitors ADD COLUMN status TEXT DEFAULT 'browsing';
    END IF;
  END IF;
END $$;

-- Grant ALL permissions to service_role
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Grant permissions to anon and authenticated users
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- Show current table structure
SELECT 
  table_name, 
  column_name, 
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name IN ('visitor_tracking', 'abandoned_carts', 'checkout_abandonments', 'live_visitors')
ORDER BY table_name, ordinal_position; 