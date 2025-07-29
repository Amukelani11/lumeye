-- Add new columns for discount reservation system
ALTER TABLE email_captures 
ADD COLUMN IF NOT EXISTS discount_reserved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS reserved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS order_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Update existing records to have proper defaults
UPDATE email_captures 
SET 
  discount_reserved = FALSE,
  order_completed = FALSE
WHERE discount_reserved IS NULL OR order_completed IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_captures_discount_reserved 
ON email_captures(discount_reserved);

CREATE INDEX IF NOT EXISTS idx_email_captures_order_completed 
ON email_captures(order_completed);

CREATE INDEX IF NOT EXISTS idx_email_captures_email_discount 
ON email_captures(email, discount_code); 