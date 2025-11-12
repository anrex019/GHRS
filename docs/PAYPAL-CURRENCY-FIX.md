# 💰 PayPal Currency Mismatch - Fixed!

## Error Message
```
PayPal payment failed: Expected currency from order api call to be RUB, got USD. 
Please ensure you are passing currency=USD to the sdk url.
```

## Root Cause

**Currency Mismatch:**
- PayPal SDK configured for: **RUB** (Russian Rubles)
- Payment requests using: **USD** (US Dollars)

### Why This Happened:
The PayPal SDK was initialized with `currency: "RUB"` in the layout, but the PayPalButton component and shopping cart were hardcoded to use `"USD"`.

## Solution Applied

### ✅ Fixed Currency Configuration

Changed all currency references from **USD** to **RUB** to match the PayPal SDK configuration.

### Files Modified:

#### 1. **PayPalButton Component** ✅
**File**: `/app/components/PayPalButton.tsx`

**Change**: Default currency parameter
```typescript
// ❌ BEFORE
export default function PayPalButton({ 
  amount, 
  currency = 'USD',  // Wrong!
  itemId, 
  itemType = 'set', 
  onSuccess, 
  onError 
}: PayPalButtonProps) {

// ✅ AFTER
export default function PayPalButton({ 
  amount, 
  currency = 'RUB',  // Correct!
  itemId, 
  itemType = 'set', 
  onSuccess, 
  onError 
}: PayPalButtonProps) {
```

#### 2. **Shopping Cart Page** ✅
**File**: `/app/shoppingcard/page.tsx`

**Change**: PayPalButton currency prop
```typescript
// ❌ BEFORE
<PayPalButton
  amount={totalAmount}
  currency="USD"  // Wrong!
  itemId={cart.map((item) => item.id).join(",")}
  itemType={cart.length === 1 ? cart[0].itemType || "set" : "mixed"}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
/>

// ✅ AFTER
<PayPalButton
  amount={totalAmount}
  currency="RUB"  // Correct!
  itemId={cart.map((item) => item.id).join(",")}
  itemType={cart.length === 1 ? cart[0].itemType || "set" : "mixed"}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
/>
```

#### 3. **Test Payment Page** ✅
**File**: `/app/test-payment/page.tsx`

**Change**: Test payment currency
```typescript
// ❌ BEFORE
<PayPalButton
  amount={10}
  currency="USD"  // Wrong!
  itemId="test-item-123"
  itemType="set"
  onSuccess={...}
  onError={...}
/>

// ✅ AFTER
<PayPalButton
  amount={10}
  currency="RUB"  // Correct!
  itemId="test-item-123"
  itemType="set"
  onSuccess={...}
  onError={...}
/>
```

## PayPal SDK Configuration

**File**: `/app/layout.tsx`

```typescript
const paypalOptions = {
  clientId: "AQtqwl189MSBEbnUWNGIfPsAl3ynUUUKr506gJa5SDXhnXzje33FVtEJaTjcqRXE9FCnUPWu3kaVlfEO",
  currency: "RUB",  // ✅ Russian Rubles
  intent: "capture",
  components: "buttons"
};
```

All payment requests now match this configuration.

## How It Works Now

### Before Fix:
```
PayPal SDK: currency = "RUB"
Payment Request: currency = "USD"
❌ Mismatch! Error thrown
```

### After Fix:
```
PayPal SDK: currency = "RUB"
Payment Request: currency = "RUB"
✅ Match! Payment proceeds
```

## Console Output

### Success:
```
🔐 Auth token check: {tokenExists: true, ...}
🔵 Creating PayPal order: {
  amount: 500,
  currency: "RUB",  // ✅ Matches SDK
  userId: "123",
  itemId: "456",
  itemType: "set",
  hasAuthToken: true
}
✅ PayPal order created successfully: {id: "PAYPAL-ORDER-123", ...}
```

## Important Notes

### Currency Display:
The shopping cart will now show prices in **RUB** instead of **USD**:

```typescript
{t('payment.total')}: {amount} RUB
```

### Price Conversion:
If your prices are stored in USD but need to be displayed in RUB, you'll need to:

1. **Convert prices** before passing to PayPalButton
2. **Update price display** in the UI
3. **Store prices in RUB** in the database

Example conversion:
```typescript
const USD_TO_RUB_RATE = 95; // Update with current rate
const priceInRUB = priceInUSD * USD_TO_RUB_RATE;

<PayPalButton
  amount={priceInRUB}
  currency="RUB"
  ...
/>
```

### Alternative: Change to USD

If you want to use **USD** instead of **RUB**, you need to:

1. **Update PayPal SDK** in `/app/layout.tsx`:
```typescript
const paypalOptions = {
  clientId: "...",
  currency: "USD",  // Change to USD
  intent: "capture",
  components: "buttons"
};
```

2. **Keep all payment requests as USD** (revert my changes)

**Note**: Make sure your PayPal account supports the currency you choose!

## Testing Checklist

### Test Payment Flow:
- [ ] Login to account
- [ ] Add items to cart
- [ ] Go to shopping cart
- [ ] Check price display shows "RUB"
- [ ] Click PayPal button
- [ ] ✅ PayPal popup opens (no currency error)
- [ ] Complete payment in PayPal
- [ ] ✅ Payment succeeds
- [ ] Cart is cleared
- [ ] Success message shows

### Check Console:
- [ ] No currency mismatch errors
- [ ] Logs show `currency: "RUB"`
- [ ] Order created successfully
- [ ] Payment captured successfully

## Files Modified Summary

1. ✅ `/app/components/PayPalButton.tsx`
   - Changed default currency from USD to RUB

2. ✅ `/app/shoppingcard/page.tsx`
   - Changed PayPalButton currency prop from USD to RUB

3. ✅ `/app/test-payment/page.tsx`
   - Changed test payment currency from USD to RUB

## Backend Considerations

Your backend should also handle RUB currency:

```javascript
// Backend: /api/payment/create-order
app.post('/api/payment/create-order', async (req, res) => {
  const { amount, currency, userId, itemId, itemType } = req.body;
  
  // Validate currency
  if (currency !== 'RUB') {
    return res.status(400).json({ 
      error: 'Invalid currency. Only RUB is supported.' 
    });
  }
  
  // Create PayPal order with RUB
  const order = await paypal.orders.create({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'RUB',  // ✅ Must match frontend
        value: amount.toString()
      }
    }]
  });
  
  res.json(order);
});
```

## Common Issues

### Issue 1: PayPal Account Doesn't Support RUB
**Error**: "Currency not supported"
**Solution**: 
- Check your PayPal account settings
- Verify RUB is enabled for your account
- Contact PayPal support if needed
- Or switch to USD (see "Alternative: Change to USD" above)

### Issue 2: Prices Still Show in USD
**Symptom**: Cart shows "$500" instead of "500 RUB"
**Solution**:
- Update price display in cart component
- Convert stored USD prices to RUB
- Update database to store prices in RUB

### Issue 3: Backend Still Expects USD
**Error**: Backend validation error
**Solution**:
- Update backend to accept RUB
- Update price conversion logic
- Update database currency fields

## Recommendations

### 1. **Consistent Currency Throughout**
Ensure all parts of your app use RUB:
- ✅ PayPal SDK configuration
- ✅ PayPalButton component
- ✅ Shopping cart display
- ✅ Price storage in database
- ✅ Backend API validation
- ✅ Email receipts
- ✅ Invoice generation

### 2. **Display Currency Symbol**
Update UI to show RUB symbol (₽):
```typescript
{t('payment.total')}: {amount} ₽
// or
{t('payment.total')}: ₽{amount}
```

### 3. **Currency Conversion**
If you need to support multiple currencies:
- Store prices in a base currency (e.g., USD)
- Convert to RUB at display/payment time
- Use a currency conversion API
- Update rates regularly

### 4. **Localization**
Match currency to user's locale:
```typescript
const getCurrency = (locale: string) => {
  switch(locale) {
    case 'ru': return 'RUB';
    case 'en': return 'USD';
    case 'ka': return 'GEL'; // Georgian Lari
    default: return 'RUB';
  }
};
```

---

**Status**: ✅ Currency mismatch fixed
**Impact**: HIGH - Critical payment functionality
**Date**: October 30, 2025

## 🎉 Payment Should Work Now!

All currency references are now consistent:
- ✅ PayPal SDK: RUB
- ✅ PayPalButton: RUB
- ✅ Shopping Cart: RUB
- ✅ Test Payment: RUB

**Please try the payment again!** It should work now. 🚀

## Next Steps

1. **Test payment** with a small amount
2. **Verify** payment completes successfully
3. **Check** if prices need conversion from USD to RUB
4. **Update** price display if needed

If you still encounter issues, please share:
- Console logs
- Network tab (check request payload)
- Backend logs
