# 🌐 Translation Issues Found - Hardcoded Russian Text

## Problem
When the website is set to English, some text still appears in Russian because it's hardcoded in the components instead of using the translation system.

## Files with Hardcoded Russian Text

### 1. **app/components/CategoryFilter.tsx**
**Lines 35, 153-156** - Sort dropdown options
```typescript
const [sort, setSort] = useState("По популярности");

<option>По популярности</option>
<option>По новизне</option>
<option>По цене (возрастание)</option>
<option>По цене (убывание)</option>
```

### 2. **app/allCourse/page.tsx**
**Lines 46, 114-117** - Sort options
```typescript
const [sortBy, setSortBy] = useState<string>("По популярности");

if (sortBy === "По популярности") {
  // sorting logic
} else if (sortBy === "По новизне") {
  // sorting logic
}
```

### 3. **app/components/PersonalAccount/PersonGoals.tsx**
**Multiple lines** - Calendar booking modal
- Line 25: `"Yandex Календарь"`
- Line 59: `"Бронирование календаря"`
- Line 62-64: Calendar details in Russian
- Line 83-90: Email body in Russian
- Line 94: Email subject in Russian
- Line 117: Success message in Russian
- Line 261-295: Confirmation modal text in Russian

### 4. **app/components/ReviewSlider.tsx**
**Line 153** - Hardcoded title
```typescript
{title || "ОТЗЫВЫ О GRS"}
```

## Solution Approach

All hardcoded text needs to be replaced with `t()` function calls that reference translation keys.

### Example Fix:
**Before:**
```typescript
const [sort, setSort] = useState("По популярности");
<option>По популярности</option>
```

**After:**
```typescript
const { t } = useI18n();
const [sort, setSort] = useState(t("sort.popularity"));
<option>{t("sort.popularity")}</option>
```

## Translation Keys Needed

Add these to translation files (`/public/locales/{lang}/common.json`):

```json
{
  "sort": {
    "popularity": "By Popularity",
    "newest": "By Newest",
    "priceAsc": "By Price (Low to High)",
    "priceDesc": "By Price (High to Low)"
  },
  "calendar": {
    "yandex": "Yandex Calendar",
    "booking": "Calendar Booking",
    "bookingTitle": "Calendar Booking - {days}",
    "bookingDetails": "Booked days: {days}\nTime: {timeFrom} - {timeTo}\nCalendar: {calendar}",
    "emailSubject": "Calendar Booking Confirmation",
    "emailBody": "Hello!\n\nYour calendar booking is confirmed:\n\nDays: {days}\nTime: {timeFrom} - {timeTo}\nCalendar: {calendar}\n\nTo add to Google Calendar, follow this link:\n{link}\n\nBest regards,\nYour Team",
    "successMessage": "Calendar successfully booked! Check your email and Google Calendar.",
    "confirmation": "Confirmation",
    "confirmMessage": "Are you sure you want to book the calendar?",
    "bookingDetailsTitle": "Booking Details:",
    "days": "Days:",
    "time": "Time:",
    "calendarLabel": "Calendar:",
    "notSelected": "Not selected",
    "cancel": "Cancel",
    "confirm": "Confirm"
  },
  "reviews": {
    "title": "REVIEWS ABOUT GRS"
  }
}
```

## Priority Fixes

1. **HIGH**: Sort dropdowns (visible on main pages)
2. **HIGH**: ReviewSlider title
3. **MEDIUM**: PersonGoals calendar booking (less frequently used)
4. **LOW**: Other minor text

## Status
- ❌ Not fixed yet
- 📝 Documented
- ⏳ Awaiting implementation
