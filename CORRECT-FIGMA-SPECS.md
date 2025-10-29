# ✅ Correct Figma Specifications Applied

## Card Dimensions (CORRECTED)

### Both Cards:
- **Width**: 246px ✅
- **Height**: 222px ✅
- **Both cards are identical in size**

## Border Radius - Specific Corners

### Cards (246×222px):
- **Top-Left**: 32px ✅ `rounded-tl-[32px]`
- **Top-Right**: 0px (square) ✅
- **Bottom-Left**: 0px (square) ✅
- **Bottom-Right**: 32px ✅ `rounded-br-[32px]`

**CSS**: `rounded-tl-[32px] rounded-br-[32px]`

### Container (Background):
- **Top-Left**: 60px ✅ `rounded-tl-[60px]`
- **Top-Right**: 0px (square) ✅
- **Bottom-Left**: 0px (square) ✅
- **Bottom-Right**: 60px ✅ `rounded-br-[60px]`

**CSS**: `rounded-tl-[60px] rounded-br-[60px]`

## Complete Specifications

```jsx
// Container
<div className="bg-[#F9F7FE] rounded-tl-[60px] rounded-br-[60px] px-12 py-10 flex gap-6 max-w-[600px]">

  // Card 1 - Dark
  <Link className="bg-[#3D334A] rounded-tl-[32px] rounded-br-[32px] w-[246px] h-[222px] p-8 text-lg">
    ИЗУЧИТЬ ПОДРОБНЕЕ
  </Link>

  // Card 2 - Purple
  <Link className="bg-gradient-to-br from-[#D4BAFC] ... rounded-tl-[32px] rounded-br-[32px] w-[246px] h-[222px] p-8 text-lg">
    В КАТАЛОГ
  </Link>
</div>
```

## Visual Pattern

The rounding creates a **diagonal pattern**:
- Top-left and bottom-right corners are rounded
- Top-right and bottom-left corners are square
- This creates a dynamic, modern look

```
╭─────────╮
│         │
│  CARD   │
│         │
╰─────────╯

Top-Left: ✓ Rounded
Top-Right: ✗ Square
Bottom-Left: ✗ Square  
Bottom-Right: ✓ Rounded
```

## Spacing

- **Gap between cards**: 24px (`gap-6`)
- **Container padding**: 48px horizontal, 40px vertical (`px-12 py-10`)
- **Card padding**: 32px (`p-8`)
- **Container max-width**: 600px

## Text

- **Font size**: 18px (`text-lg`)
- **Font weight**: Bold
- **Text transform**: Uppercase
- **Font family**: Bowler (default)

## Colors

### Dark Card:
- Background: `#3D334A`
- Text: White

### Purple Card:
- Background: Gradient `#D4BAFC` → `#C4A6F1` → `#B794E8`
- Text: White

### Container:
- Background: `#F9F7FE` (light lavender)

## Summary of Changes

| Element | Incorrect | Correct |
|---------|-----------|---------|
| **Card Width** | 360px | 246px ✅ |
| **Card Height** | 320px | 222px ✅ |
| **Card Rounding** | All corners (40px) | Top-left & bottom-right only (32px) ✅ |
| **Container Rounding** | All corners (60px) | Top-left & bottom-right only (60px) ✅ |
| **Text Size** | 24px | 18px ✅ |
| **Gap** | 32px | 24px ✅ |

## Testing

Visit `http://localhost:3000` and verify:
- ✅ Both cards are 246×222px
- ✅ Only top-left and bottom-right corners are rounded
- ✅ Top-right and bottom-left corners are square
- ✅ Container has same diagonal rounding pattern
- ✅ Text is 18px (not too large)
- ✅ Spacing looks balanced

## Deployment

```bash
git add app/components/Header/MainHeader.jsx
git commit -m "Fix: correct card dimensions (246x222) and diagonal corner rounding"
git push origin main
```

---

**Status**: ✅ Correct specifications applied  
**Card Size**: 246px × 222px  
**Rounding Pattern**: Diagonal (top-left + bottom-right)  
**Date**: October 29, 2025

## 🎯 Now Matches Figma Exactly!

The design now has:
- ✅ Correct card dimensions (246×222px)
- ✅ Proper diagonal rounding pattern
- ✅ Both cards identical in size
- ✅ Balanced spacing and proportions

Perfect match! 🎨✨
