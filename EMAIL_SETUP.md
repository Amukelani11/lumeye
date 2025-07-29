# Email Setup Guide for Lumeye E-commerce

## Overview
This guide explains how to set up email functionality for the Lumeye e-commerce platform, including abandoned cart emails, checkout abandonment emails, and failed payment emails.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Email Service - Resend Configuration
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=hello@lumeye.co.za
RESEND_ADMIN_EMAIL=admin@lumeye.co.za

# Base URL for recovery links
NEXT_PUBLIC_YOCO_BASE_URL=http://localhost:3000
```

## Setting up Resend

1. **Create a Resend Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account
   - Verify your email address

2. **Get Your API Key**
   - In your Resend dashboard, go to API Keys
   - Create a new API key
   - Copy the API key and add it to your `.env.local` file

3. **Verify Your Domain (Optional but Recommended)**
   - Add your domain to Resend
   - Follow the DNS verification steps
   - This improves email deliverability

## Testing Email Functionality

### 1. Test Email API
Use the test email endpoint to verify your setup:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-test-email@example.com",
    "type": "abandoned_cart"
  }'
```

### 2. Test from Admin Panel
- Go to `/admin/abandoned-carts`
- Click the green test email button next to any email
- Check if the email is received

### 3. Test Failed Payment Email
- Go to `/admin/email-captures`
- Click the red alert triangle button to send a failed payment email

## Email Types Available

### 1. Abandoned Cart Emails
- **Trigger**: When a customer leaves items in their cart
- **Purpose**: Encourage customers to complete their purchase
- **Content**: Cart items, total value, recovery link

### 2. Checkout Abandonment Emails
- **Trigger**: When a customer starts checkout but doesn't complete it
- **Purpose**: Remind customers to finish their order
- **Content**: Order summary, secure checkout link

### 3. Failed Payment Emails
- **Trigger**: When a payment fails during checkout
- **Purpose**: Help customers resolve payment issues
- **Content**: Error details, troubleshooting tips, retry link

## Troubleshooting

### Common Issues

1. **"Email service not configured" Error**
   - Check that `RESEND_API_KEY` is set in your environment
   - Verify the API key is valid in your Resend dashboard

2. **Emails not being sent**
   - Check the browser console for error messages
   - Verify your Resend account has sending credits
   - Check if your domain is verified (if using custom domain)

3. **Emails going to spam**
   - Verify your domain with Resend
   - Use a professional from email address
   - Avoid spam trigger words in subject lines

### Debug Steps

1. **Check Environment Variables**
   ```bash
   echo $RESEND_API_KEY
   echo $RESEND_FROM_EMAIL
   ```

2. **Test API Key**
   ```bash
   curl -X GET https://api.resend.com/domains \
     -H "Authorization: Bearer $RESEND_API_KEY"
   ```

3. **Check Server Logs**
   - Look for email-related errors in your server logs
   - Check the browser console for client-side errors

## Email Templates

All email templates are located in `lib/email.ts` and include:

- **Responsive Design**: Works on mobile and desktop
- **Brand Colors**: Uses Lumeye pink theme
- **Clear CTAs**: Prominent buttons for actions
- **Professional Layout**: Clean, modern design

## Monitoring

- Check Resend dashboard for delivery rates
- Monitor bounce rates and spam complaints
- Track email open rates and click-through rates
- Review failed email logs in your server console

## Best Practices

1. **Rate Limiting**: Don't send too many emails too quickly
2. **Personalization**: Use customer names when available
3. **Clear Subject Lines**: Make them compelling but not spammy
4. **Mobile Optimization**: Ensure emails look good on mobile
5. **Unsubscribe Options**: Include unsubscribe links in marketing emails

## Support

If you're still having issues:

1. Check the Resend documentation: [docs.resend.com](https://docs.resend.com)
2. Review your server logs for detailed error messages
3. Test with a simple email first before using complex templates
4. Verify your domain setup if using custom domains 