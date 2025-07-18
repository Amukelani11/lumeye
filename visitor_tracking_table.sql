-- Create visitor tracking table
-- Run this in your Supabase SQL Editor

-- Visitor tracking table
CREATE TABLE IF NOT EXISTS visitor_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    page VARCHAR(255) NOT NULL,
    action VARCHAR(100) DEFAULT 'page_view',
    user_agent TEXT,
    referrer TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_session_id ON visitor_tracking(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_created_at ON visitor_tracking(created_at);
CREATE INDEX IF NOT EXISTS idx_visitor_tracking_page ON visitor_tracking(page);

-- Enable RLS (but allow all operations for now since we disabled RLS)
-- ALTER TABLE visitor_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
-- CREATE POLICY "Allow all visitor tracking operations" ON visitor_tracking
--     FOR ALL USING (true);

-- Add some sample data for testing
INSERT INTO visitor_tracking (session_id, page, action, user_agent, referrer, ip_address) VALUES
('session_test_1', '/', 'page_view', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '', '127.0.0.1'),
('session_test_1', '/product', 'page_view', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '/', '127.0.0.1'),
('session_test_2', '/', 'page_view', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '', '192.168.1.1'),
('session_test_2', '/cart', 'page_view', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '/product', '192.168.1.1'),
('session_test_3', '/', 'page_view', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', '', '10.0.0.1'),
('session_test_3', '/checkout', 'page_view', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', '/cart', '10.0.0.1')
ON CONFLICT DO NOTHING; 