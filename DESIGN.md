---
name: Festival Gymkhana de Saint-David-de-Falardeau
description: L'Arène. The sport is the spectacle; sand by day, night for the evening and the arena.
colors:
  sable: "#e6cfa3"
  sable-clair: "#efdfc0"
  poussiere: "#b98d58"
  terre: "#6b4429"
  nuit: "#141619"
  nuit-2: "#1d2024"
  rouge: "#c4381f"
  rouge-fonce: "#a52c16"
  sauge: "#9ea08a"
  creme: "#fbf3e4"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "fitted to the measure (width of the word in em at wdth 125)"
    fontWeight: 900
    lineHeight: 0.74
    letterSpacing: "0"
  heading:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6.4vw, 6.25rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "0"
  statement:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 4.15vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  time:
    fontFamily: "Archivo, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "0"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.05vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  none: "0"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3.2vw, 3rem)"
  section: "clamp(6rem, 12vw, 11rem)"
  max: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.rouge}"
    textColor: "{colors.creme}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.creme}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.none}"
    padding: "0 1.1rem"
    height: "2.75rem"
  badge:
    backgroundColor: "{colors.sable}"
    textColor: "{colors.nuit}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.7rem"
  camping-card:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.sable}"
    rounded: "{rounded.none}"
    padding: "clamp(1.75rem, 3vw, 2.75rem)"
---

# Design System: Festival Gymkhana de Saint-David-de-Falardeau

## Overview

**Creative North Star: "L'Arène"**

The festival is built around a real equestrian sport, so the sport carries the identity: a barrel turn in the dust, the cloverleaf pattern around three barrels, the chrono, and a name set as large as a grandstand banner. Everything else stays quiet so that one gesture reads. The page moves through a festival day: sand while the competition runs, night when the Grand Prix and the shows begin under the tent, sand again for the families the next morning.

The world refuses the category default of western festivals: no boots, skulls or guitars as wallpaper, no saloon lettering, no orange-and-brown everything, no popups. The premium comes from restraint and finish: one variable family used at its extremes, square corners, 1px rules, photographs graded warm and slightly desaturated, and motion that only happens where it explains something.

**Key Characteristics:**

- One giant word per moment, fitted exactly to the measure.
- The width axis of a single family carries the brand: wide for momentum, condensed for times.
- Sand and night as the only two grounds; barrel red for action only.
- Real festival photographs, cut and layered for depth, never stock.
- The cloverleaf course as the page's thread, from « Départ » to « Arrivée ».

## Colors

Two grounds and one accent. Sand is the day, night is the evening and the arena; barrel red marks what the visitor can act on and the one highlight of the programme.

### Primary

- **Rouge baril** (#c4381f): primary buttons, the drawn cloverleaf, the highlighted time and flag in the programme, emphasis words in the statement. Pressed or hovered buttons fill with night.

### Neutral

- **Sable** (#e6cfa3): the main ground and the display colour on night and photographs.
- **Sable clair** (#efdfc0): quieter ground for the family and team sections.
- **Nuit** (#141619): evening ground, arena section, camping card, footer, body text on sand.
- **Crème** (#fbf3e4): body text on night and on photographs.
- **Poussière** (#b98d58) and **Terre** (#6b4429): small labels and separators; Terre also fills one activity tile.
- **Sauge** (#9ea08a): one activity tile, a cool counterpoint to the sand.

### Named Rules

**The One Accent Rule.** Rouge baril is used for action, for the course line and for the single evening highlight. Never for decoration, never as a background field larger than a button or a flag.

**The Day and Night Rule.** A section is sand or night, never both. The only transition is narrative: the programme turns to night when the selected day reaches its evening events.

## Typography

**Display, headings and body:** Archivo (variable: width 62 to 125, weight 100 to 900), self-hosted through next/font.

**Character:** a grotesque that can go from banner-wide to stencil-narrow. Wide black (wdth 125, 900) is the voice of the festival; condensed (wdth 75) sets times and the phone versions of long titles; wdth 100 to 112 for running headings and body.

### Hierarchy

- **Display** (900, wdth 125, line-height 0.74): GYMKHANA in the hero and footer, fitted to the measure from its measured width (8.068 em at wdth 125).
- **Section titles** (900, wdth 125, uppercase): fitted to the measure where the title is the section's only headline (Programmation, En famille, Planifier ma visite); otherwise clamped.
- **Statement** (700, wdth 100, 1.875 to 4.25 rem): the "en bref" paragraph, filled word by word on scroll.
- **Time** (900, wdth 75, tabular): programme hours.
- **Body** (400, 16 to 17 px, line-height 1.6, max 65 ch).
- **Label** (700, 13 px, uppercase, tracking 0.08 to 0.14 em): metadata placed after or beside a title, never above it.

### Named Rules

**The Fitted Word Rule.** A display word fills the measure exactly; its size comes from its measured width, never from a guess. Phones switch to wdth 75 rather than shrinking.

**The No Kicker Rule.** No small label above a heading. Dates, places and categories sit after the title or in a side column.

## Layout

12-column logic on a 1440 px measure with a fluid gutter (16 to 48 px). Sections are separated by large vertical rhythm (6 to 11 rem). Compositions are asymmetric: sticky side columns (programme days, team photo), 7/4/1 rows (pillars), a 12-column mosaic for activities. Every multi-column layout collapses to one column under 768 or 1024 px, declared per section. The hero is pinned and the first section slides over it like a curtain.

## Elevation & Depth

Depth comes from layering, not shadows: the hero is four planes (background with the rider removed, the name, the rider cut-out, dust) that drift at their own depth with the pointer and on their own when idle. Shadows exist only where a surface physically lifts: the curtain section's top edge, the hover photograph in the pillars, the floating mobile programme button.

### Named Rules

**The Real Depth Rule.** Depth is made from the photograph itself (cut-outs, planes, parallax), never from bevels, glows or imitation materials.

## Shapes

Square everywhere: buttons, cards, tiles, photographs, the camping card. The only round elements are the arrow buttons of the pillar rows and the barrels of the course diagrams.

## Components

### Buttons

- **Primary:** rouge baril, crème text, uppercase wdth 110, 52 px tall. On hover a night fill wipes in from the left (the direction of the run) in 240 ms; press scales to 0.97.
- **Ghost:** 1 px inset outline in currentColor, same wipe on hover.

### Navigation

Fixed bar, transparent over the hero, sand with blur once the hero is covered. Hides on the way down, returns on the way up. Below 1152 px the links fold into a full-screen night menu with condensed display links; the festival name stays beside the logo down to 380 px. Phones also get a floating "Voir la programmation" button after the hero, hidden over the programme and the footer.

### Programme (signature)

Vertical day tabs (full keyboard tablist) beside show-bill rows: condensed time, title, detail, place. The Grand Prix row is the only red one and carries a "Moment fort" flag after its title. An "En soirée" divider marks the evening and triggers the night.

### Course diagrams (signature)

The cloverleaf and each event drawn as a single red line with barrels or poles; the big arena draws with the scroll, event cards redraw on hover, the small "Départ" and "Arrivée" marks draw once.

## Do's and Don'ts

### Do:

- **Do** fit display words to the measure from their measured width.
- **Do** use real festival photographs, graded warm and slightly desaturated.
- **Do** keep red for action, the course line and the single programme highlight.
- **Do** keep content visible without JavaScript and under reduced motion.
- **Do** label any provisional content (programme preview, 2027 dates).

### Don't:

- **Don't** use western clip-art patterns (boots, skulls, guitars, horseshoes) as decoration.
- **Don't** put a small label above a heading.
- **Don't** add a second accent colour or a gradient on text.
- **Don't** round corners on cards, tiles or buttons.
- **Don't** invent partners, artists, figures or testimonials.
