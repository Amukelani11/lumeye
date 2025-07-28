-- Add reminder tracking fields to checkout_abandonments table

-- Add columns for tracking reminder emails
ALTER TABLE checkout_abandonments 
ADD COLUMN IF NOT EXISTS first_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_reminder_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS second_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS second_reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- Create index for efficient reminder queries
CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_reminders 
ON checkout_abandonments(status, checkout_started_at, first_reminder_sent, second_reminder_sent);

-- Update existing records to have default values
UPDATE checkout_abandonments 
SET 
  first_reminder_sent = FALSE,
  second_reminder_sent = FALSE
WHERE first_reminder_sent IS NULL OR second_reminder_sent IS NULL; 