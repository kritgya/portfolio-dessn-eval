# Folio — Dessn Evaluation Repo

A fake portfolio manager built to evaluate [Dessn](https://www.dessn.ai/) — an AI design tool that works directly on production codebases.

This is **not** a real app. It exists to give Dessn realistic surface area: a routed React/TS/Tailwind/shadcn codebase with multiple views, dense tables, and a mixed-density form.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- shadcn-style primitives (Button, Card, Input, Label, Badge) — vendored in `src/components/ui/`
- React Router v6
- Recharts for the dashboard line chart

## Why these choices

Mirrors what Dessn would likely see at the typical production fintech codebase. If Dessn handles this well, it'll handle the real thing well. If it doesn't, you've learned something specific.

## Pages

| Path | What it tests |
|------|---------------|
| `/` | Dashboard — stat cards + chart. Composition and visual hierarchy. |
| `/positions` | Dense data table with filters & sort. **The main test surface.** |
| `/positions/:id` | Position detail with intentionally mixed-density form. |
| `/watchlist` | Lighter table + inline add flow. Form patterns. |

## Local setup

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Create a new repo on GitHub. Name it something like `portfolio-dessn-eval`.
2. Update `vite.config.ts` — change `base: '/portfolio-dessn-eval/'` to match your actual repo name.
3. Update `public/404.html` if your repo name has a different number of path segments (it shouldn't; `segmentCount = 1` is right for `username.github.io/repo-name/`).
4. Push to `main`.
5. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
6. The included workflow at `.github/workflows/deploy.yml` will build and deploy on every push to main.
7. Site will live at `https://kritgya.github.io/portfolio-dessn-eval/`.

## The eval (run this before connecting Dessn)

Don't judge Dessn on vibes. Write your prompts before you connect the repo. Suggested test set:

1. **Trivial styling test** — "Make the primary button green." Baseline; everything should pass.
2. **Composition test** — "On the Dashboard, reorganize the four stat cards into a 2x2 grid with the chart taking the right half."
3. **Density redesign** — "On the Positions table, compress the metadata fields and give the P/L column more visual weight."
4. **Pattern recognition** — "Add a 'Sector allocation' donut chart to the Dashboard using the existing Card primitive."
5. **The hard one** — "Redesign the Edit Position form so that consequential fields (shares, avg cost) get more vertical space than the metadata section, and add a confirmation step before save."

Score each on: did it touch the right files, did it respect the existing component primitives, did it produce a diff a human reviewer would accept.

## Notes for the eval

- **Do not paste real FalconX/Talon code into this repo.** This is a deliberately neutral domain so screenshots are shareable.
- The Position Detail form has deliberately uneven density already, mirroring the "compress safe config, expand consequential fields" principle. This gives Dessn a baseline opinion to push against — useful signal either way.
