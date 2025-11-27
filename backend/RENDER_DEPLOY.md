# 🚀 Render Deployment Instructions

## Current Status
- ✅ Code pushed to GitHub
- ✅ Local backend works correctly
- ❌ Render backend not updated (still showing old version)

## Quick Fix: Manual Deploy

1. Go to: https://dashboard.render.com
2. Find your `ghrs-backend` service
3. Click **"Manual Deploy"** button (top right)
4. Select **"Deploy latest commit"**
5. Wait 5-10 minutes for deployment to complete

## Verify Deployment

After deployment completes, test:

```bash
# Test root endpoint (should return JSON, not "Hello World!")
curl https://ghrs-backend.onrender.com/

# Test consultation endpoint (should work, not 404)
curl -X POST https://ghrs-backend.onrender.com/api/consultation \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"123456789","email":"test@test.com","locale":"ka"}'
```

## Enable Auto-Deploy (Recommended)

To avoid manual deploys in the future:

1. Go to Render Dashboard → `ghrs-backend`
2. Click **Settings** → **Build & Deploy**
3. Ensure:
   - ✅ **Auto-Deploy**: ON
   - ✅ **Branch**: `main`
   - ✅ **Build Command**: `npm install && npm run build`
   - ✅ **Start Command**: `npm run start:prod`

## Troubleshooting

If deployment fails, check:
- Render Logs for errors
- Environment variables are set correctly
- MongoDB connection string is valid

## Expected Result

After successful deployment:
- ✅ `curl https://ghrs-backend.onrender.com/` returns API info JSON
- ✅ `/api/consultation` endpoint works
- ✅ Website consultation form works
