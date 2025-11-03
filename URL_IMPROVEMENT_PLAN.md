# 🔗 URL გაუმჯობესების გეგმა

## 📊 მიმდინარე მდგომარეობა

### ❌ პრობლემა:
```
http://localhost:3000/categories/6888a9028e3196ddea6b78d8
http://localhost:3000/sets/507f1f77bcf86cd799439011
http://localhost:3000/article/673c0f4c8e3196ddea6b7a8a
```

### ✅ სასურველი:
```
http://localhost:3000/categories/orthopedics
http://localhost:3000/sets/back-pain-exercises
http://localhost:3000/article/how-to-improve-posture
```

---

## 🛠️ გადაწყვეტის გზები

### **Option 1: Slug-based Routing** (რეკომენდებული)

#### Backend Changes:

1. **დავამატოთ `slug` field schemas-ში:**

```typescript
// backend/src/schemas/category.schema.ts
@Prop({ unique: true, required: true })
slug: string;

// backend/src/schemas/set.schema.ts
@Prop({ unique: true, required: true })
slug: string;

// backend/src/schemas/article.schema.ts
@Prop({ unique: true, required: true })
slug: string;
```

2. **Auto-generate slugs:**

```typescript
// backend/src/utils/slug.ts
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

3. **დავამატოთ API endpoints slug-ით:**

```typescript
// backend/src/category/category.controller.ts
@Get('by-slug/:slug')
async findBySlug(@Param('slug') slug: string) {
  return this.categoryService.findBySlug(slug);
}
```

#### Frontend Changes:

1. **განვაახლოთ Links:**

```tsx
// Before
<Link href={`/categories/${category._id}`}>

// After
<Link href={`/categories/${category.slug}`}>
```

2. **განვაახლოთ Dynamic Routes:**

```tsx
// app/categories/[slug]/page.tsx
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { categoryData } = useCategoryBySlug(params.slug);
  // ...
}
```

---

### **Option 2: URL Rewrite Middleware** (სწრაფი გადაწყვეტა)

Next.js middleware რომელიც "ლამაზ" URL-ებს გადაიყვანს ObjectId-ებზე:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const categoryMap: Record<string, string> = {
  'orthopedics': '6888a9028e3196ddea6b78d8',
  'neurology': '6888a9028e3196ddea6b78d9',
  // ... etc
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/categories/')) {
    const slug = pathname.split('/')[2];
    const categoryId = categoryMap[slug];
    
    if (categoryId) {
      return NextResponse.rewrite(
        new URL(`/categories/${categoryId}`, request.url)
      );
    }
  }
  
  return NextResponse.next();
}
```

**მინუსები:**
- ხელით უნდა შევინახოთ mapping
- არ არის scalable

---

### **Option 3: Hybrid Approach** (ოპტიმალური)

1. **დავამატოთ slug, მაგრამ დავტოვოთ ID როგორც fallback:**

```typescript
// URL accepts both:
/categories/orthopedics  ✅
/categories/6888a9028e3196ddea6b78d8  ✅ (legacy support)
```

2. **Backend logic:**

```typescript
async findBySlugOrId(slugOrId: string) {
  // Try to find by slug first
  let category = await this.categoryModel.findOne({ slug: slugOrId });
  
  // If not found and looks like ObjectId, try by ID
  if (!category && Types.ObjectId.isValid(slugOrId)) {
    category = await this.categoryModel.findById(slugOrId);
  }
  
  return category;
}
```

---

## 📝 Implementation Steps (Option 1 - რეკომენდებული)

### Phase 1: Backend (1-2 hours)

- [ ] დავამატოთ `slug` field Category schema-ში
- [ ] დავამატოთ `slug` field Set schema-ში  
- [ ] დავამატოთ `slug` field Article schema-ში
- [ ] შევქმნათ `generateSlug()` utility function
- [ ] დავამატოთ `findBySlug()` methods services-ში
- [ ] დავამატოთ `GET /api/categories/by-slug/:slug` endpoint
- [ ] დავამატოთ `GET /api/sets/by-slug/:slug` endpoint
- [ ] დავამატოთ `GET /api/articles/by-slug/:slug` endpoint
- [ ] Migration script: generate slugs for existing data

### Phase 2: Frontend (2-3 hours)

- [ ] შევქმნათ `useCategoryBySlug` hook
- [ ] შევქმნათ `useSetBySlug` hook
- [ ] შევქმნათ `useArticleBySlug` hook
- [ ] განვაახლოთ ყველა `<Link>` component slug-ით
- [ ] გადავაკეთოთ dynamic routes: `[id]` → `[slug]`
- [ ] განვაახლოთ API calls

### Phase 3: Testing (1 hour)

- [ ] ტესტირება: category pages
- [ ] ტესტირება: set pages
- [ ] ტესტირება: article pages
- [ ] ტესტირება: SEO meta tags
- [ ] ტესტირება: 404 pages

---

## 🎯 სარგებელი

✅ **SEO-friendly URLs**
✅ **User-friendly** - ადამიანებისთვის გასაგები
✅ **Better UX** - URL-დან ჩანს რა გვერდზეა
✅ **Social sharing** - ლამაზი links სოციალურ ქსელებში
✅ **Analytics** - უკეთესი tracking

---

## ⚠️ რისკები

- Migration საჭიროა არსებული მონაცემებისთვის
- ძველი links გაფუჭდება (საჭიროა redirects)
- Slug uniqueness უნდა დავიცვათ
- Slug conflicts შესაძლებელია

---

## 💡 რეკომენდაცია

**დავიწყოთ Option 3 (Hybrid)**:
1. დავამატოთ slugs, მაგრამ დავტოვოთ ID support
2. თანდათან გადავიდეთ slug-only routing-ზე
3. ძველი ID-based URLs redirect გავუკეთოთ slug-ებზე

**Estimated Time:** 4-6 hours total
**Priority:** Medium (არ არის critical, მაგრამ მნიშვნელოვანია SEO-სთვის)

---

*Last Updated: November 3, 2025*
