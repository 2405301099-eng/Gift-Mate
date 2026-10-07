---
name: Regal Festive AI
colors:
  surface: '#fef7ff'
  surface-dim: '#e4d2ff'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f0ff'
  surface-container: '#f4eaff'
  surface-container-high: '#f0e3ff'
  surface-container-highest: '#ebdcff'
  on-surface: '#260059'
  on-surface-variant: '#4a4455'
  inverse-surface: '#3f0689'
  inverse-on-surface: '#f7edff'
  outline: '#7b7486'
  outline-variant: '#ccc3d7'
  surface-tint: '#7331df'
  primary: '#5300b7'
  on-primary: '#ffffff'
  primary-container: '#6d28d9'
  on-primary-container: '#dac5ff'
  inverse-primary: '#d3bbff'
  secondary: '#a43073'
  on-secondary: '#ffffff'
  secondary-container: '#fc79bd'
  on-secondary-container: '#76014e'
  tertiary: '#653400'
  on-tertiary: '#ffffff'
  tertiary-container: '#884800'
  on-tertiary-container: '#ffc394'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ebddff'
  primary-fixed-dim: '#d3bbff'
  on-primary-fixed: '#250059'
  on-primary-fixed-variant: '#5b00c5'
  secondary-fixed: '#ffd8e7'
  secondary-fixed-dim: '#ffafd3'
  on-secondary-fixed: '#3d0026'
  on-secondary-fixed-variant: '#85145a'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#fef7ff'
  on-background: '#260059'
  surface-variant: '#ebdcff'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 52px
    fontWeight: '600'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  price-headline:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a premium, emotionally resonant, and culturally attuned AI shopping experience for modern Indian gift-givers. It merges the warmth and joy of Indian gifting traditions (festivals, weddings, personal milestones) with the effortless intelligence of modern conversational AI.

The design movement combines **Modern Luxe Editorial** with **Frosted Glassmorphism**:
- Soft, luminous background vignettes of muted rose quartz and lavender mist that feel celebratory rather than clinical.
- Frosted glass containers (`backdrop-blur-md bg-white/80`) bounded by micro-fine iridescent pastel borders that evoke premium gift packaging.
- Subtle warm champagne gold highlights (`#D97706` / `#F59E0B`) that echo festive Indian traditions without sliding into ostentatious kitsch.
- Refined, high-contrast typography marrying classical literary poise with tech-forward clarity.

## Colors

The palette is anchored in royal violet, warm rose, and festive champagne gold, set against luminous cream and pastel undertones.

- **Primary (`#6D28D9`)**: Deep Regal Violet. Represents AI authority, luxury, and premium gifting prestige. Used for primary CTA buttons, active state indicators, and key hero titles.
- **Secondary (`#F472B6`)**: Soft Rose / Rhodolite. Injects tenderness, warmth, and emotion into interactive elements, pill tags, and AI highlight glows.
- **Tertiary (`#D97706` / `#F59E0B`)**: Champagne Gold. Evokes Indian celebrations (Diwali, weddings, Rakhi), applied selectively to VIP badges, celebratory sparkle accents, and curated recommendation tags.
- **Surface & Canvas**: Luminous Cream Canvas (`#FAFAFA`), pristine card layers (`#FFFFFF`), and translucent overlays (`rgba(255, 255, 255, 0.82)`).
- **Text & Contrast**: Deep Imperial Plum (`#1E1035`) provides softer, more luxurious contrast than harsh black, maintaining high legibility while harmonizing with violet undertones.

## Typography

Typography establishes an editorial balance:
- **Headlines & Editorial Callouts**: `Playfair Display` provides timeless sophistication, evoking heirloom luxury and heartfelt gifting sentiment.
- **Interface & Body**: `Plus Jakarta Sans` provides geometric legibility, wide apertures, and friendly clarity across all screen sizes.
- **Indian Rupee (₹) Symbol Rule**: Always set the `₹` symbol in `Plus Jakarta Sans` semi-bold or bold, matching the numeral baseline precisely, avoiding serif-rendered glyph variants that appear misaligned.

## Layout & Spacing

A structured 12-column responsive fluid grid governs the layout:
- **Desktop (≥1200px)**: 12 columns, `margin: 2.5rem`, `gutter: 1.5rem`, max-width container 1280px.
- **Tablet (768px – 1199px)**: 8 columns, `margin: 1.5rem`, `gutter: 1rem`.
- **Mobile (<768px)**: 4 columns, `margin: 1rem`, `gutter: 0.75rem`.

The 4px vertical rhythm enforces generous breathing space around product presentations and wizard decision cards, ensuring the cognitive load remains minimal during thoughtful gift selection.

## Elevation & Depth

Visual hierarchy uses frosted glass and diffused chromatic shadows rather than neutral greys:

- **Level 0 (Flat Canvas)**: Soft ambient gradient mesh combining `#FDF2F8` (pink-50) and `#F5F3FF` (violet-50).
- **Level 1 (Card & Section Containers)**: `bg-white/80`, `backdrop-blur-md`, bordered with `border border-pink-100/70`, elevated with `box-shadow: 0 4px 20px -2px rgba(109, 40, 217, 0.04)`.
- **Level 2 (Hover & Active Product Tiles)**: `bg-white`, `border border-violet-200/80`, `box-shadow: 0 12px 30px -4px rgba(109, 40, 217, 0.10), 0 4px 10px -2px rgba(244, 114, 182, 0.08)`.
- **Level 3 (Modals & Floating AI Bot)**: `bg-white/95`, `backdrop-blur-xl`, `border border-pink-200`, `box-shadow: 0 20px 45px -8px rgba(76, 29, 149, 0.18)`.

## Shapes

The shape system adopts a pill-forward, ultra-rounded aesthetic (`roundedness: 3`) to evoke tenderness, touchability, and gift-box softness:
- Primary buttons, chips, and budget selectors utilize full pill borders (`rounded-full` / `9999px`).
- Discovery cards and wizard module containers employ `rounded-2xl` to `rounded-3xl` (1.5rem to 2rem).
- Micro-badges and image previews use `rounded-xl` (1rem).

## Components

### Buttons
- **Primary Action (Gift Matcher CTA)**: Gradient fill `from-[#6D28D9] to-[#7C3AED]` with white text, fully pill-shaped (`rounded-full`), padded `px-6 py-3.5`, accented by a soft glow on hover.
- **Secondary / Romantic Action**: Soft rose surface (`bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200`).
- **Champagne Celebration Action**: Rich gold gradient (`from-[#F59E0B] to-[#D97706]` with crisp white text) for instant festive checkout and premium gift-wrap options.

### Chips & Filter Pills
- Interactive recipient tags ("Mother-in-law", "Wedding Couple", "Diwali Host") feature pill silhouettes with subtle pastel backgrounds (`bg-violet-50 text-violet-900 border border-violet-100`). Active states switch to solid violet with white text and an amber glow.

### Interactive Multi-Step Wizard Stepper
- Step track rendered in muted lavender line with progressive violet fill.
- Step nodes display circular frosted glass icons with celebratory checkmarks or pulsating gold AI rings (`ring-2 ring-amber-400 ring-offset-2`).
- Step cards slide with gentle spring animations over frosted `bg-white/85` backplates.

### Product Discovery Cards
- Aspect ratio 4:5 for product imagery with curved inner margins (`rounded-2xl`).
- Floating top badges: Warm gold for "Festive Bestseller" (`bg-amber-100 text-amber-900 border border-amber-300`), soft rose for "Handcrafted".
- Indian Rupee display highlighted using bold `Plus Jakarta Sans` typography accompanied by slashed original MSRP in muted plum.

### Comparison Matrix
- Frosted table grid comparing AI recommendations side-by-side on delivery speed to Indian PIN codes, gift-box presentation score, and personalization depth.

### Floating AI Gift Assistant (FAB)
- Fixed bottom-right trigger: Dual-gradient sphere (`from-[#6D28D9] via-[#9333EA] to-[#F472B6]`) with subtle spinning champagne aura ring and badge reading "Ask GiftMate AI".