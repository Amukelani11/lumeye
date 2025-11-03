# URL Parameter Tracking Setup

This system captures URL parameters (UTM parameters, Facebook click IDs, Google click IDs, etc.) to track which campaigns and sources lead to purchases.

## How It Works

1. **Automatic Capture**: When a user visits your site with URL parameters, they are automatically captured and stored in localStorage
2. **Persistent Storage**: Tracking parameters persist across pages until a purchase is completed
3. **Purchase Attribution**: When an order is created, all tracking parameters are saved with the order
4. **Clean Up**: Tracking parameters are cleared after a successful purchase

## Tracked Parameters

### UTM Parameters
- `utm_source` - The source of the traffic (e.g., "facebook", "google", "email")
- `utm_medium` - The medium of the traffic (e.g., "cpc", "email", "social")
- `utm_campaign` - The campaign name (e.g., "summer_sale_2024")
- `utm_term` - The keyword or term
- `utm_content` - The content identifier (for A/B testing)

### Platform-Specific
- `fbclid` - Facebook Click ID (automatically added by Facebook)
- `gclid` - Google Click ID (automatically added by Google Ads)

### Custom Parameters
- `ref` - Referral source
- `source` - Custom source identifier
- `campaign` - Custom campaign identifier

## Example URLs

```
https://lumeye.co.za/product?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale
https://lumeye.co.za/?fbclid=ABC123&utm_source=facebook&utm_medium=social
https://lumeye.co.za/product?gclid=XYZ789&utm_source=google&utm_medium=cpc&utm_campaign=led_therapy
```

## Where Tracking Parameters Are Stored

### In Orders
Tracking parameters are stored in the `notes` field of each order as JSON. Example:

```json
{
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "summer_sale",
  "fbclid": "ABC123"
}
```

### Accessing Tracking Data

You can query orders and extract tracking parameters from the `notes` field:

```sql
-- Example: Find all orders from Facebook campaigns
SELECT * FROM orders 
WHERE notes LIKE '%"utm_source":"facebook"%';
```

## Usage in Admin Dashboard

To view tracking parameters for orders:

1. Go to Admin Dashboard > Orders
2. View order details
3. Check the `notes` field for tracking parameters
4. Parse the JSON to see campaign attribution

## Testing

To test URL parameter tracking:

1. Visit your site with tracking parameters:
   ```
   https://lumeye.co.za/product?utm_source=test&utm_campaign=test_campaign
   ```

2. Add a product to cart and complete checkout

3. Check the order in your database - the `notes` field should contain:
   ```
   Tracking Params: {"utm_source":"test","utm_campaign":"test_campaign"}
   ```

## Integration with Analytics

### Facebook Pixel
When you have both URL tracking and Facebook Pixel:
- URL parameters capture the source/campaign
- Facebook Pixel tracks the conversion event
- You can match them up using the order data

### Google Analytics
UTM parameters are automatically captured and can be viewed in:
- Google Analytics > Acquisition > Campaigns
- The tracking parameters stored in orders provide additional server-side confirmation

## Custom Tracking

To add custom tracking parameters, simply add them to the URL:

```
https://lumeye.co.za/?custom_param=value
```

The system will automatically capture any URL parameters and store them with the purchase.

## Files Involved

- `lib/url-tracking.ts` - Core tracking utility
- `app/components/ClientTrackingInit.tsx` - Initializes tracking on page load
- `app/components/CheckoutForm.tsx` - Includes tracking params in checkout
- `app/order-confirmation/OrderConfirmationContent.tsx` - Passes tracking to order API
- `app/api/orders/route.ts` - Stores tracking params with order

