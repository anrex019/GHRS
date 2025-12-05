# Blog Article Creation Guide

## API Endpoint

**Create Article:**
```
POST http://localhost:4000/api/articles
```

## Required Fields

Before creating an article, you need:
1. **Blog ID** - Get from `GET http://localhost:4000/api/blogs`
2. **Category ID(s)** - Get from `GET http://localhost:4000/api/categories`

## Article Structure

### Minimal Article Example

```json
{
  "title": {
    "en": "Introduction to Physical Therapy",
    "ru": "Введение в физиотерапию",
    "ka": "ფიზიოთერაპიის შესავალი"
  },
  "excerpt": {
    "en": "Learn the basics of physical therapy and its benefits",
    "ru": "Изучите основы физиотерапии и ее преимущества",
    "ka": "შეისწავლეთ ფიზიოთერაპიის საფუძვლები და მისი სარგებელი"
  },
  "content": {
    "en": "<h2>What is Physical Therapy?</h2><p>Physical therapy is a healthcare profession...</p>",
    "ru": "<h2>Что такое физиотерапия?</h2><p>Физиотерапия - это медицинская профессия...</p>",
    "ka": "<h2>რა არის ფიზიოთერაპია?</h2><p>ფიზიოთერაპია არის ჯანდაცვის პროფესია...</p>"
  },
  "blogId": "507f1f77bcf86cd799439011",
  "categoryId": ["507f1f77bcf86cd799439012"],
  "author": {
    "name": "Dr. John Smith",
    "bio": "Physical therapy specialist with 15 years of experience",
    "avatar": "https://example.com/avatar.jpg"
  },
  "readTime": "5 min",
  "isPublished": true,
  "isFeatured": false
}
```

### Complete Article Example with All Fields

```json
{
  "title": {
    "en": "Advanced Rehabilitation Techniques",
    "ru": "Продвинутые техники реабилитации",
    "ka": "რეაბილიტაციის მოწინავე ტექნიკა"
  },
  "excerpt": {
    "en": "Discover modern rehabilitation methods for faster recovery",
    "ru": "Откройте для себя современные методы реабилитации для более быстрого восстановления",
    "ka": "აღმოაჩინეთ რეაბილიტაციის თანამედროვე მეთოდები სწრაფი გამოჯანმრთელებისთვის"
  },
  "content": {
    "en": "<h2>Introduction</h2><p>Rehabilitation is crucial...</p><h2>Key Techniques</h2><p>Modern approaches include...</p>",
    "ru": "<h2>Введение</h2><p>Реабилитация имеет решающее значение...</p><h2>Ключевые техники</h2><p>Современные подходы включают...</p>",
    "ka": "<h2>შესავალი</h2><p>რეაბილიტაცია გადამწყვეტია...</p><h2>ძირითადი ტექნიკა</h2><p>თანამედროვე მიდგომები მოიცავს...</p>"
  },
  "blogId": "507f1f77bcf86cd799439011",
  "categoryId": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
  "featuredImages": [
    "https://example.com/images/article1.jpg",
    "https://example.com/images/article2.jpg"
  ],
  "author": {
    "name": "Dr. Sarah Johnson",
    "bio": "Rehabilitation specialist and researcher",
    "avatar": "https://example.com/sarah-avatar.jpg"
  },
  "readTime": "8 min",
  "tableOfContents": [
    {
      "title": {
        "en": "Introduction",
        "ru": "Введение",
        "ka": "შესავალი"
      },
      "anchor": "introduction"
    },
    {
      "title": {
        "en": "Key Techniques",
        "ru": "Ключевые техники",
        "ka": "ძირითადი ტექნიკა"
      },
      "anchor": "key-techniques"
    },
    {
      "title": {
        "en": "Case Studies",
        "ru": "Кейс-стади",
        "ka": "შემთხვევის შესწავლა"
      },
      "anchor": "case-studies"
    }
  ],
  "tags": ["rehabilitation", "physical-therapy", "recovery", "health"],
  "isPublished": true,
  "isFeatured": true,
  "publishDate": "2024-12-05T00:00:00.000Z",
  "sortOrder": 1
}
```

## Field Descriptions

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | Object | Article title in all languages |
| `title.en` | String | Title in English |
| `title.ru` | String | Title in Russian |
| `title.ka` | String | Title in Georgian |
| `excerpt` | Object | Short summary (preview text) |
| `excerpt.en` | String | Excerpt in English |
| `excerpt.ru` | String | Excerpt in Russian |
| `excerpt.ka` | String | Excerpt in Georgian |
| `content` | Object | Full article content (HTML supported) |
| `content.en` | String | Content in English |
| `content.ru` | String | Content in Russian |
| `content.ka` | String | Content in Georgian |
| `blogId` | String | ID of the blog this article belongs to |
| `categoryId` | Array | Array of category IDs |
| `author` | Object | Author information |
| `author.name` | String | Author's name |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `author.bio` | String | - | Author biography |
| `author.avatar` | String | - | Author avatar URL |
| `featuredImages` | Array | [] | Array of image URLs |
| `readTime` | String | - | Estimated read time (e.g., "5 min") |
| `tableOfContents` | Array | [] | Table of contents items |
| `tags` | Array | [] | Article tags |
| `isPublished` | Boolean | false | Publication status |
| `isFeatured` | Boolean | false | Featured article status |
| `publishDate` | Date | now | Publication date |
| `sortOrder` | Number | 0 | Display order |
| `commentsCount` | Number | 0 | Number of comments |
| `viewsCount` | Number | 0 | Number of views |
| `likesCount` | Number | 0 | Number of likes |
| `isActive` | Boolean | true | Active status |

## Step-by-Step Guide

### Step 1: Get Blog ID

```bash
curl http://localhost:4000/api/blogs
```

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": {
      "en": "GRS Blog",
      "ru": "Блог GRS",
      "ka": "GRS ბლოგი"
    }
  }
]
```

### Step 2: Get Category IDs

```bash
curl http://localhost:4000/api/categories
```

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": {
      "en": "Rehabilitation",
      "ru": "Реабилитация",
      "ka": "რეაბილიტაცია"
    }
  }
]
```

### Step 3: Create Article

```bash
curl -X POST http://localhost:4000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "en": "My First Article",
      "ru": "Моя первая статья",
      "ka": "ჩემი პირველი სტატია"
    },
    "excerpt": {
      "en": "This is a test article",
      "ru": "Это тестовая статья",
      "ka": "ეს არის სატესტო სტატია"
    },
    "content": {
      "en": "<p>Article content in English</p>",
      "ru": "<p>Содержание статьи на русском</p>",
      "ka": "<p>სტატიის შინაარსი ქართულად</p>"
    },
    "blogId": "507f1f77bcf86cd799439011",
    "categoryId": ["507f1f77bcf86cd799439012"],
    "author": {
      "name": "Test Author"
    },
    "readTime": "3 min",
    "isPublished": true
  }'
```

## Quick Test Article

Here's a minimal article for quick testing:

```json
{
  "title": {
    "en": "Test Article",
    "ru": "Тестовая статья",
    "ka": "სატესტო სტატია"
  },
  "excerpt": {
    "en": "Test excerpt",
    "ru": "Тестовое описание",
    "ka": "სატესტო აღწერა"
  },
  "content": {
    "en": "<p>Test content</p>",
    "ru": "<p>Тестовый контент</p>",
    "ka": "<p>სატესტო კონტენტი</p>"
  },
  "blogId": "YOUR_BLOG_ID_HERE",
  "categoryId": ["YOUR_CATEGORY_ID_HERE"],
  "author": {
    "name": "Test Author"
  },
  "readTime": "1 min",
  "isPublished": true
}
```

## HTML Content Tips

You can use HTML in the `content` field:

```html
<h2>Section Title</h2>
<p>Paragraph text with <strong>bold</strong> and <em>italic</em> formatting.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<img src="https://example.com/image.jpg" alt="Description" />
<blockquote>Quote text</blockquote>
```

## Table of Contents

If your article has sections, add a table of contents:

```json
{
  "tableOfContents": [
    {
      "title": {
        "en": "Introduction",
        "ru": "Введение",
        "ka": "შესავალი"
      },
      "anchor": "introduction"
    },
    {
      "title": {
        "en": "Main Content",
        "ru": "Основное содержание",
        "ka": "ძირითადი შინაარსი"
      },
      "anchor": "main-content"
    }
  ]
}
```

Then in your content, use anchors:
```html
<h2 id="introduction">Introduction</h2>
<p>Introduction text...</p>

<h2 id="main-content">Main Content</h2>
<p>Main content text...</p>
```

## Other Endpoints

### Get All Articles
```
GET http://localhost:4000/api/articles
```

### Get Single Article
```
GET http://localhost:4000/api/articles/:id
```

### Get Published Articles
```
GET http://localhost:4000/api/articles?isPublished=true
```

### Get Featured Articles
```
GET http://localhost:4000/api/articles?isFeatured=true
```

### Update Article
```
PATCH http://localhost:4000/api/articles/:id
```

### Delete Article
```
DELETE http://localhost:4000/api/articles/:id
```

## Common Issues

### 1. "Blog not found"
- Make sure the `blogId` exists
- Get valid blog IDs from `GET /api/blogs`

### 2. "Category not found"
- Make sure all category IDs in the `categoryId` array exist
- Get valid category IDs from `GET /api/categories`

### 3. Missing translations
- All three languages (en, ru, ka) are required for title, excerpt, and content
- Make sure to provide all three in your request

## Translation Reference

### English
- Article
- Blog Post
- Author
- Read Time
- Published
- Featured

### Russian (Русский)
- Статья
- Запись в блоге
- Автор
- Время чтения
- Опубликовано
- Избранное

### Georgian (ქართული)
- სტატია
- ბლოგ პოსტი
- ავტორი
- კითხვის დრო
- გამოქვეყნებული
- გამორჩეული

## Summary

✅ **Articles support full multilingual content** (en, ru, ka)  
✅ **HTML content supported** for rich formatting  
✅ **Table of contents** for long articles  
✅ **Featured images** support  
✅ **Tags and categories** for organization  
✅ **Author information** with bio and avatar  
✅ **Publication control** (published/draft status)  

Create your first article using the minimal example above!
