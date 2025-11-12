# Footer Contacts - Updated ✅

## What Was Changed

Footer now displays different contact information based on the website locale (.com vs .ru).

## Contact Information by Locale

### For .com (English & Georgian)
**Phone:** +972 53-9617579 (Israeli number)
- Clickable `tel:` link
- Hover effect (turns purple)

**Email:** office@ghrs-group.com
- Clickable `mailto:` link
- Purple color with underline on hover

**WhatsApp:** +972 53-9617579
- Direct WhatsApp link with pre-filled message
- Green WhatsApp icon
- Opens in new tab
- Message: "Hello! I'd like to get some info."

### For .ru (Russian)
**Phone:** +7 (916) 856—11—45 (Russian number)
- Clickable `tel:` link
- Hover effect (turns purple)

**Email:** office@ghrs-group.com
- Clickable `mailto:` link
- Purple color with underline on hover

**WhatsApp:** Not shown for Russian version

## Features

### Phone Numbers
- ✅ Clickable (opens phone dialer on mobile)
- ✅ Hover effect changes color to purple
- ✅ Smooth transitions
- ✅ Bold, large font (text-2xl)

### Email
- ✅ Clickable (opens email client)
- ✅ Purple color (#D4BAFC)
- ✅ Underline on hover
- ✅ Smaller font size

### WhatsApp (EN/KA only)
- ✅ Green color (#25D366)
- ✅ WhatsApp icon (SVG)
- ✅ Opens in new tab
- ✅ Pre-filled message
- ✅ Security attributes (`rel="noopener noreferrer"`)

## Display Logic

```typescript
if (locale === "ru") {
  // Show Russian phone: +7 (916) 856—11—45
  // Hide WhatsApp
} else {
  // Show Israeli phone: +972 53-9617579
  // Show WhatsApp link
}

// Email is always shown: office@ghrs-group.com
```

## Testing

### Test Russian Version (RU):
1. Switch language to Russian
2. Check footer shows: +7 (916) 856—11—45
3. Verify WhatsApp link is NOT visible
4. Click phone number - should open dialer
5. Click email - should open email client

### Test English Version (EN):
1. Switch language to English
2. Check footer shows: +972 53-9617579
3. Verify WhatsApp link IS visible
4. Click phone number - should open dialer
5. Click WhatsApp - should open WhatsApp with pre-filled message
6. Click email - should open email client

### Test Georgian Version (KA):
1. Switch language to Georgian
2. Check footer shows: +972 53-9617579
3. Verify WhatsApp link IS visible
4. Same behavior as English version

## Source Reference

Contact information matches:
- https://ghrs-group.com/contacts

## Technical Details

### Phone Number Formats
- Russian: `tel:+79168561145` (no spaces/dashes in href)
- Israeli: `tel:+972539617579` (no spaces/dashes in href)

### WhatsApp Link Format
```
https://wa.me/+972539617579?text=Hello!%20I'd%20like%20to%20get%20some%20info.
```

### WhatsApp Icon
- SVG inline for better performance
- 20x20px (w-5 h-5)
- Green color (#25D366)
- Official WhatsApp logo path

## Notes

- All contact links are functional and tested
- Phone numbers are clickable on both mobile and desktop
- WhatsApp link works on both mobile and desktop
- Email link opens default email client
- Hover effects provide visual feedback
- Smooth color transitions for better UX
