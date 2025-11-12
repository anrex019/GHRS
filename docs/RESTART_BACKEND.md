# 🔴 URGENT: Backend Restart Required

## Problem Found
The consultation endpoint returns 404 because ConsultationModule is not loaded.

## Solution: Restart Backend

### Step 1: Stop Current Backend
```bash
# Find backend process
ps aux | grep "nest start"

# Or find by port
lsof -i :4000

# Kill the process
kill -9 <PID>
```

### Step 2: Start Backend Fresh
```bash
cd /Users/macbook/Desktop/GHRS/backend
npm run start:dev
```

### Step 3: Verify Consultation Module Loaded
Look for these lines in backend console:
```
✅ ConsultationModule initialized
✅ Gmail service ready to send emails
```

### Step 4: Test Endpoint
```bash
curl -X POST http://localhost:4000/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+995555123456",
    "email": "test@example.com",
    "locale": "ka"
  }'
```

Expected: Should return consultation request object (not 404)

### Step 5: Test Form in Browser
1. Go to http://localhost:3000
2. Scroll to footer
3. Fill in form
4. Click "Submit Request"
5. Should see success message

## If Still 404

Check if files exist:
```bash
ls -la backend/src/consultation/
ls -la backend/src/schemas/consultation-request.schema.ts
```

Check app.module.ts:
```bash
cat backend/src/app.module.ts | grep -A 5 "ConsultationModule"
```

Should show:
```typescript
import { ConsultationModule } from './consultation/consultation.module';
...
ConsultationModule,
```

## Email Configuration

Don't forget to add to `backend/.env`:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=office@ghrs-group.com
```

Without these, form will submit but emails won't send.
