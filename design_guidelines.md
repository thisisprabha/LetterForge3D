# 3D Letter Generator - Design Guidelines

## Design Approach
**System-Based:** Professional 3D Editor Interface inspired by Blender and Adobe Creative Suite workflows, optimized for technical precision with dark UI aesthetic to complement glass renders.

## Layout Architecture

### Primary Layout (Single Character Mode)
- **Canvas-First Design:** 70% viewport dedicated to 3D canvas (left), 30% control panel (right)
- **Viewport Split:** Use `grid-cols-[1fr_400px]` on desktop, stack to single column on mobile
- **Control Panel:** Fixed-width sidebar with scrollable sections, dark background for contrast against bright glass renders

### Preview Grid Mode
- **Full-Width Canvas:** Expand to 100% width, controls collapse to floating panel or bottom drawer
- **Character Grid:** 6x6 grid layout (`grid-cols-6`) showing all 36 characters simultaneously
- **Card-Based:** Each character in individual card with subtle elevation, 1:1 aspect ratio

## Typography System
- **Primary Font:** Inter or Roboto (technical, modern sans-serif)
- **Headings:** Font weight 600-700, tight letter-spacing (-0.02em)
- **Body:** Font weight 400-500, comfortable line-height (1.5)
- **Labels:** Uppercase, tracking-wide (0.05em), smaller size for technical precision

## Spacing System
**Core Units:** Use Tailwind spacing of 2, 3, 4, 6, 8 units
- Section padding: `p-6` for panels, `p-8` for major sections
- Component spacing: `gap-4` for groups, `gap-6` between sections
- Canvas padding: `p-4` for breathing room around 3D viewport

## Component Library

### Canvas & Viewport
- **3D Canvas:** Full-height with subtle border, rounded corners (`rounded-lg`)
- **Overlay UI:** Floating controls in top-right (camera reset, fullscreen) with backdrop blur
- **Loading State:** Centered spinner with "Rendering..." text

### Control Panels
**Material Controls:**
- Grouped sections with clear headers (MATERIAL, LIGHTING, EXPORT)
- Sliders with numeric input fields for precision (IOR, Roughness, Thickness)
- Color picker: Large touch target with hex input
- Toggle switches for glass effects (Dispersion ON/OFF)

**Rotation Controls:**
- Four directional buttons in cross pattern (↑↓←→)
- Reset button centered below
- Visual feedback: active state on press

**Export Section:**
- Format selector: Radio buttons or segmented control (PNG/USDZ)
- Resolution display: "1024×1024" badge
- Two prominent CTAs: "Export Current" (secondary) and "Batch Export All" (primary, larger)

### Navigation
- **Top Bar:** App title left, mode switcher center (Single | Preview Grid), settings icon right
- **Height:** `h-16` consistent across breakpoints
- **Alignment:** Items center-aligned vertically with `px-6` horizontal padding

### Character Preview Grid
- **Card Design:** Subtle border, hover elevation, `aspect-square` ratio
- **Letter Display:** Centered, large (text-4xl equivalent 3D render)
- **Interaction:** Click to select, shift-click for multi-select, checkbox overlay on selection

## Responsive Behavior

### Desktop (lg:)
- Side-by-side layout with fixed control panel width
- Grid preview: 6 columns

### Tablet (md:)
- Canvas above, collapsible control drawer below
- Grid preview: 4 columns

### Mobile (base:)
- Full-screen canvas with floating bottom sheet for controls
- Grid preview: 3 columns

## Interaction Patterns
- **Drag Canvas:** Rotate letter with mouse/touch drag (no UI chrome needed)
- **Slider Interaction:** Real-time preview updates as user adjusts material values
- **Batch Export:** Progress modal with cancel option, shows "Generating 15/36..." counter

## Visual Hierarchy
1. **Primary Focus:** 3D canvas dominates viewport
2. **Secondary:** Export buttons (high contrast, prominent placement)
3. **Tertiary:** Material adjustment controls (organized, scannable)
4. **Supporting:** Mode switcher, settings (minimal distraction)

## Professional Polish
- **Micro-interactions:** Smooth slider animations, button press feedback
- **Status Indicators:** "Rendering..." badge when material updates
- **Error States:** Inline validation for numeric inputs (IOR range 1.4-1.6)
- **Success Feedback:** Toast notification on successful export with file count

## Images
No hero images needed. This is a tool-focused application where the 3D renders themselves are the visual content. The canvas area showcases user-generated glass letters as the primary visual element.