# Course Curriculum (Учебный План) Guide

## ✅ Good News!

The curriculum feature **already exists** in your course schema! It's called `syllabus` in the code.

## Field Name

- **Backend field name:** `syllabus`
- **Russian translation:** Учебный план (Curriculum)
- **English translation:** Syllabus / Curriculum

## How to Use Curriculum

### 1. Creating a Course with Curriculum

When creating a course, include the `syllabus` array in your request:

```json
{
  "title": {
    "en": "Physical Therapy Basics",
    "ru": "Основы физиотерапии"
  },
  "description": {
    "en": "Learn the fundamentals of physical therapy",
    "ru": "Изучите основы физиотерапии"
  },
  "price": 5000,
  "thumbnail": "https://example.com/thumbnail.jpg",
  "isPublished": true,
  "instructor": {
    "name": "Dr. John Smith"
  },
  "languages": ["en", "ru"],
  "categoryId": "507f1f77bcf86cd799439011",
  
  "syllabus": [
    {
      "title": {
        "en": "Introduction to Physical Therapy",
        "ru": "Введение в физиотерапию"
      },
      "description": {
        "en": "Overview of physical therapy principles and practices",
        "ru": "Обзор принципов и практик физиотерапии"
      },
      "duration": 60
    },
    {
      "title": {
        "en": "Anatomy and Physiology",
        "ru": "Анатомия и физиология"
      },
      "description": {
        "en": "Understanding human body structure and function",
        "ru": "Понимание структуры и функций человеческого тела"
      },
      "duration": 90
    },
    {
      "title": {
        "en": "Assessment Techniques",
        "ru": "Техники оценки"
      },
      "description": {
        "en": "Learn how to assess patient conditions",
        "ru": "Научитесь оценивать состояние пациентов"
      },
      "duration": 120
    },
    {
      "title": {
        "en": "Treatment Methods",
        "ru": "Методы лечения"
      },
      "description": {
        "en": "Various treatment approaches and techniques",
        "ru": "Различные подходы и техники лечения"
      },
      "duration": 150
    },
    {
      "title": {
        "en": "Practical Applications",
        "ru": "Практическое применение"
      },
      "description": {
        "en": "Hands-on practice and case studies",
        "ru": "Практическая работа и кейс-стади"
      },
      "duration": 180
    }
  ]
}
```

### 2. Curriculum Structure

Each curriculum item (syllabus item) has:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | Object | Yes | Module/lesson title |
| `title.en` | String | Yes | Title in English |
| `title.ru` | String | Optional | Title in Russian |
| `description` | Object | Yes | Module/lesson description |
| `description.en` | String | Yes | Description in English |
| `description.ru` | String | Optional | Description in Russian |
| `duration` | Number | Optional | Duration in minutes |

### 3. API Endpoints

#### Create Course with Curriculum
```
POST http://localhost:4000/api/courses
```

#### Update Course Curriculum
```
PATCH http://localhost:4000/api/courses/:courseId
```

Send only the `syllabus` field to update just the curriculum:
```json
{
  "syllabus": [
    {
      "title": {
        "en": "Updated Module Title",
        "ru": "Обновленное название модуля"
      },
      "description": {
        "en": "Updated description",
        "ru": "Обновленное описание"
      },
      "duration": 90
    }
  ]
}
```

#### Get Course (includes curriculum)
```
GET http://localhost:4000/api/courses/:courseId
```

The response will include the `syllabus` array.

### 4. Example cURL Command

```bash
curl -X POST http://localhost:4000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": {
      "en": "Test Course",
      "ru": "Тестовый курс"
    },
    "description": {
      "en": "Test description",
      "ru": "Тестовое описание"
    },
    "price": 1000,
    "thumbnail": "https://example.com/thumb.jpg",
    "isPublished": false,
    "instructor": {
      "name": "Test Instructor"
    },
    "languages": ["en", "ru"],
    "categoryId": "507f1f77bcf86cd799439011",
    "syllabus": [
      {
        "title": {
          "en": "Module 1",
          "ru": "Модуль 1"
        },
        "description": {
          "en": "First module",
          "ru": "Первый модуль"
        },
        "duration": 60
      }
    ]
  }'
```

### 5. Minimal Example

Here's a minimal course with curriculum:

```json
{
  "title": {
    "en": "Quick Course"
  },
  "description": {
    "en": "Quick description"
  },
  "price": 500,
  "thumbnail": "https://via.placeholder.com/300",
  "isPublished": false,
  "instructor": {
    "name": "Instructor Name"
  },
  "languages": ["en"],
  "categoryId": "your-category-id-here",
  "syllabus": [
    {
      "title": {
        "en": "Lesson 1"
      },
      "description": {
        "en": "First lesson content"
      },
      "duration": 30
    },
    {
      "title": {
        "en": "Lesson 2"
      },
      "description": {
        "en": "Second lesson content"
      },
      "duration": 45
    }
  ]
}
```

## Translation Reference

### English Terms
- Curriculum / Syllabus
- Module
- Lesson
- Duration (minutes)
- Description

### Russian Terms (Русский)
- Учебный план
- Модуль
- Урок
- Продолжительность (минуты)
- Описание

### Georgian Terms (ქართული)
- სასწავლო გეგმა
- მოდული
- გაკვეთილი
- ხანგრძლივობა (წუთები)
- აღწერა

## Frontend Display

When displaying the curriculum on the frontend, you can access it like this:

```typescript
// Get course data
const course = await fetch(`/api/courses/${courseId}`);
const courseData = await course.json();

// Access curriculum
const curriculum = courseData.syllabus;

// Display curriculum items
curriculum.forEach((item, index) => {
  console.log(`Module ${index + 1}:`);
  console.log(`Title: ${item.title.en} / ${item.title.ru}`);
  console.log(`Description: ${item.description.en}`);
  console.log(`Duration: ${item.duration} minutes`);
});
```

## Tips

1. **Duration**: Specify duration in minutes (e.g., 60 = 1 hour, 90 = 1.5 hours)
2. **Order**: Curriculum items are stored in the order you provide them
3. **Languages**: Always provide at least English (`en`), Russian (`ru`) is optional
4. **Updates**: When updating curriculum, send the complete new array (it replaces the old one)
5. **Empty Curriculum**: It's optional - you can create a course without curriculum

## Common Use Cases

### 1. Multi-week Course
```json
{
  "syllabus": [
    {
      "title": { "en": "Week 1: Foundations", "ru": "Неделя 1: Основы" },
      "description": { "en": "Basic concepts", "ru": "Базовые концепции" },
      "duration": 300
    },
    {
      "title": { "en": "Week 2: Advanced Topics", "ru": "Неделя 2: Продвинутые темы" },
      "description": { "en": "Deep dive", "ru": "Углубленное изучение" },
      "duration": 360
    }
  ]
}
```

### 2. Short Workshop
```json
{
  "syllabus": [
    {
      "title": { "en": "Introduction", "ru": "Введение" },
      "description": { "en": "Overview", "ru": "Обзор" },
      "duration": 15
    },
    {
      "title": { "en": "Hands-on Practice", "ru": "Практика" },
      "description": { "en": "Practical exercises", "ru": "Практические упражнения" },
      "duration": 45
    }
  ]
}
```

## Summary

✅ **Curriculum field exists** - it's called `syllabus`  
✅ **Fully multilingual** - supports English and Russian  
✅ **Flexible structure** - title, description, and duration for each module  
✅ **Already implemented** - ready to use in your API  

You don't need to create anything new - just use the `syllabus` field when creating or updating courses!
