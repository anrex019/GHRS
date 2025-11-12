# 🎨 Font Standardization - Bowler Font Fix

## Current Situation

The project has **Bowler font set as the default** in `globals.css` (line 46):
```css
body {
  font-family: "Bowler", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

However, many components are using `font-pt` class which overrides Bowler with "Pt" font.

## Solution

Since Bowler is already the default font, we have two options:

### Option 1: Remove `font-pt` Classes (Recommended)
Simply remove all `font-pt` classes and let Bowler (the default) apply everywhere.

### Option 2: Replace with `font-bowler`
Explicitly add `font-bowler` class where needed.

## Files Using `font-pt` (Need Review)

### High Priority (User-Facing):
1. **`app/components/Professional.tsx`** - Line 146
2. **`app/components/VideoNotification.tsx`** - Lines 36, 54, 87
3. **`app/components/WorksSlider.tsx`** - Lines 121, 131
4. **`app/components/Navbar/LanguageSelector.tsx`** - Line 31
5. **`app/components/Header/SubHeader.jsx`** - Line 12
6. **`app/components/Header/Header.tsx`** - Lines 305, 428
7. **`app/allCourse/page.tsx`** - Lines 224, 261
8. **`app/allComplex/page.tsx`** - Line 171
9. **`app/player/page.tsx`** - Lines 1041, 1049

### Components Already Using Bowler Correctly:
- ✅ `DesktopNavbar.tsx` - Uses `font-[Bowler]`
- ✅ `SubHeader.jsx` - Uses `font-[Bowler]` for mobile title and category

## Quick Fix Script

To replace all `font-pt` with `font-bowler` (or remove them):

### Option A: Remove font-pt (Let default Bowler apply)
```bash
# Find all files with font-pt
find app -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) -exec grep -l "font-pt" {} \;

# Replace font-pt with empty string (removes the class)
find app -type f \( -name "*.tsx" -o -name "*.jsx" \) -exec sed -i '' 's/font-pt //g' {} \;
find app -type f \( -name "*.tsx" -o -name "*.jsx" \) -exec sed -i '' 's/ font-pt//g' {} \;
```

### Option B: Replace font-pt with font-bowler
```bash
find app -type f \( -name "*.tsx" -o -name "*.jsx" \) -exec sed -i '' 's/font-pt/font-bowler/g' {} \;
```

## Manual Fix (Safer)

I'll create a list of specific changes needed for each file.

## Recommendation

**Use Option 1 (Remove font-pt)** because:
1. Bowler is already the default font
2. Less code to maintain
3. Cleaner markup
4. Consistent with the design system

Only keep `font-pt` if specific sections **intentionally** need the Pt font for design reasons.

## Testing After Fix

1. Check homepage - all text should be in Bowler
2. Check blog page - titles and content in Bowler
3. Check course pages - descriptions in Bowler
4. Check navigation - menu items in Bowler
5. Verify no visual regressions

---

**Status**: Analysis complete, ready to apply fixes
**Impact**: MEDIUM - Visual consistency improvement
**Risk**: LOW - Bowler is already default, just removing overrides
