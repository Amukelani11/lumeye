# Automatic Email Reminders Setup Guide

## Overview
This guide explains how to set up automatic email reminders for abandoned carts and checkout abandonments that send after 1 hour and 2 hours.

## How It Works

The system automatically sends reminder emails:
- **1 hour** after cart abandonment or checkout start
- **2 hours** after cart abandonment or checkout start (second reminder)

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Cron Job Security
CRON_SECRET=your_secure_cron_secret_here

# Email Service
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=hello@lumeye.co.za

# Base URL for recovery links
NEXT_PUBLIC_YOCO_BASE_URL=https://your-domain.com
```

## Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Add reminder tracking columns to abandoned_carts table
ALTER TABLE abandoned_carts 
ADD COLUMN IF NOT EXISTS first_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_reminder_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS second_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS second_reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- Add reminder tracking columns to checkout_abandonments table
ALTER TABLE checkout_abandonments 
ADD COLUMN IF NOT EXISTS first_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_reminder_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS second_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS second_reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_first_reminder 
ON abandoned_carts(first_reminder_sent, last_cart_activity);

CREATE INDEX IF NOT EXISTS idx_abandoned_carts_second_reminder 
ON abandoned_carts(second_reminder_sent, last_cart_activity);

CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_first_reminder 
ON checkout_abandonments(first_reminder_sent, checkout_started_at);

CREATE INDEX IF NOT EXISTS idx_checkout_abandonments_second_reminder 
ON checkout_abandonments(second_reminder_sent, checkout_started_at);
```

## Setting Up Cron Jobs

### Option 1: Vercel Cron Jobs (Recommended)

1. **Add to vercel.json** (create if it doesn't exist):
```json
{
  "crons": [
    {
      "path": "/api/cron/email-reminders",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

2. **Deploy to Vercel** - The cron job will automatically run every 5 minutes.

### Option 2: External Cron Service (Cron-job.org)

1. Go to [cron-job.org](https://cron-job.org)
2. Create a new account
3. Add a new cron job:
   - **URL**: `https://your-domain.com/api/cron/email-reminders`
   - **Schedule**: Every 5 minutes
   - **Headers**: 
     - `Authorization`: `Bearer your_secure_cron_secret_here`
     - `Content-Type`: `application/json`

### Option 3: GitHub Actions

Create `.github/workflows/cron.yml`:
```yaml
name: Email Reminders Cron

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes

jobs:
  cron:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Email Reminders
        run: |
          curl -X POST https://your-domain.com/api/cron/email-reminders \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json"
```

## Testing the Cron Job

### Manual Test
```bash
curl -X POST https://your-domain.com/api/cron/email-reminders \
  -H "Authorization: Bearer your_secure_cron_secret_here" \
  -H "Content-Type: application/json"
```

### Expected Response
```json
{
  "success": true,
  "totalEmailsSent": 2,
  "abandonedCartFirstRemindersSent": 1,
  "abandonedCartSecondRemindersSent": 0,
  "checkoutFirstRemindersSent": 1,
  "checkoutSecondRemindersSent": 0,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Monitoring

### Check Cron Job Logs
- **Vercel**: Go to your project dashboard → Functions → View logs
- **External**: Check your cron service dashboard
- **GitHub Actions**: Check the Actions tab in your repository

### Admin Dashboard
- Go to `/admin/abandoned-carts` to see abandoned carts
- Go to `/admin/checkout-abandonments` to see checkout abandonments
- Check the `email_sent_count` and reminder timestamps

## Troubleshooting

### Common Issues

1. **No emails being sent**
   - Check if `RESEND_API_KEY` is set correctly
   - Verify the cron job is running (check logs)
   - Ensure abandoned carts have email addresses

2. **Duplicate emails**
   - The system prevents duplicates by tracking `first_reminder_sent` and `second_reminder_sent`
   - Check if the database columns were added correctly

3. **Cron job not running**
   - Verify the cron service is active
   - Check if the URL is accessible
   - Ensure the `CRON_SECRET` is set correctly

### Debug Mode

Add this to your cron job URL to see detailed logs:
```
https://your-domain.com/api/cron/email-reminders?debug=true
```

## Email Templates

The system uses these email templates:
- **Abandoned Cart**: `EmailService.sendAbandonedCartEmail()`
- **Checkout Abandonment**: `EmailService.sendCheckoutAbandonmentReminder()`

Both include:
- Cart/checkout items
- Total value
- Recovery link
- Professional styling

## Security

- The cron job requires a valid `CRON_SECRET` in the Authorization header
- Only authorized cron services can trigger the reminders
- Emails are only sent to verified email addresses
- Duplicate emails are prevented through database tracking 