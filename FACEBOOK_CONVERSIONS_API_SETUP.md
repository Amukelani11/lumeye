# Facebook Conversions API Setup

This guide explains how to set up Facebook Conversions API for server-side event tracking with test event code support.

## Overview

The Facebook Conversions API allows you to send server-side events directly to Facebook, providing better attribution and tracking accuracy, especially with iOS 14.5+ privacy changes.

## Environment Variables

Add the following environment variables to your `.env.local` or deployment environment:

```env
# Facebook Pixel ID (required)
FACEBOOK_PIXEL_ID=1355100322913889

# Facebook Access Token (required for server-side events)
# Get this from: Facebook Events Manager > Data Sources > Settings > Access Token
FACEBOOK_ACCESS_TOKEN=your_access_token_here

# Test Event Code (optional - for testing)
# Use this to test server events in Facebook Events Manager
FACEBOOK_TEST_EVENT_CODE=TEST83486

# Enable Test Event Code (set to 'true' to use test event code in production)
# Set this to 'true' when testing, 'false' or remove for production
FACEBOOK_USE_TEST_EVENT_CODE=true
```

## How to Get Your Facebook Access Token

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel (ID: 1355100322913889)
3. Go to **Settings** > **Conversions API**
4. Click **Generate Access Token** or use an existing one
5. Copy the access token and add it to your environment variables

## Testing Server Events

### Using Test Event Code

1. **Enable Test Mode**: Set `FACEBOOK_USE_TEST_EVENT_CODE=true` in your environment variables
2. **Test Code**: The test code `TEST83486` is already configured
3. **Send Test Event**: Complete a purchase on your website
4. **View in Events Manager**: 
   - Go to Facebook Events Manager
   - Click on **Test Events** in the left sidebar
   - You should see your test events appear in real-time

### Test Event Code in API

The test event code is automatically included in server-side events when:
- `FACEBOOK_USE_TEST_EVENT_CODE=true` is set in environment variables
- OR when running in development mode (`NODE_ENV !== 'production'`)

### Viewing Test Events

1. Go to Facebook Events Manager
2. Select your Pixel
3. Click **Test Events** (in the left sidebar)
4. You should see events appear as you test them on your website

## Events Tracked

### Purchase Event

The `Purchase` event is automatically sent when:
- A customer completes a purchase
- Payment is verified
- Order is created in the database

**Event Data Includes:**
- Customer email (hashed)
- Customer phone (hashed)
- Customer name (hashed)
- Shipping address (hashed)
- Order ID
- Order total
- Product details (items, quantities, prices)

### InitiateCheckout Event

Available method `sendInitiateCheckoutEvent()` for tracking when users start checkout (can be added to checkout page if needed).

## Security Notes

- All PII (Personally Identifiable Information) is hashed using SHA-256 before sending to Facebook
- Email, phone, name, and address data are automatically hashed
- Events include unique event IDs to prevent duplicate tracking

## Troubleshooting

### Events Not Appearing

1. **Check Access Token**: Verify `FACEBOOK_ACCESS_TOKEN` is set correctly
2. **Check Test Mode**: If using test events, ensure `FACEBOOK_USE_TEST_EVENT_CODE=true`
3. **Check Logs**: Server-side errors are logged to console
4. **Verify Pixel ID**: Ensure `FACEBOOK_PIXEL_ID` matches your pixel

### Common Issues

- **"Invalid Access Token"**: Regenerate the access token in Events Manager
- **"Test events not showing"**: Ensure test event code is correctly set in environment variables
- **"Events delayed"**: Facebook may take a few minutes to process events

## Production Deployment

Before going live:
1. Set `FACEBOOK_USE_TEST_EVENT_CODE=false` or remove it
2. Verify `FACEBOOK_ACCESS_TOKEN` is set in production environment
3. Test a real purchase to ensure events are being sent
4. Monitor Events Manager for incoming events

## Additional Resources

- [Facebook Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Test Events Tool](https://developers.facebook.com/docs/meta-pixel/test-events)
- [Events Manager](https://business.facebook.com/events_manager2)

