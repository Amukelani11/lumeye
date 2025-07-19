-- Fix RLS policies for newsletter_subscriptions table
-- This script ensures that API calls can insert/update newsletter subscriptions

-- First, let's check if RLS is enabled on the table
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'newsletter_subscriptions';

-- Disable RLS temporarily for newsletter_subscriptions table
ALTER TABLE newsletter_subscriptions DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS enabled, create a policy that allows all operations
-- CREATE POLICY "Allow all newsletter operations" ON newsletter_subscriptions
-- FOR ALL USING (true) WITH CHECK (true);

-- Grant necessary permissions to the service role
GRANT ALL ON newsletter_subscriptions TO service_role;
GRANT ALL ON newsletter_subscriptions TO anon;
GRANT ALL ON newsletter_subscriptions TO authenticated;

-- Check the table structure
\d newsletter_subscriptions

-- Show current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'newsletter_subscriptions'; 