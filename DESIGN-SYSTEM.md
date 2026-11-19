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
- Every concept owns a shape number no other concept uses (places 1 to 7, 10 and 12; clubs 8, 9, 11 and 13), so a shape always means one thing and labels draw it at full size. Inside the layered Jiu-Jitsu icons a club is drawn at 0.76 of the circle over the place, but that is the visualisation's composition, not the club's identity.
- A belt has no shape: its label shows a circle filled with the belt's colour, the same size as the shape icons.

## Components (src/components/)

| Component | What it is | Rule |
| --- | --- | --- |
| `LastUpdated` | "Last updated" line with a date | On every page, directly under the page title. Update the date when the page changes. |
| `ConceptIcon` | One concept's shape in its circle | Low-level: draws in ink unless the page sets `--concept-icon-colour`. Decorative (hidden from screen readers), so its name must sit beside it. Use `PlaceLabel` for places. |
| `ConceptLabel` | Any registry concept's icon (a place, a club, or a belt's colour circle), in the highlight colour (or the data's colour, see below), followed by its name | **Wherever a concept is shown as a label, use `ConceptLabel`.** |
| `PlaceLabel` | Shortcut for `ConceptLabel concept="place"` | Use for places. |

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

Club and belt labels follow the same rule: `<ConceptLabel concept="club" id="mnbjj" />`, `<ConceptLabel concept="belt" id="purple" />`.

Pages that draw in the browser (like the Jiu-Jitsu visualisation) render a `<template>` per place, club and belt with `ConceptLabel` at build time and copy it in, so the markup is identical everywhere.

In a data visualisation where colour carries data, a label's icon takes that colour instead of the highlight, by setting `--concept-label-colour` on a surrounding element. On the Jiu-Jitsu page the place and club labels take the belt colour for that month, matching the month's icon in the grid. Any colour used this way must reach 3:1 on the paper.

An id that isn't in the registry stops the build, so a typo can't ship a label without its icon.
