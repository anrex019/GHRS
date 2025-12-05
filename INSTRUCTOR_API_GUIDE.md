# Instructor API Guide

## Translation Files Created

I've created translation files for instructor management in all three languages:
- `/public/locales/en/admin.json` - English translations
- `/public/locales/ru/admin.json` - Russian translations  
- `/public/locales/ka/admin.json` - Georgian translations

## API Endpoint

**Create Instructor:**
```
POST http://localhost:4000/api/instructors
```

## Request Format

Here's the JSON format you need to send when creating an instructor:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "profession": "Physical Therapist",
  "bio": {
    "en": "John is an experienced physical therapist with over 10 years of experience in rehabilitation and sports medicine.",
    "ru": "Джон - опытный физиотерапевт с более чем 10-летним опытом работы в области реабилитации и спортивной медицины."
  },
  "htmlContent": {
    "en": "<p>Detailed HTML content in English</p>",
    "ru": "<p>Подробный HTML контент на русском</p>"
  },
  "certificates": [
    {
      "name": "Certified Physical Therapist",
      "issuer": "American Physical Therapy Association",
      "date": "2015-06-15",
      "url": "https://example.com/certificate1"
    },
    {
      "name": "Sports Medicine Specialist",
      "issuer": "International Sports Medicine Institute",
      "date": "2018-03-20",
      "url": "https://example.com/certificate2"
    }
  ],
  "profileImage": "https://example.com/images/john-doe.jpg",
  "isActive": true
}
```

## Field Descriptions

### Required Fields:
- **name** (string): Full name of the instructor
- **email** (string): Email address (must be unique)
- **profession** (string): Professional title or specialization
- **bio** (object): Biography in multiple languages
  - **en** (string): English biography
  - **ru** (string): Russian biography
- **profileImage** (string): URL to profile image

### Optional Fields:
- **htmlContent** (object): Rich HTML content for detailed bio
  - **en** (string): English HTML content
  - **ru** (string): Russian HTML content
- **certificates** (array): List of certificates
  - **name** (string): Certificate name
  - **issuer** (string): Issuing organization
  - **date** (string): Issue date (YYYY-MM-DD format)
  - **url** (string, optional): Certificate URL
- **isActive** (boolean): Whether instructor is active (default: true)

## Example Using cURL

```bash
curl -X POST http://localhost:4000/api/instructors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "profession": "Physical Therapist",
    "bio": {
      "en": "Experienced physical therapist",
      "ru": "Опытный физиотерапевт"
    },
    "profileImage": "https://example.com/john.jpg",
    "isActive": true
  }'
```

## Example Using Postman

1. **Method:** POST
2. **URL:** `http://localhost:4000/api/instructors`
3. **Headers:**
   - Content-Type: `application/json`
4. **Body (raw JSON):** Copy the JSON format above

## Success Response

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "profession": "Physical Therapist",
  "bio": {
    "en": "Experienced physical therapist",
    "ru": "Опытный физиотерапевт"
  },
  "profileImage": "https://example.com/john.jpg",
  "isActive": true,
  "createdAt": "2024-12-05T20:40:00.000Z",
  "updatedAt": "2024-12-05T20:40:00.000Z"
}
```

## Error Responses

### Email Already Exists (409)
```json
{
  "statusCode": 409,
  "message": "Instructor with this email already exists"
}
```

### Validation Error (400)
```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

## Other Endpoints

### Get All Instructors
```
GET http://localhost:4000/api/instructors
```

### Get Single Instructor
```
GET http://localhost:4000/api/instructors/:id
```

### Update Instructor
```
PATCH http://localhost:4000/api/instructors/:id
```
(Use same JSON format as create, but all fields are optional)

### Delete Instructor
```
DELETE http://localhost:4000/api/instructors/:id
```

## Tips

1. **For bio and htmlContent:** Always provide both `en` and `ru` translations
2. **For profileImage:** Use a publicly accessible URL (e.g., uploaded to cloud storage)
3. **For certificates:** The `url` field is optional, but recommended if available
4. **Date format:** Always use ISO format (YYYY-MM-DD) for dates
5. **Email uniqueness:** Each instructor must have a unique email address

## Quick Test Data

Here's minimal valid data for quick testing:

```json
{
  "name": "Test Instructor",
  "email": "test@example.com",
  "profession": "Therapist",
  "bio": {
    "en": "Test bio in English",
    "ru": "Тестовая биография на русском"
  },
  "profileImage": "https://via.placeholder.com/300"
}
```
