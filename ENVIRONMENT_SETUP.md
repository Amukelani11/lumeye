# Environment Setup Guide

## Fixing the Yoco Checkout URL Issue

The error you're seeing indicates that the `NEXT_PUBLIC_YOCO_BASE_URL` environment variable is not set correctly for your current setup.

### For Local Development:

If you're running locally, set:
```bash
NEXT_PUBLIC_YOCO_BASE_URL=http://localhost:3000
```

### For Tunnel Services (like ngrok, localtunnel, etc.):

If you're using a tunnel service to expose your local server, set the URL to your tunnel URL:
```bash
NEXT_PUBLIC_YOCO_BASE_URL=https://your-tunnel-url.ngrok.io
# or
NEXT_PUBLIC_YOCO_BASE_URL=https://lumeye.loca.lt
```

### For Production:

Set to your actual domain:
```bash
NEXT_PUBLIC_YOCO_BASE_URL=https://yourdomain.com
```

## Complete Environment Variables

Create a `.env.local` file in your project root with these variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment Processing - Yoco
YOCO_SECRET_KEY=sk_test_your_yoco_secret_key
NEXT_PUBLIC_YOCO_BASE_URL=https://your-actual-domain.com
YOCO_WEBHOOK_SECRET=your_yoco_webhook_secret

# Email Service - Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=hello@lumeye.co.za
RESEND_ADMIN_EMAIL=admin@lumeye.co.za

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-actual-domain.com
```

## Database Schema Fix

Run the `fix_all_schema_issues.sql` script in your Supabase SQL Editor to fix the database schema issues.

## Testing the Fix

1. Update your environment variables
2. Restart your development server
3. Try creating a checkout again
4. Check the console logs for any remaining errors

The improved error handling will now provide better debugging information if issues persist. 