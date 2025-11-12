# Legal Documents Dynamic System Implementation

## Overview
This implementation makes user agreements, consents, and privacy policies dynamic and editable from an admin panel. The system ensures that .ru and .com domains have independent legal documents without cross-references.

## Backend Implementation

### 1. Database Schema (`backend/src/schemas/legal-document.schema.ts`)
- **Fields:**
  - `type`: Document type (user-agreement, consent, privacy-policy, data-processing)
  - `locale`: Language (en, ru, ka)
  - `title`: Document title
  - `content`: Full HTML content
  - `isActive`: Active status
  - `version`: Document version
  - `effectiveDate`: When the document becomes effective
  - `lastUpdatedBy`: Admin who last updated

- **Unique Index:** Combination of `type` + `locale` ensures one document per type per language

### 2. API Endpoints (`backend/src/legal/`)

#### Public Endpoint (No Auth Required):
```
GET /api/legal/document?type={type}&locale={locale}
```
Example: `/api/legal/document?type=user-agreement&locale=ru`

#### Admin Endpoints (Requires Authentication):
```
POST   /api/legal              - Create new legal document
GET    /api/legal              - Get all legal documents
GET    /api/legal/:id          - Get specific document by ID
PATCH  /api/legal/:id          - Update document
DELETE /api/legal/:id          - Delete document
POST   /api/legal/upsert       - Create or update document by type+locale
```

### 3. Document Types
- `user-agreement` - User Agreement (EN, KA)
- `consent` - Consent (EN, KA)
- `privacy-policy` - Privacy Policy (EN, RU, KA)
- `data-processing` - Data Processing Agreement (RU only)

## Frontend Implementation

### 1. Custom Hook (`app/hooks/useLegalDocument.ts`)
```typescript
const { document, loading, error } = useLegalDocument('user-agreement', 'en');
```

### 2. Updated Pages
- `/user-agreement` - Fetches from API
- `/consent` - Fetches from API (uses 'data-processing' for RU locale)
- `/privacy-policy` - Fetches from API

### 3. Features
- **Loading State:** Shows spinner while fetching
- **Error Handling:** Falls back to static translations if API fails
- **Version Display:** Shows document version and effective date
- **HTML Support:** Content can include HTML formatting

## Separation of .ru and .com Content

### Russian (.ru) Documents:
```javascript
// For Russian locale, different document types are used
locale === 'ru' ? 'data-processing' : 'consent'
```

### English/Georgian (.com) Documents:
- Uses standard types: `user-agreement`, `consent`, `privacy-policy`

## How to Add/Update Legal Documents

### Method 1: Direct API Calls

#### Create/Update User Agreement (EN):
```bash
curl -X POST http://localhost:3001/api/legal/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user-agreement",
    "locale": "en",
    "data": {
      "title": "User Agreement",
      "content": "<h2>Terms of Service</h2><p>Content here...</p>",
      "version": "1.0",
      "effectiveDate": "2025-01-01",
      "isActive": true
    }
  }'
```

#### Create/Update Data Processing (RU):
```bash
curl -X POST http://localhost:3001/api/legal/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "type": "data-processing",
    "locale": "ru",
    "data": {
      "title": "Обработка персональных данных",
      "content": "<h2>Согласие на обработку</h2><p>Содержание...</p>",
      "version": "1.0",
      "effectiveDate": "2025-01-01",
      "isActive": true
    }
  }'
```

### Method 2: MongoDB Direct Insert

```javascript
db.legaldocuments.insertOne({
  type: "user-agreement",
  locale: "en",
  title: "User Agreement",
  content: "<h2>Terms</h2><p>Content...</p>",
  isActive: true,
  version: "1.0",
  effectiveDate: new Date("2025-01-01"),
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## Admin Panel Integration (Future)

To add admin panel functionality:

1. **Create Admin UI Component:**
```typescript
// app/admin/legal-documents/page.tsx
- List all documents
- Edit form with rich text editor
- Version management
- Preview functionality
```

2. **Add Authentication:**
```typescript
// Uncomment guards in legal.controller.ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
```

3. **Rich Text Editor:**
- Use TinyMCE, Quill, or similar
- Allow HTML formatting
- Preview mode

## Migration from Static to Dynamic

### Current Static Content Location:
- `/public/locales/{locale}/legal.json`

### Migration Steps:
1. Extract content from translation files
2. Use upsert API to populate database
3. Verify all pages load correctly
4. Remove static translations (optional, kept as fallback)

## Testing

### Test Public Endpoints:
```bash
# Test EN user agreement
curl http://localhost:3001/api/legal/document?type=user-agreement&locale=en

# Test RU data processing
curl http://localhost:3001/api/legal/document?type=data-processing&locale=ru

# Test KA privacy policy
curl http://localhost:3001/api/legal/document?type=privacy-policy&locale=ka
```

### Test Frontend Pages:
1. Visit `/user-agreement` - Should load from API
2. Visit `/consent` - Should load from API (different for RU)
3. Visit `/privacy-policy` - Should load from API
4. Test all three languages (EN, RU, KA)

## Security Considerations

1. **Public Read Access:** Legal documents are public (no auth required)
2. **Admin Write Access:** Only admins can create/update (add auth guards)
3. **HTML Sanitization:** Consider sanitizing HTML content to prevent XSS
4. **Version Control:** Track changes with version numbers
5. **Audit Trail:** Store `lastUpdatedBy` for accountability

## URLs Referenced

### English (.com):
- https://ghrs-group.com/rehab/user-agreement
- https://ghrs-group.com/consent
- https://ghrs-group.com/rehab/privacy-policy

### Russian (.ru):
- https://ghrs-group.ru/polzovatelskoe-soglashenie (user-agreement)
- https://ghrs-group.ru/obrabotka-personalnyh-dannyh (data-processing)
- https://ghrs-group.ru/privacy-policy

## Next Steps

1. ✅ Backend API created
2. ✅ Frontend pages updated
3. ✅ Fallback to static content implemented
4. ⏳ Populate database with actual content from URLs
5. ⏳ Create admin panel for editing
6. ⏳ Add authentication guards
7. ⏳ Add HTML sanitization
8. ⏳ Add version history tracking
