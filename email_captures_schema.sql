-- Create email captures table for 10% discount popup
CREATE TABLE IF NOT EXISTS email_captures (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  session_id TEXT,
  discount_code TEXT DEFAULT 'WELCOME10',
  discount_applied BOOLEAN DEFAULT FALSE,
  applied_at TIMESTAMP WITH TIME ZONE,
  source TEXT DEFAULT 'popup', -- 'popup', 'checkout', 'cart'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_captures_email ON email_captures(email);
CREATE INDEX IF NOT EXISTS idx_email_captures_session_id ON email_captures(session_id);
CREATE INDEX IF NOT EXISTS idx_email_captures_discount_applied ON email_captures(discount_applied);
CREATE INDEX IF NOT EXISTS idx_email_captures_created_at ON email_captures(created_at);

-- Disable RLS for this table
ALTER TABLE email_captures DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON email_captures TO service_role; 