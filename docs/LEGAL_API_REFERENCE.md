# Legal Documents API - Quick Reference

## Base URL
```
http://localhost:3001/api/legal
```

## Public Endpoints (No Auth)

### Get Legal Document
```http
GET /api/legal/document?type={type}&locale={locale}
```

**Parameters:**
- `type`: user-agreement | consent | privacy-policy | data-processing
- `locale`: en | ru | ka

**Examples:**
```bash
# English user agreement
curl "http://localhost:3001/api/legal/document?type=user-agreement&locale=en"

# Russian data processing
curl "http://localhost:3001/api/legal/document?type=data-processing&locale=ru"

# Georgian privacy policy
curl "http://localhost:3001/api/legal/document?type=privacy-policy&locale=ka"
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "type": "user-agreement",
  "locale": "en",
  "title": "User Agreement",
  "content": "<h2>Terms...</h2>",
  "isActive": true,
  "version": "1.0",
  "effectiveDate": "2025-01-01T00:00:00.000Z",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

## Admin Endpoints (Auth Required)

### Create Document
```http
POST /api/legal
Content-Type: application/json

{
  "type": "user-agreement",
  "locale": "en",
  "title": "User Agreement",
  "content": "<h2>Content...</h2>",
  "isActive": true,
  "version": "1.0",
  "effectiveDate": "2025-01-01"
}
```

### Get All Documents
```http
GET /api/legal
```

### Get Document by ID
```http
GET /api/legal/{id}
```

### Update Document
```http
PATCH /api/legal/{id}
Content-Type: application/json

{
  "content": "<h2>Updated content...</h2>",
  "version": "1.1",
  "lastUpdatedBy": "admin@ghrs.com"
}
```

### Delete Document
```http
DELETE /api/legal/{id}
```

### Upsert Document (Create or Update)
```http
POST /api/legal/upsert
Content-Type: application/json

{
  "type": "user-agreement",
  "locale": "en",
  "data": {
    "title": "User Agreement",
    "content": "<h2>Content...</h2>",
    "version": "1.0",
    "isActive": true
  }
}
```

## Document Types

| Type | Description | Locales |
|------|-------------|---------|
| `user-agreement` | User Agreement / Terms of Service | en, ru, ka |
| `consent` | Consent to Data Processing | en, ka |
| `data-processing` | Data Processing Agreement (RU only) | ru |
| `privacy-policy` | Privacy Policy | en, ru, ka |

## Locale Mapping

| Locale | Language | Domain |
|--------|----------|--------|
| `en` | English | .com |
| `ru` | Russian | .ru |
| `ka` | Georgian | .com |

## Special Cases

### Russian Consent
For Russian locale, use `data-processing` instead of `consent`:
```bash
# ❌ Wrong
curl "http://localhost:3001/api/legal/document?type=consent&locale=ru"

# ✅ Correct
curl "http://localhost:3001/api/legal/document?type=data-processing&locale=ru"
```

## Error Responses

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Legal document of type user-agreement for locale en not found",
  "error": "Not Found"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["type must be one of: user-agreement, consent, privacy-policy, data-processing"],
  "error": "Bad Request"
}
```

## Frontend Usage

### React Hook
```typescript
import { useLegalDocument } from '../hooks/useLegalDocument';

function MyComponent() {
  const { document, loading, error } = useLegalDocument('user-agreement', 'en');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{document.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: document.content }} />
    </div>
  );
}
```

## Bulk Operations

### Populate All Documents
```bash
node scripts/populate-legal-documents.js
```

### Export All Documents
```bash
curl "http://localhost:3001/api/legal" > legal-documents-backup.json
```

## Testing

### Test All Combinations
```bash
# EN documents
curl "http://localhost:3001/api/legal/document?type=user-agreement&locale=en"
curl "http://localhost:3001/api/legal/document?type=consent&locale=en"
curl "http://localhost:3001/api/legal/document?type=privacy-policy&locale=en"

# RU documents
curl "http://localhost:3001/api/legal/document?type=user-agreement&locale=ru"
curl "http://localhost:3001/api/legal/document?type=data-processing&locale=ru"
curl "http://localhost:3001/api/legal/document?type=privacy-policy&locale=ru"

# KA documents
curl "http://localhost:3001/api/legal/document?type=user-agreement&locale=ka"
curl "http://localhost:3001/api/legal/document?type=consent&locale=ka"
curl "http://localhost:3001/api/legal/document?type=privacy-policy&locale=ka"
```

## Database Schema

```typescript
{
  type: string;              // Document type
  locale: string;            // Language code
  title: string;             // Document title
  content: string;           // HTML content
  isActive: boolean;         // Active status
  version?: string;          // Version number
  effectiveDate?: Date;      // Effective date
  lastUpdatedBy?: string;    // Admin email
  createdAt: Date;           // Auto-generated
  updatedAt: Date;           // Auto-generated
}
```

## Unique Constraint
Each combination of `type` + `locale` must be unique. The upsert endpoint handles this automatically.

## Content Format
- Content should be valid HTML
- Use semantic HTML tags (h1, h2, p, ul, ol, etc.)
- Avoid inline styles (use CSS classes instead)
- Consider HTML sanitization for security

## Version Management
- Use semantic versioning (1.0, 1.1, 2.0, etc.)
- Increment version on content changes
- Set effectiveDate for legal compliance
- Track lastUpdatedBy for audit trail
