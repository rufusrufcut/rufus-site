<!-- The site's design system: tokens, components and the rules for using them. Keep it short and current. -->
# Design system

The code is the source of truth. This file says what exists and the rules for using it.

## Tokens (src/styles/base.css)

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | #f2efe8 | Page background |
| `--ink` | #111111 | Text, rules, default icon colour (16.4:1 on paper) |
| `--muted` | #555555 | Secondary text (6.5:1 on paper) |
| `--signal` | #c8201a | Highlight colour: links on hover, focus outlines, section labels, place icons (5:1 on paper) |
| `--rule` | ink at 15% | Hairlines between entries |
| `--margin`, `--gutter` | fluid | Page margin and grid gutter |
| `--font` | Helvetica Neue stack | All type |

Change a value here and everything that uses the token follows. Check contrast after any colour change: text needs 4.5:1 (3:1 for large text), icons and other graphics need 3:1 (WCAG 2.2 AA).

## Icon system

- Every concept (a place, a club) owns one unit shape, assigned in `src/data/icon-registry.json`. Melbourne is always shape 7, wherever it appears.
- To reassign a shape, change the concept's `shape` number in the registry. Never pick a shape on a page.
- Shapes sit in a circle container (r 73 in a 150 box), the same geometry as the Jiu-Jitsu visualisation.

## Components (src/components/)

| Component | What it is | Rule |
| --- | --- | --- |
| `LastUpdated` | "Last updated" line with a date | On every page, directly under the page title. Update the date when the page changes. |
| `ConceptIcon` | One concept's shape in its circle | Low-level: draws in ink unless the page sets `--concept-icon-colour`. Decorative (hidden from screen readers), so its name must sit beside it. Use `PlaceLabel` for places. |
| `PlaceLabel` | A place's icon, in the highlight colour (or the data's colour, see below), followed by its name | **Wherever a place is shown as a label, use `PlaceLabel`.** |

### Place labels

A place label is a place shown on its own as a piece of information: a CV entry's location, the "Place" in a visualisation panel, a location in a list or card. These get the icon.

Not place labels, so no icon:
- A place mentioned inside running text ("Led the Melbourne studio").
- Meta descriptions and other text that isn't shown on the page.
- Options inside a native `<select>` (for example the Location filter on the Jiu-Jitsu page). Browsers can't draw graphics inside options, and replacing the native control with a custom one would cost keyboard and screen reader support.

Usage:

```astro
<PlaceLabel id="melbourne" />                                  <!-- shows the registry name -->
<PlaceLabel id="melbourne">Melbourne, Australia</PlaceLabel>   <!-- your own wording -->
```

Pages that draw in the browser (like the Jiu-Jitsu visualisation) render a `<template>` per place with `PlaceLabel` at build time and copy it in, so the markup is identical everywhere.

In a data visualisation where colour carries data, the place label's icon takes that colour instead of the highlight, by setting `--place-label-colour`. On the Jiu-Jitsu page it is the belt colour for that month, matching the month's icon in the grid. Any colour used this way must reach 3:1 on the paper.

A place id that isn't in the registry stops the build, so a typo can't ship a label without its icon.
