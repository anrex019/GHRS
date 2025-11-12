# Consultation Form Troubleshooting Guide

## Problem: Form submission not working

### Quick Checklist

1. **Backend Running?**
```bash
cd backend
npm run start:dev
```
Expected output: `🚀 Backend server running on http://localhost:4000`

2. **Check Browser Console**
- Open DevTools (F12)
- Go to Console tab
- Try submitting form
- Look for errors

3. **Check Network Tab**
- Open DevTools (F12)
- Go to Network tab
- Try submitting form
- Look for `/api/consultation` request
- Check status code and response

### Common Issues & Solutions

#### Issue 1: Backend Not Running
**Symptoms:** Network error, "Failed to fetch"

**Solution:**
```bash
cd /Users/macbook/Desktop/GHRS/backend
npm run start:dev
```

#### Issue 2: Port Mismatch
**Symptoms:** Connection refused

**Check:**
- Backend should run on port 4000
- Frontend API_CONFIG.BASE_URL should be `http://localhost:4000`

**Fix if needed:**
```typescript
// app/config/api.ts
BASE_URL: 'http://localhost:4000'
```

#### Issue 3: Email Not Configured
**Symptoms:** Form submits but no emails sent

**Solution:**
```bash
# backend/.env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=office@ghrs-group.com
```

**How to get Gmail App Password:**
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App Passwords
4. Generate new app password
5. Copy 16-character password
6. Add to `.env` file

#### Issue 4: CORS Error
**Symptoms:** "CORS policy" error in console

**Solution:** Backend already configured for CORS, but verify:
```typescript
// backend/src/main.ts line 15-22
app.enableCors({
  origin: true, // Allow all in development
  credentials: true,
});
```

#### Issue 5: Module Not Loaded
**Symptoms:** 404 error on `/api/consultation`

**Check:**
```bash
# Verify ConsultationModule is in app.module.ts
grep -n "ConsultationModule" backend/src/app.module.ts
```

Should show:
```
23:import { ConsultationModule } from './consultation/consultation.module';
48:    ConsultationModule,
```

### Testing Steps

#### Step 1: Test Backend Directly
```bash
# Test if backend is running
curl http://localhost:4000

# Test consultation endpoint
curl -X POST http://localhost:4000/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+995555123456",
    "email": "test@example.com",
    "locale": "ka"
  }'
```

**Expected Response:**
```json
{
  "_id": "...",
  "name": "Test User",
  "phone": "+995555123456",
  "email": "test@example.com",
  "locale": "ka",
  "status": "pending",
  "emailSent": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Step 2: Check Database
```bash
# Connect to MongoDB
mongosh

# Use your database
use ghrs

# Check if request was saved
db.consultationrequests.find().pretty()
```

#### Step 3: Check Email Logs
```bash
# In backend terminal, look for:
✅ Email sent to: office@ghrs-group.com
✅ Email sent to: test@example.com
```

### Debug Mode

Add console logs to see what's happening:

**Frontend (Footer.tsx):**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('🔵 Form submitted with data:', formData);
  console.log('🔵 API URL:', `${API_CONFIG.BASE_URL}/api/consultation`);
  
  try {
    const response = await fetch(...);
    console.log('🔵 Response status:', response.status);
    console.log('🔵 Response ok:', response.ok);
    // ... rest of code
  } catch (error) {
    console.error('🔴 Error:', error);
  }
};
```

### Quick Fix Commands

```bash
# 1. Restart backend
cd backend
npm run start:dev

# 2. Clear browser cache
# In browser: Ctrl+Shift+Delete > Clear cache

# 3. Restart frontend
cd /Users/macbook/Desktop/GHRS
npm run dev

# 4. Check if port 4000 is in use
lsof -i :4000

# 5. Kill process on port 4000 if needed
kill -9 $(lsof -t -i:4000)
```

### Environment Variables Check

**Backend `.env` must have:**
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/ghrs

# Email
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
ADMIN_EMAIL=office@ghrs-group.com

# Server
PORT=4000
NODE_ENV=development

# Frontend URL (for emails)
FRONTEND_URL=http://localhost:3000
```

### Success Indicators

When everything works:

1. **Browser Console:**
```
🔵 Form submitted with data: {name: "...", phone: "...", email: "..."}
🔵 API URL: http://localhost:4000/api/consultation
🔵 Response status: 201
🔵 Response ok: true
```

2. **Backend Console:**
```
📧 Initializing Gmail Service...
✅ Gmail service ready to send emails
✅ Email sent to: office@ghrs-group.com
📧 Message ID: <...>
✅ Email sent to: test@example.com
📧 Message ID: <...>
```

3. **Frontend UI:**
```
✅ მადლობა! ჩვენ მალე დაგიკავშირდებით.
```

4. **Email Inbox:**
- Admin receives notification
- User receives confirmation

### Still Not Working?

1. **Check all files exist:**
```bash
ls -la backend/src/consultation/
ls -la backend/src/schemas/consultation-request.schema.ts
```

2. **Verify imports:**
```bash
grep -r "ConsultationModule" backend/src/
```

3. **Check for TypeScript errors:**
```bash
cd backend
npm run build
```

4. **View full backend logs:**
```bash
cd backend
npm run start:dev 2>&1 | tee backend.log
```

### Contact Support

If still having issues, provide:
1. Browser console screenshot
2. Network tab screenshot
3. Backend terminal output
4. `.env` file (without passwords)
5. Error messages

## Quick Test Script

Save as `test-consultation.sh`:
```bash
#!/bin/bash

echo "🧪 Testing Consultation Form..."

# Test backend health
echo "1️⃣ Testing backend..."
curl -s http://localhost:4000 | jq .

# Test consultation endpoint
echo "2️⃣ Testing consultation endpoint..."
curl -X POST http://localhost:4000/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+995555123456",
    "email": "test@example.com",
    "locale": "ka"
  }' | jq .

echo "✅ Test complete!"
```

Run with:
```bash
chmod +x test-consultation.sh
./test-consultation.sh
```
