-- Create announcements table for live popup announcements
-- Run this in your Supabase SQL Editor

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT DEFAULT 'admin',
  dismissed_by JSONB DEFAULT '[]' -- Array of session IDs that dismissed this announcement
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_expires_at ON announcements(expires_at);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON announcements(created_at);

-- Disable RLS for announcements table
ALTER TABLE announcements DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON announcements TO service_role;
GRANT ALL ON announcements_id_seq TO service_role;
GRANT SELECT ON announcements TO anon, authenticated;
GRANT UPDATE ON announcements TO anon, authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- Insert a sample announcement
INSERT INTO announcements (title, message, type, is_active) 
VALUES ('Checkout Fixed!', 'Our checkout system has been fixed and is now working properly. You can now complete your purchases!', 'success', true); 