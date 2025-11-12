# Course Cards - Balanced & Square-shaped ✅

## რა შეიცვალა

### 1. ფიქსირებული სიმაღლე ✅
**პრობლემა:** Card-ები სხვადასხვა სიმაღლისაა

**გამოსწორება:**
```typescript
// Before:
<div className="bg-white rounded-[20px] p-1.5 pb-4 w-full h-full">

// After:
<div className="bg-white rounded-[20px] p-4 w-full h-[420px] md:h-[450px] flex flex-col">
```

ახლა ყველა card ერთი და იგივე სიმაღლისაა:
- Mobile: 420px
- Desktop: 450px

### 2. უფრო ოთხკუთხედი (კვადრატული) ✅
**პრობლემა:** ძალიან მართკუთხედი იყო (ვერტიკალური)

**გამოსწორება:**

**სურათის სიმაღლე შემცირდა:**
```typescript
// Before:
h-[233px]  // ძალიან მაღალი

// After:
h-[180px] md:h-[200px]  // უფრო დაბალანსებული
```

**Card-ის პროპორციები:**
- სიგანე: 50% (calc(50%-8px))
- სიმაღლე: 420-450px
- თანაფარდობა: ~1:1.2 (უფრო ოთხკუთხედი)

### 3. დაბალანსებული ზომები ✅

#### სურათი:
```typescript
// Before: 233px
// After: 180px (mobile), 200px (desktop)
```
შემცირდა ~15-20%

#### სათაური:
```typescript
// Before: text-[16px] md:text-[20px]
// After: text-[18px] md:text-[22px]
// + min-h-[3.5rem] - ფიქსირებული მინიმალური სიმაღლე
```
გაიზარდა ოდნავ და აქვს ფიქსირებული სიმაღლე

#### აღწერა:
```typescript
// Before: line-clamp-3, 150 chars
// After: line-clamp-2, 120 chars
```
შემცირდა 2 ხაზამდე, რომ არ იყოს ძალიან გრძელი

#### Padding:
```typescript
// Before: p-1.5 pb-4, px-4
// After: p-4 (ერთგვაროვანი)
```

### 4. Flexbox Layout ✅

```typescript
<div className="flex flex-col">
  <Image className="flex-shrink-0" />  // არ იზრდება
  <h5 className="min-h-[3.5rem]" />    // ფიქსირებული მინიმალური
  <p className="flex-grow" />          // იკავებს ხელმისაწვდომ სივრცეს
  <div className="mt-auto" />          // ყოველთვის ბოლოში
</div>
```

## ვიზუალური გაუმჯობესებები

### Before:
- ❌ სხვადასხვა სიმაღლე
- ❌ ძალიან მართკუთხედი (ვერტიკალური)
- ❌ სურათი ძალიან დიდი
- ❌ ბევრი ტექსტი

### After:
- ✅ ერთნაირი სიმაღლე (420/450px)
- ✅ უფრო ოთხკუთხედი პროპორციები
- ✅ დაბალანსებული სურათი (180/200px)
- ✅ ოპტიმალური ტექსტის რაოდენობა
- ✅ ფიქსირებული სათაურის სიმაღლე
- ✅ ღილაკი ყოველთვის ბოლოში

## დეტალური ზომები

### Mobile (< 768px):
```
Card: 85vw × 420px
Image: 100% × 180px
Title: 18px, 2 lines, min 3.5rem
Description: 14px, 2 lines
Button: 16px
```

### Desktop (≥ 768px):
```
Card: calc(50%-8px) × 450px
Image: 100% × 200px
Title: 22px, 2 lines, min 3.5rem
Description: 14px, 2 lines
Button: 18px
```

## Aspect Ratios

### სურათი:
- Before: ~16:9 (233px height)
- After: ~16:7 (180-200px height)
- უფრო ფართო, ნაკლები ვერტიკალური

### Card:
- Before: ~1:2.5 (ძალიან მართკუთხედი)
- After: ~1:1.2 (თითქმის კვადრატული)

## Spacing

```typescript
Card padding: p-4 (16px)
Image margin: mb-3 (12px)
Title margin: mb-2 (8px)
Description margin: mb-3 (12px)
Button padding: py-2.5 px-6
```

## ფონტები (უცვლელი)

- **სათაური:** font-bowler, font-semibold
- **აღწერა:** font-pt
- **ღილაკი:** font-bowler, font-bold

## ფერები (უცვლელი)

- **სათაური:** #1A1A1A
- **აღწერა:** #1A1A1A]/70
- **ღილაკი:** #D4BAFC → #C4A6F1 (hover)

## Responsive Behavior

### Mobile:
- Card-ები scroll-დებიან ჰორიზონტალურად
- სიგანე: 85vw
- სიმაღლე: 420px

### Tablet/Desktop:
- ორი card თანაბრად
- სიგანე: calc(50%-8px)
- სიმაღლე: 450px
- Gap: 16px (gap-4)

## ტესტირება

შეამოწმეთ:
1. ✅ ორივე card ერთი სიმაღლისაა
2. ✅ უფრო ოთხკუთხედი ფორმა
3. ✅ სურათი არ არის ძალიან დიდი
4. ✅ სათაური 2 ხაზზე მეტი არ არის
5. ✅ აღწერა 2 ხაზია
6. ✅ ღილაკი ყოველთვის ბოლოშია
7. ✅ ყველა card ერთნაირად გამოიყურება

## ფაილები

- `/app/components/CourseSlider.tsx` - Card layout და ზომები
