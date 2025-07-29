-- Quick fix for schema cache issues
-- Run this in your Supabase SQL Editor

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- Verify the checkout_abandonments table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'checkout_abandonments'
ORDER BY ordinal_position;

-- If cart_value column doesn't exist, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'checkout_abandonments' 
    AND column_name = 'cart_value'
  ) THEN
    ALTER TABLE checkout_abandonments ADD COLUMN cart_value DECIMAL(10,2) DEFAULT 0;
  END IF;
END $$;

-- Refresh schema cache again
NOTIFY pgrst, 'reload schema'; 