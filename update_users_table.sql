-- Add is_admin column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create an admin user (replace with actual admin email)
-- INSERT INTO users (email, first_name, last_name, is_admin, email_verified) 
-- VALUES ('admin@lumeye.com', 'Admin', 'User', TRUE, TRUE)
-- ON CONFLICT (email) DO UPDATE SET is_admin = TRUE;

-- Update existing user to be admin (replace 'your-email@example.com' with actual email)
-- UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com'; 