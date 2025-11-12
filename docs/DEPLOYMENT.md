# 🚀 GHRS Deployment Guide

## 📋 Pre-Deployment Checklist

### Backend Setup

1. **Environment Variables**
   - Copy `.env.example` to `.env` in the backend directory
   - Update all values with production credentials:
     ```bash
     cd backend
     cp .env.example .env
     ```
   
2. **Required Environment Variables**
   ```env
   MONGODB_URI=your_production_mongodb_connection_string
   JWT_SECRET=your_secure_random_jwt_secret
   NODE_ENV=production
   PORT=4000
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Security Checklist**
   - ✅ MongoDB credentials moved to environment variables
   - ✅ CORS restricted to specific origins in production
   - ✅ JWT secret is strong and unique
   - ✅ `.env` file is in `.gitignore`

### Frontend Setup

1. **Environment Variables**
   - Copy `.env.example` to `.env.local` in the root directory
   - Update with production API URL:
     ```bash
     cp .env.example .env.local
     ```

2. **Required Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   NODE_ENV=production
   ```

## 🔧 Backend Deployment

### Option 1: Deploy to Render.com

1. Connect your GitHub repository
2. Create a new Web Service
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment**: Node
4. Add all environment variables from `.env.example`
5. Deploy

### Option 2: Deploy to Railway.app

1. Connect your GitHub repository
2. Select the `backend` directory
3. Add environment variables
4. Railway will auto-detect NestJS and deploy

### Option 3: Deploy to VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone your-repo
cd backend
npm install
npm run build

# Start with PM2
pm2 start dist/main.js --name ghrs-backend
pm2 save
pm2 startup
```

## 🌐 Frontend Deployment

### Option 1: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`

### Option 2: Deploy to Netlify

1. Connect GitHub repository
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Add environment variables
4. Deploy

## 🔒 Security Best Practices

### Backend

1. **Never commit `.env` files**
   ```bash
   # Verify .env is gitignored
   git check-ignore backend/.env
   ```

2. **Use strong JWT secrets**
   ```bash
   # Generate a secure secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

### Frontend

1. **Only use NEXT_PUBLIC_ prefix for client-side variables**
2. **Never expose API keys in frontend code**
3. **Use environment-specific configurations**

## 📊 Monitoring

### Backend Health Check

The backend exposes a health endpoint:
```
GET /api/health
```

### Logging

- Development: Full console logging enabled
- Production: Only errors logged to console
- Consider adding a logging service (e.g., Sentry, LogRocket)

## 🔄 CI/CD Setup (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Add your deployment script here

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          # Add your deployment script here
```

## 🧪 Testing Before Deployment

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend Tests
```bash
npm run test
npm run build  # Ensure build succeeds
```

## 📝 Post-Deployment

1. **Verify all endpoints work**
   - Test API endpoints
   - Check CORS configuration
   - Verify authentication flows

2. **Monitor logs**
   - Check for errors
   - Monitor performance
   - Track API response times

3. **Set up backups**
   - Database backups
   - Regular snapshots

## 🆘 Troubleshooting

### Common Issues

**CORS Errors**
- Verify `ALLOWED_ORIGINS` includes your frontend domain
- Check protocol (http vs https)

**Database Connection Failed**
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas

**API 404 Errors**
- Ensure all endpoints use `/api` prefix
- Verify `NEXT_PUBLIC_API_URL` is set correctly

**Authentication Issues**
- Check JWT_SECRET matches between environments
- Verify token expiration settings

## 📞 Support

For issues or questions:
1. Check logs first
2. Review this deployment guide
3. Check environment variables
4. Verify network connectivity

---

**Last Updated**: October 2025
**Version**: 1.0.0
