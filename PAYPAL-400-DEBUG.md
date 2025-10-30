# 🔍 PayPal 400 Bad Request - Debugging Guide

## Error Message
```
PayPal payment failed: HTTP 400: Bad Request
```

## What This Means

A **400 Bad Request** error means:
- ✅ Authentication is working (not 401)
- ✅ Currency is correct (not currency mismatch)
- ❌ **Backend is rejecting the request data**

The backend received the request but found something wrong with the data.

## Enhanced Debugging Added

### ✅ Detailed Request Logging

**File**: `/app/components/PayPalButton.tsx`

Now logs the complete request being sent:
```typescript
const requestBody = { 
  amount, 
  currency,
  userId: user.id,
  itemId,
  itemType
};

console.log('🔵 Creating PayPal order:', { 
  endpoint: API_CONFIG.ENDPOINTS.PAYMENTS.CREATE_ORDER,
  hasAuthToken: !!token,
  requestBody: requestBody,
  requestBodyString: JSON.stringify(requestBody)
});
```

### ✅ Backend Error Response Capture

**File**: `/app/config/api.ts`

Now captures and logs the backend's error message:
```typescript
if (!response.ok) {
  // Try to get error details from response body
  let errorDetails = '';
  try {
    const errorBody = await response.json();
    errorDetails = errorBody.message || errorBody.error || JSON.stringify(errorBody);
    console.error('❌ API Error Response Body:', errorBody);
  } catch (e) {
    // Response body is not JSON
    errorDetails = await response.text();
    console.error('❌ API Error Response Text:', errorDetails);
  }
  
  throw new Error(`HTTP ${response.status}: ${errorDetails || response.statusText}`);
}
```

## What to Check in Console

### Step 1: Check Request Data

Look for this log:
```
🔵 Creating PayPal order: {
  endpoint: "/api/payment/create-order",
  hasAuthToken: true,
  requestBody: {
    amount: 500,
    currency: "RUB",
    userId: "67229a6c6e1f6d7e8f9a0b1c",
    itemId: "item1,item2,item3",
    itemType: "mixed"
  },
  requestBodyString: '{"amount":500,"currency":"RUB","userId":"67229a6c6e1f6d7e8f9a0b1c","itemId":"item1,item2,item3","itemType":"mixed"}'
}
```

**Check:**
- ✅ `amount` is a valid number (not 0, not negative, not NaN)
- ✅ `currency` is "RUB"
- ✅ `userId` is a valid MongoDB ObjectId (24 hex characters)
- ✅ `itemId` is not empty
- ✅ `itemType` is "set", "course", or "mixed"

### Step 2: Check Backend Error Response

Look for this log:
```
❌ API Error Response Body: {
  error: "Invalid amount",
  message: "Amount must be greater than 0",
  details: {...}
}
```

This will tell you **exactly** what the backend doesn't like.

## Common 400 Error Causes

### 1. **Invalid Amount**

**Symptoms:**
```
❌ API Error Response Body: {error: "Invalid amount"}
```

**Possible Issues:**
- Amount is 0
- Amount is negative
- Amount is NaN or undefined
- Amount is a string instead of number
- Amount has too many decimal places

**Fix:**
```typescript
// Ensure amount is a valid number
const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price, 0));

if (totalAmount <= 0) {
  alert('Cart total must be greater than 0');
  return;
}

<PayPalButton
  amount={totalAmount}  // Must be > 0
  ...
/>
```

### 2. **Invalid User ID**

**Symptoms:**
```
❌ API Error Response Body: {error: "Invalid userId"}
```

**Possible Issues:**
- userId is not a valid MongoDB ObjectId
- userId is undefined or null
- userId format is wrong

**Fix:**
```typescript
// Check userId format
console.log('User ID:', user.id);
console.log('User ID length:', user.id?.length); // Should be 24
console.log('User ID type:', typeof user.id); // Should be "string"

// Validate before sending
if (!user.id || user.id.length !== 24) {
  console.error('Invalid user ID:', user.id);
  throw new Error('Invalid user ID');
}
```

### 3. **Invalid Item ID**

**Symptoms:**
```
❌ API Error Response Body: {error: "Invalid itemId"}
```

**Possible Issues:**
- itemId is empty string
- itemId contains invalid characters
- itemId format doesn't match backend expectations

**Fix:**
```typescript
// For shopping cart (multiple items)
const itemId = cart.map((item) => item.id).join(",");
console.log('Item IDs:', itemId);

// Validate
if (!itemId || itemId.trim() === '') {
  console.error('Empty item ID');
  throw new Error('No items in cart');
}

// Check each ID
cart.forEach(item => {
  if (!item.id || item.id.length !== 24) {
    console.error('Invalid item ID:', item.id);
  }
});
```

### 4. **Invalid Item Type**

**Symptoms:**
```
❌ API Error Response Body: {error: "Invalid itemType"}
```

**Possible Issues:**
- itemType is not "set", "course", or "mixed"
- itemType is undefined
- itemType has wrong casing

**Fix:**
```typescript
// Validate itemType
const validTypes = ['set', 'course', 'mixed'];
const itemType = cart.length === 1 
  ? (cart[0].itemType || 'set') 
  : 'mixed';

if (!validTypes.includes(itemType)) {
  console.error('Invalid item type:', itemType);
  throw new Error('Invalid item type');
}
```

### 5. **Missing Required Fields**

**Symptoms:**
```
❌ API Error Response Body: {error: "Missing required field: currency"}
```

**Possible Issues:**
- Backend expects additional fields
- Field names don't match backend expectations
- Fields are undefined

**Fix:**
Check what the backend expects:
```typescript
// Backend might expect:
{
  amount: number,
  currency: string,
  userId: string,
  itemId: string,
  itemType: string,
  // Additional fields?
  description?: string,
  returnUrl?: string,
  cancelUrl?: string
}
```

### 6. **Currency Not Supported**

**Symptoms:**
```
❌ API Error Response Body: {error: "Currency RUB not supported"}
```

**Possible Issues:**
- Backend doesn't support RUB
- PayPal account doesn't support RUB
- Backend expects different currency format

**Fix:**
- Check backend currency validation
- Verify PayPal account supports RUB
- Or switch to USD (see PAYPAL-CURRENCY-FIX.md)

## Debugging Steps

### Step 1: Check Console Logs

Open browser console and look for:

1. **Request Body:**
```
🔵 Creating PayPal order: {
  requestBody: {...}
}
```

2. **Backend Error:**
```
❌ API Error Response Body: {
  error: "...",
  message: "..."
}
```

### Step 2: Validate Request Data

Check each field:
```javascript
// In console, check the request
const requestBody = {
  amount: 500,        // ✅ Valid number > 0
  currency: "RUB",    // ✅ String, matches SDK
  userId: "67229a6c6e1f6d7e8f9a0b1c",  // ✅ 24 chars
  itemId: "item1,item2",  // ✅ Not empty
  itemType: "mixed"   // ✅ Valid type
};

// Validate
console.log('Amount valid:', typeof requestBody.amount === 'number' && requestBody.amount > 0);
console.log('Currency valid:', requestBody.currency === 'RUB');
console.log('UserId valid:', requestBody.userId.length === 24);
console.log('ItemId valid:', requestBody.itemId.length > 0);
console.log('ItemType valid:', ['set', 'course', 'mixed'].includes(requestBody.itemType));
```

### Step 3: Check Backend Logs

If you have access to backend logs, check:
- What validation failed
- What the backend received
- What the backend expected

### Step 4: Test with Minimal Data

Try with a single item:
```typescript
// Test with simplest possible request
<PayPalButton
  amount={100}
  currency="RUB"
  itemId="67229a6c6e1f6d7e8f9a0b1c"  // Single valid ID
  itemType="set"
  onSuccess={...}
  onError={...}
/>
```

## Backend Validation Checklist

Your backend should validate:

```javascript
// Example backend validation
app.post('/api/payment/create-order', async (req, res) => {
  const { amount, currency, userId, itemId, itemType } = req.body;
  
  // 1. Validate amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ 
      error: 'Invalid amount',
      message: 'Amount must be a positive number'
    });
  }
  
  // 2. Validate currency
  if (currency !== 'RUB') {
    return res.status(400).json({ 
      error: 'Invalid currency',
      message: 'Only RUB is supported'
    });
  }
  
  // 3. Validate userId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ 
      error: 'Invalid userId',
      message: 'UserId must be a valid MongoDB ObjectId'
    });
  }
  
  // 4. Validate itemId
  if (!itemId || typeof itemId !== 'string' || itemId.trim() === '') {
    return res.status(400).json({ 
      error: 'Invalid itemId',
      message: 'ItemId is required'
    });
  }
  
  // 5. Validate itemType
  const validTypes = ['set', 'course', 'mixed'];
  if (!itemType || !validTypes.includes(itemType)) {
    return res.status(400).json({ 
      error: 'Invalid itemType',
      message: `ItemType must be one of: ${validTypes.join(', ')}`
    });
  }
  
  // All validations passed, create order
  try {
    const order = await createPayPalOrder({ amount, currency, userId, itemId, itemType });
    res.json(order);
  } catch (error) {
    console.error('PayPal order creation failed:', error);
    res.status(500).json({ 
      error: 'Order creation failed',
      message: error.message
    });
  }
});
```

## Expected Console Output

### Success:
```
🔐 Auth token check: {tokenExists: true, ...}
🔵 Creating PayPal order: {
  endpoint: "/api/payment/create-order",
  hasAuthToken: true,
  requestBody: {
    amount: 500,
    currency: "RUB",
    userId: "67229a6c6e1f6d7e8f9a0b1c",
    itemId: "item1,item2",
    itemType: "mixed"
  }
}
📡 API Response: {url: "...", status: 200, ok: true}
✅ PayPal order created successfully: {id: "PAYPAL-ORDER-123", ...}
```

### Failure with Details:
```
🔐 Auth token check: {tokenExists: true, ...}
🔵 Creating PayPal order: {
  requestBody: {
    amount: 0,  // ❌ Invalid!
    currency: "RUB",
    userId: "67229a6c6e1f6d7e8f9a0b1c",
    itemId: "item1",
    itemType: "set"
  }
}
📡 API Response: {url: "...", status: 400, ok: false}
❌ API Error Response Body: {
  error: "Invalid amount",
  message: "Amount must be greater than 0"
}
❌ API Error: /api/payment/create-order HTTP 400: Invalid amount
❌ Error creating PayPal order: {
  message: "HTTP 400: Invalid amount",
  is401Error: false,
  ...
}
```

## Files Modified

1. ✅ `/app/components/PayPalButton.tsx`
   - Added detailed request body logging
   - Shows exact data being sent to backend

2. ✅ `/app/config/api.ts`
   - Captures backend error response body
   - Logs detailed error messages
   - Shows what backend rejected

## Next Steps

1. **Try payment again** with console open
2. **Copy the console logs**, especially:
   - Request body
   - Backend error response
3. **Share the logs** so I can identify the exact issue
4. **Check backend logs** if accessible

## Quick Fixes to Try

### Fix 1: Validate Cart Total
```typescript
// In shopping cart page
const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.subscription), 0);

if (totalAmount <= 0) {
  alert('Cart is empty or has invalid prices');
  return;
}

console.log('Total amount:', totalAmount);
```

### Fix 2: Validate User ID
```typescript
// Before payment
console.log('User:', user);
console.log('User ID:', user?.id);
console.log('User ID valid:', user?.id?.length === 24);

if (!user?.id || user.id.length !== 24) {
  alert('Invalid user session. Please log in again.');
  logout();
  return;
}
```

### Fix 3: Validate Cart Items
```typescript
// Check all items have valid IDs
const invalidItems = cart.filter(item => !item.id || item.id.length !== 24);
if (invalidItems.length > 0) {
  console.error('Invalid items in cart:', invalidItems);
  alert('Some items in cart are invalid. Please remove and re-add them.');
  return;
}
```

---

**Status**: ✅ Enhanced debugging added
**Impact**: HIGH - Critical for identifying 400 error cause
**Date**: October 30, 2025

## 🔍 Ready to Debug!

The enhanced logging will show:
- ✅ Exact request data being sent
- ✅ Backend's specific error message
- ✅ Which field is causing the problem

**Please try the payment again and share the console logs!** 

The logs will tell us exactly what the backend doesn't like. 🚀
