# Consultation Email - Working Hours Update ✅

## რა შეიცვალა

განახლდა consultation request confirmation emails-ში working hours ინფორმაცია სწორი time zone-ებით.

## Working Hours by Domain

### .com (EN/KA locales) - Tel Aviv Time Zone
```
9:00 AM - 7:00 PM (Tel Aviv time zone)
```

### .ru (RU locale) - Moscow Time Zone
```
9:00 - 19:00 по МСК
```

## Email Templates

### English (EN)
```html
<h2>Thank you for your request!</h2>
<p>Dear ${name},</p>
<p>We have received your consultation request and will contact you shortly.</p>
<p><strong>Please note our working hours: 9:00 AM - 7:00 PM (Tel Aviv time zone)</strong></p>
<p>Best regards,<br>GHRS Team</p>
```

### Georgian (KA)
```html
<h2>მადლობა თქვენი განაცხადისთვის!</h2>
<p>ძვირფასო ${name},</p>
<p>ჩვენ მივიღეთ თქვენი განაცხადი კონსულტაციისთვის და მალე დაგიკავშირდებით.</p>
<p><strong>გთხოვთ გაითვალისწინოთ ჩვენი სამუშაო საათები: 9:00 - 19:00 (თელ-ავივის დროითი სარტყელი)</strong></p>
<p>პატივისცემით,<br>GHRS გუნდი</p>
```

### Russian (RU)
```html
<h2>Спасибо за вашу заявку!</h2>
<p>Уважаемый(ая) ${name},</p>
<p>Мы получили вашу заявку на консультацию и свяжемся с вами в ближайшее время.</p>
<p>Наши рабочие часы: 9:00 - 19:00 по МСК</p>
<p>С уважением,<br>Команда GHRS</p>
```

## Time Zone Logic

### Domain-based Time Zones:
- **ghrs-group.com** → Tel Aviv (Israel Standard Time, UTC+2/+3)
- **ghrs-group.ru** → Moscow (MSK, UTC+3)

### Locale Mapping:
| Locale | Domain | Time Zone | Working Hours |
|--------|--------|-----------|---------------|
| EN     | .com   | Tel Aviv  | 9:00 - 19:00 IST |
| KA     | .com   | Tel Aviv  | 9:00 - 19:00 IST |
| RU     | .ru    | Moscow    | 9:00 - 19:00 MSK |

## ცვლილებები კოდში

### Before:
```typescript
// EN
<p>Our working hours: 9:00 AM - 7:00 PM MSK</p>  // ❌ არასწორი

// KA
<p>ჩვენი სამუშაო საათები: 9:00 - 19:00 მოსკოვის დროით</p>  // ❌ არასწორი

// RU
<p>Наши рабочие часы: 9:00 - 19:00 по МСК</p>  // ✅ სწორი
```

### After:
```typescript
// EN
<p><strong>Please note our working hours: 9:00 AM - 7:00 PM (Tel Aviv time zone)</strong></p>  // ✅

// KA
<p><strong>გთხოვთ გაითვალისწინოთ ჩვენი სამუშაო საათები: 9:00 - 19:00 (თელ-ავივის დროითი სარტყელი)</strong></p>  // ✅

// RU
<p>Наши рабочие часы: 9:00 - 19:00 по МСК</p>  // ✅
```

## დამატებითი გაუმჯობესებები

### 1. Bold Formatting
დაემატა `<strong>` tag-ები EN და KA ვერსიებში რომ working hours უფრო თვალსაჩინო იყოს.

### 2. "Please note" Phrase
დაემატა "Please note" / "გთხოვთ გაითვალისწინოთ" რომ მომხმარებელმა ყურადღება მიაქციოს.

### 3. Explicit Time Zone
ნათლად მითითებულია time zone თითოეულ ენაზე:
- EN: "(Tel Aviv time zone)"
- KA: "(თელ-ავივის დროითი სარტყელი)"
- RU: "по МСК"

## როგორ მუშაობს

### Email Flow:
1. მომხმარებელი ავსებს consultation form-ს
2. Backend ინახავს მონაცემებს MongoDB-ში
3. Backend აგზავნის 2 email-ს:
   - **Admin email** - office@ghrs-group.com
   - **User confirmation** - მომხმარებლის email-ზე
4. User email შეიცავს working hours ინფორმაციას locale-ის მიხედვით

### Locale Detection:
```typescript
const texts = localeTexts[request.locale as keyof typeof localeTexts] || localeTexts.en;
```

თუ locale არ არის `en`, `ru`, ან `ka`, default-ად იყენებს `en` (Tel Aviv time zone).

## ტესტირება

### როგორ ვატესტო:

1. **English (.com):**
   ```bash
   curl -X POST http://localhost:4000/api/consultation \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "test@example.com",
       "phone": "+972501234567",
       "locale": "en"
     }'
   ```
   ✅ უნდა მოვიდეს email-ი: "9:00 AM - 7:00 PM (Tel Aviv time zone)"

2. **Georgian (.com):**
   ```bash
   curl -X POST http://localhost:4000/api/consultation \
     -H "Content-Type: application/json" \
     -d '{
       "name": "გიორგი",
       "email": "test@example.com",
       "phone": "+995591234567",
       "locale": "ka"
     }'
   ```
   ✅ უნდა მოვიდეს email-ი: "9:00 - 19:00 (თელ-ავივის დროითი სარტყელი)"

3. **Russian (.ru):**
   ```bash
   curl -X POST http://localhost:4000/api/consultation \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Иван",
       "email": "test@example.com",
       "phone": "+79161234567",
       "locale": "ru"
     }'
   ```
   ✅ უნდა მოვიდეს email-ი: "9:00 - 19:00 по МСК"

## შენიშვნები

### Time Zone Differences:
- **Tel Aviv (IST):** UTC+2 (winter), UTC+3 (summer - DST)
- **Moscow (MSK):** UTC+3 (year-round, no DST since 2014)

### Same Hours, Different Time Zones:
ორივე ოფისი მუშაობს 9:00-19:00 **თავიანთ** time zone-ში:
- Tel Aviv: 9:00-19:00 IST
- Moscow: 9:00-19:00 MSK

### მაგალითი:
როდესაც Tel Aviv-ში 9:00 AM (IST), Moscow-ში არის:
- ზამთარში: 10:00 AM (MSK) - 1 საათის სხვაობა
- ზაფხულში: 9:00 AM (MSK) - იგივე დრო

## ფაილები რომლებიც შეიცვალა

- `/backend/src/consultation/consultation.service.ts` - Email templates

## დაკავშირებული დოკუმენტაცია

- [CONSULTATION_REQUEST_IMPLEMENTATION.md](./CONSULTATION_REQUEST_IMPLEMENTATION.md)
- [CONSULTATION_TROUBLESHOOTING.md](./CONSULTATION_TROUBLESHOOTING.md)

## Backend Restart

ცვლილებების ამოქმედებისთვის backend-ის restart არ არის საჭირო თუ იყენებ `npm run start:dev` (hot reload).

თუ production mode-ში ხარ:
```bash
cd backend
npm run build
pm2 restart ghrs-backend
```

---

**განახლების თარიღი:** November 12, 2025
**სტატუსი:** ✅ დასრულებული
