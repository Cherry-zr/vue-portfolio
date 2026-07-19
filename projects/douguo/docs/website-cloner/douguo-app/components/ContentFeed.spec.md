# ContentFeed

## Target

- Routes: home channels, search, topic detail, related notes and user content.
- Intended files: `FoodWaterfall.vue` and list views.
- Interaction model: click, refresh and scroll pagination.

## Structure

- Two-column masonry-like grid.
- Image, optional media badge, title, optional label, author and metric.

## Observed styles

- 10-11 px media radius, 10 px column gap, 15 px titles, gray compact metadata.

## States and behavior

- Image failure becomes a neutral placeholder.
- Card opens content detail; author control opens public user page when an ID exists.
- No local fake records are inserted when a response is empty.

## Responsive behavior

- 390: two columns.
- 768/1440: remains two columns inside the centered mobile shell.
