# Vercel Deployment Guide

## ⚠️ Important: Environment Variables

### Required Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```
NEXT_PUBLIC_API_URL=https://ghrs-backend.onrender.com
NODE_ENV=production
```

## 🔍 Current Issues

### Backend API Not Working

**Problem**: The backend API at `https://ghrs-backend.onrender.com` is returning 404 errors for:
- `/api/categories` → 404 Not Found
- Other API endpoints

**What this causes**:
- ❌ Categories not loading
- ❌ Articles not showing
- ❌ Missing data on the website

### Solution

**Backend needs to be fixed**:
1. Check if backend is deployed correctly on Render
2. Verify API routes are configured properly
3. Check database connection
4. Verify CORS settings allow requests from Vercel domain

## 🚀 Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update deployment configuration"
   git push origin main
   ```

2. **Vercel Auto-Deploy**:
   - Vercel will automatically deploy when you push to `main` branch

3. **Check Build Logs**:
   - Go to Vercel Dashboard → Deployments
   - Check if build succeeded

4. **Verify Environment Variables**:
   - Settings → Environment Variables
   - Make sure `NEXT_PUBLIC_API_URL` is set

## 📝 Backend API Checklist

- [ ] Backend is running on Render
- [ ] Database is connected
- [ ] API endpoints are working:
  - `/api/categories`
  - `/api/articles`
  - `/api/blogs`
  - `/api/sets`
  - `/api/courses`
- [ ] CORS is configured to allow Vercel domain
- [ ] Environment variables are set on Render

## 🔗 URLs

- **Frontend (Vercel)**: Your Vercel deployment URL
- **Backend (Render)**: https://ghrs-backend.onrender.com
- **GitHub**: https://github.com/Giorgiberuashvil92/GHRS

## 🐛 Debugging

If data is not showing on Vercel:

1. **Check Browser Console**:
   - Open DevTools → Console
   - Look for API errors

2. **Check Network Tab**:
   - Open DevTools → Network
   - Filter by "Fetch/XHR"
   - Check if API calls are failing

3. **Verify API URL**:
   - Make sure `NEXT_PUBLIC_API_URL` is set in Vercel
   - Check if backend is responding

4. **Test Backend Directly**:
   ```bash
   curl https://ghrs-backend.onrender.com/api/categories
   ```

## ⚡ Quick Fix

If backend is down, you can temporarily use localhost for development:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

But remember to set production URL in Vercel!
