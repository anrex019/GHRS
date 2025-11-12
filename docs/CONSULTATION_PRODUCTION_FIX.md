# Consultation Form - Production 404 Error Fix 🔧

## პრობლემა

Production ვებსაიტზე consultation form არ მუშაობს:
```
Failed to load resource: the server responded with a status of 404
Consultation request error: Error: Cannot POST /api/consultation
```

## მიზეზი

**Backend არ არის deploy-ებული production-ზე** ან არ აქვს `/api/consultation` endpoint.

ლოკალურად მუშაობს რადგან:
- `localhost:3000` (frontend) → `localhost:4000` (backend)
- Backend ლოკალურად გაშვებულია

Production-ზე:
- Frontend: deploy-ებულია (Vercel/Netlify)
- Backend: **არ არის deploy-ებული** ან არასწორ URL-ზეა

## გადაწყვეტა

### ვარიანტი 1: Backend Deploy (რეკომენდებული) ✅

Backend უნდა deploy-დეს production-ზე:

#### 1.1 Render.com (უფასო)
```bash
# Backend deploy Render.com-ზე
cd backend

# შექმენი render.yaml
cat > render.yaml << EOF
services:
  - type: web
    name: ghrs-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 4000
      - key: MONGODB_URI
        fromDatabase:
          name: ghrs-mongodb
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: GMAIL_USER
        sync: false
      - key: GMAIL_APP_PASSWORD
        sync: false
      - key: ADMIN_EMAIL
        value: office@ghrs-group.com
      - key: FRONTEND_URL
        value: https://ghrs-group.com

databases:
  - name: ghrs-mongodb
    plan: free
EOF

# Push to GitHub
git add .
git commit -m "Add Render deployment config"
git push

# Render.com-ზე:
# 1. შექმენი ახალი Web Service
# 2. დააკავშირე GitHub repo
# 3. აირჩიე backend ფოლდერი
# 4. Deploy
```

Backend URL იქნება: `https://ghrs-backend.onrender.com`

#### 1.2 Railway.app (უფასო)
```bash
# Railway CLI install
npm install -g @railway/cli

# Login
railway login

# Initialize
cd backend
railway init

# Deploy
railway up

# Set env variables
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set JWT_SECRET="your-secret"
railway variables set GMAIL_USER="your-email"
railway variables set GMAIL_APP_PASSWORD="your-password"
railway variables set ADMIN_EMAIL="office@ghrs-group.com"
railway variables set FRONTEND_URL="https://ghrs-group.com"
```

#### 1.3 Heroku
```bash
# Heroku CLI install
brew install heroku/brew/heroku

# Login
heroku login

# Create app
cd backend
heroku create ghrs-backend

# Set env variables
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-secret"
heroku config:set GMAIL_USER="your-email"
heroku config:set GMAIL_APP_PASSWORD="your-password"
heroku config:set ADMIN_EMAIL="office@ghrs-group.com"
heroku config:set FRONTEND_URL="https://ghrs-group.com"

# Deploy
git push heroku main
```

### ვარიანტი 2: Frontend-ში Environment Variable (დროებითი)

თუ backend ჯერ არ არის deploy-ებული, დროებით შეგიძლია ლოკალურ backend-ს გამოიყენო:

#### 2.1 Frontend .env.production
```bash
# /Users/macbook/Desktop/GHRS/.env.production
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**მაგრამ ეს არ იმუშავებს** რადგან production ვებსაიტი ვერ მიაღწევს შენს ლოკალურ კომპიუტერს!

#### 2.2 ngrok (დროებითი testing-ისთვის)
```bash
# Install ngrok
brew install ngrok

# Start backend locally
cd backend
npm run start:dev

# Expose backend
ngrok http 4000

# Copy ngrok URL (e.g., https://abc123.ngrok.io)
# Add to frontend .env.production
NEXT_PUBLIC_API_URL=https://abc123.ngrok.io
```

**შენიშვნა:** ngrok URL იცვლება ყოველ restart-ზე (უფასო ვერსია).

### ვარიანტი 3: Serverless Functions (Next.js API Routes)

Backend logic-ს გადაიტანო Next.js API routes-ში:

```typescript
// /app/api/consultation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, locale } = body;

    // Send emails using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Consultation Request',
      html: `<h2>New Request</h2><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p>`,
    });

    // Send to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for your request',
      html: `<h2>Thank you!</h2><p>We will contact you soon.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Consultation error:', error);
    return NextResponse.json(
      { error: 'Failed to send consultation request' },
      { status: 500 }
    );
  }
}
```

მაგრამ ამ შემთხვევაში დაკარგავ MongoDB storage-ს.

## რეკომენდაცია ✅

**Deploy Backend on Render.com** (უფასო და მარტივი):

### ნაბიჯები:

1. **შექმენი Render account:** https://render.com
2. **New → Web Service**
3. **Connect GitHub repo**
4. **Settings:**
   - Name: `ghrs-backend`
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
5. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=4000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   GMAIL_USER=your-gmail
   GMAIL_APP_PASSWORD=your-app-password
   ADMIN_EMAIL=office@ghrs-group.com
   FRONTEND_URL=https://ghrs-group.com
   ```
6. **Create Web Service**
7. **Copy backend URL** (e.g., `https://ghrs-backend.onrender.com`)
8. **Update frontend .env.production:**
   ```
   NEXT_PUBLIC_API_URL=https://ghrs-backend.onrender.com
   ```
9. **Redeploy frontend**

## ტესტირება

### ლოკალურად:
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd ..
npm run dev

# Browser: http://localhost:3000
# Fill consultation form → Should work ✅
```

### Production-ზე:
```bash
# After backend deploy
# Browser: https://ghrs-group.com
# Fill consultation form → Should work ✅
```

## Debugging

### შეამოწმე Backend URL:
```bash
# Browser console
console.log('Backend URL:', process.env.NEXT_PUBLIC_API_URL);
```

### შეამოწმე Backend Health:
```bash
curl https://ghrs-backend.onrender.com/api/health
# Should return: {"status":"ok"}
```

### შეამოწმე Consultation Endpoint:
```bash
curl -X POST https://ghrs-backend.onrender.com/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "+995591234567",
    "locale": "en"
  }'
```

## Environment Variables

### Frontend (.env.production):
```bash
NEXT_PUBLIC_API_URL=https://ghrs-backend.onrender.com
```

### Backend (Render.com):
```bash
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
ADMIN_EMAIL=office@ghrs-group.com
FRONTEND_URL=https://ghrs-group.com
```

## CORS Configuration

Backend-ში უნდა იყოს CORS enabled:

```typescript
// backend/src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://ghrs-group.com',
    'https://ghrs-group.ru',
  ],
  credentials: true,
});
```

## შემდეგი ნაბიჯები

1. ✅ Deploy backend on Render.com
2. ✅ Update NEXT_PUBLIC_API_URL in frontend
3. ✅ Redeploy frontend
4. ✅ Test consultation form on production
5. ✅ Monitor backend logs on Render dashboard

## დამატებითი რესურსები

- [Render.com Docs](https://render.com/docs)
- [Railway.app Docs](https://docs.railway.app)
- [Heroku Docs](https://devcenter.heroku.com)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**სტატუსი:** Backend deploy საჭიროა
**პრიორიტეტი:** 🔴 High
**დრო:** ~30 წუთი (Render.com)
