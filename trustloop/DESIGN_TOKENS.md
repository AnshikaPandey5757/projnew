Design tokens & quick guidelines

- Colors (CSS variables in `src/styles/globals.css`):
  - `--bg` — app background
  - `--accent` — primary accent (teal)
  - `--accent-amber` — secondary accent (amber)
  - `--glass` / `--glass-strong` — panel backgrounds
  - `--text` — primary text color

- Utility classes:
  - `glass` — subtle frosted panel: background, border and backdrop blur.
  - `glass-strong` — stronger glass used for important panels / modals.
  - `btn`, `btn-accent`, `btn-ghost` — standardized buttons. Prefer these over ad-hoc utilities.
  - `focus-ring` — accessible focus-visible ring.
  - `float`, `fade-in-up` — common animations.

- Component notes:
  - Use `glass` for cards and panels to keep a consistent visual language.
  - Keep CTAs `btn btn-accent` for primary actions and `btn-ghost` for secondary actions.
  - Use `ThemeToggle` (`src/components/common/ThemeToggle.jsx`) to switch themes (dark/light) using `data-theme` on `:root`.

- How to add a new token:
  1. Add a `--my-token` variable under `:root` in `src/styles/globals.css`.
  2. Add light-mode overrides under `:root[data-theme="light"]`.
  3. Use the token in styles or inline style props.

This file is a starting guideline to keep the UI consistent during the hackathon.
