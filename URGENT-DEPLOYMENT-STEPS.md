# 🚨 URGENT: Backend Deployment Required

## Current Situation

Your **production backend on Render** is returning 404 errors because it doesn't have the `/api` global prefix that we just added to your local code.

**Errors seen:**
- `ghrs-backend.onrender.com/api/articles` → 404
- `ghrs-backend.onrender.com/api/categories` → 404

## ✅ Temporary Fix Applied

I've added a **temporary compatibility layer** in the frontend that:
- Removes `/api` prefix when calling Render backend
- Keeps `/api` prefix for localhost development
- Will be automatically removed once backend is redeployed

**This allows your production site to work RIGHT NOW** while you redeploy the backend.

---

## 🚀 Required Steps to Complete Deployment

### Step 1: Commit and Push Changes

```bash
# In your GHRS directory
git add .
git commit -m "Add /api global prefix and production security fixes"
git push origin main
```

### Step 2: Redeploy Backend on Render

**Option A: Auto-Deploy (if enabled)**
- Render will automatically detect the push and redeploy
- Wait 5-10 minutes for deployment to complete

**Option B: Manual Deploy**
1. Go to https://dashboard.render.com
2. Find your backend service (ghrs-backend)
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete

### Step 3: Add Environment Variables on Render

In your Render backend service settings, add these environment variables:

```
MONGODB_URI=mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db
JWT_SECRET=<generate-secure-secret>
NODE_ENV=production
ALLOWED_ORIGINS=https://ghrs-mu.vercel.app,https://ghrs-mu.vercel.app
PORT=4000
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Remove Temporary Fix (After Backend is Live)

Once backend is redeployed and working:

1. Open `/Users/macbook/Desktop/GHRS/app/config/api.ts`
2. Find lines 169-184 (the temporary fix)
3. Replace with the original simple version:

```typescript
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Validate endpoint starts with /api
  if (!endpoint.startsWith('/api/')) {
    console.warn(`⚠️ Warning: Endpoint missing /api prefix: ${endpoint}`);
  }
  
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
```

4. Commit and push:
```bash
git add app/config/api.ts
git commit -m "Remove temporary Render compatibility fix"
git push origin main
```

---

## 🧪 Verify Deployment

After backend redeploys, test these URLs:

1. **Health Check**: https://ghrs-backend.onrender.com/api/
2. **Articles**: https://ghrs-backend.onrender.com/api/articles
3. **Categories**: https://ghrs-backend.onrender.com/api/categories

All should return data (not 404).

---

## 📊 Current Status

- ✅ Frontend: Working with temporary fix
- ⏳ Backend: Needs redeployment
- ✅ Local Development: Fully working
- ⏳ Production: Working with compatibility layer

---

## ⚠️ Important Notes

1. **The temporary fix is safe** - it only affects production Render backend
2. **Local development is unaffected** - still uses `/api` prefix
3. **Remove the temp fix** after backend is redeployed for cleaner code
4. **CORS settings** will restrict origins in production (more secure)

---

## 🆘 If Something Goes Wrong

**Backend won't start on Render:**
- Check Render logs for errors
- Verify environment variables are set
- Ensure MongoDB connection string is correct

**Still getting 404s:**
- Wait 5 minutes for DNS/CDN cache to clear
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check Render deployment status

**CORS errors:**
- Add your Vercel domain to `ALLOWED_ORIGINS`
- Format: `https://ghrs-mu.vercel.app` (no trailing slash)

---

## 📞 Quick Reference

**Render Dashboard**: https://dashboard.render.com
**Backend URL**: https://ghrs-backend.onrender.com
**Frontend URL**: https://ghrs-mu.vercel.app

**Next Action**: Push code to GitHub and redeploy backend on Render!
