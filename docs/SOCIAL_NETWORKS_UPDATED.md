# Social Networks - Updated ✅

## What Was Changed

Added missing Russian social networks to the footer. Now all social media links are complete and correctly configured.

## Social Networks by Language

### Russian (RU) - 6 Networks
1. ✅ **YouTube** - https://www.youtube.com/@ghrsgroup (shown for all languages)
2. ✅ **VK** - https://vk.com/ghrsgroup
3. ✅ **OK (Odnoklassniki)** - https://ok.ru/group/70000002767733 ⭐ NEW
4. ✅ **Dzen** - https://dzen.ru/ghrsgroup ⭐ NEW
5. ✅ **Telegram** - https://t.me/ghrsgroup
6. ✅ **Rutube** - https://rutube.ru/channel/45999134/ ⭐ NEW

### English (EN) - 5 Networks
1. ✅ **YouTube** - https://www.youtube.com/@ghrsgroup (shown for all languages)
2. ✅ **Instagram** - https://instagram.com/ghrs_group
3. ✅ **Facebook** - https://www.facebook.com/ghrs.gr/
4. ✅ **Twitter** - https://twitter.com/ghrs_group
5. ✅ **LinkedIn** - https://www.linkedin.com/in/ghrs-group

### Georgian (KA) - 5 Networks
1. ✅ **YouTube** - https://www.youtube.com/@ghrsgroup (shown for all languages)
2. ✅ **VK** - https://vk.com/ghrsgroup
3. ✅ **Instagram** - https://instagram.com/ghrs_group
4. ✅ **Facebook** - https://www.facebook.com/ghrs.gr/
5. ✅ **Telegram** - https://t.me/ghrsgroup

## New Icons Added

### Odnoklassniki (OK)
- Orange circle (#EE8208)
- Custom SVG icon with OK logo

### Dzen
- Black circle with white ring and dot
- Minimalist design

### Rutube
- Cyan/blue circle (#00D8FF)
- Play button icon

## Features

- ✅ All links open in new tab (`target="_blank"`)
- ✅ Security attributes (`rel="noopener noreferrer"`)
- ✅ Hover effects (purple background on hover)
- ✅ Smooth transitions
- ✅ Tooltips on hover (title attribute)
- ✅ Responsive design

## Display Logic

- **YouTube**: Always visible for all languages (RU + EN + KA)
- **Russian networks**: Only visible when `locale === "ru"`
- **English networks**: Only visible when `locale === "en"`
- **Georgian**: Shows mix of VK, Instagram, Facebook, Telegram

## Testing

To test the social networks:

1. **Russian version:**
   - Switch language to RU
   - Should see: YouTube, VK, OK, Dzen, Telegram, Rutube

2. **English version:**
   - Switch language to EN
   - Should see: YouTube, Instagram, Facebook, Twitter, LinkedIn

3. **Georgian version:**
   - Switch language to KA
   - Should see: YouTube, VK, Instagram, Facebook, Telegram

## Notes

- All URLs are verified and match the provided requirements
- Icons are properly sized (w-12 h-12 = 48x48px)
- SVG icons are inline for better performance
- Color schemes match each platform's branding
