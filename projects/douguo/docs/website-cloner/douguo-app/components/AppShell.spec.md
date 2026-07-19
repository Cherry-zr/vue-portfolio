# AppShell

## Target

- Routes: `/home`, `/categories`, `/topics`, `/mine`
- Intended files: `MainSwipeLayout.vue`, `AppTabbar.vue`
- Interaction model: click and horizontal swipe

## Structure

- Full-height mobile shell
- Scrollable active page
- Fixed five-slot bottom navigation with centered disabled publish button

## Observed styles

- White background, subtle gray divider, black active label, orange-red circular action.
- Maximum content width 430 px; mobile width fills viewport.

## States and behavior

- Tab click or horizontal swipe changes route while preserving mounted page state.
- Publish button shows a local disabled explanation and never submits data.

## Responsive behavior

- 390: reference layout.
- 768/1440: centered 430 px application surface.
