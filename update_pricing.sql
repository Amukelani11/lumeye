-- SQL Script to update pricing in Supabase
-- Run this in the Supabase SQL Editor

-- Update Lumeye Glow Wand pricing
UPDATE products 
SET price = 699.00, 
    compare_at_price = 999.00,
    updated_at = NOW()
WHERE sku = 'lumeye-glow-wand';

-- Update Lumeye Glow Kit (Bundle) pricing
UPDATE products 
SET price = 749.00, 
    compare_at_price = 1128.00,
    updated_at = NOW()
WHERE sku = 'lumeye-glow-kit';

-- Verify updates
SELECT name, price, compare_at_price, sku FROM products WHERE sku IN ('lumeye-glow-wand', 'lumeye-glow-kit');
