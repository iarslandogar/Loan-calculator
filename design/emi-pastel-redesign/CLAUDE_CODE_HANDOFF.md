# Handoff: apply the "Soft ledger" pastel redesign to the Loan EMI Calculator

You are implementing a visual redesign of an existing, fully tested React app.
**Only the look changes.** Behaviour, words, element order, roles and ARIA stay exactly as they are.

## What's in this bundle

| Path | What it is |
| --- | --- |
| `styles/app.css` | The new global stylesheet, plain CSS, written against the app's existing class names. This is the deliverable. |
| `tokens/tokens.json` | Every colour token (light + dark), type scale, spacing, radii, breakpoints, and the contrast rules. |
| `scripts/check-contrast.mjs` | `node scripts/check-contrast.mjs`, checks every token pair; exits 1 on failure. |
| `preview/index.html` | Static page using the real markup + `app.css`, with a preview-only switcher for theme and every state. Open in a browser to compare. |
| `reference/artboards/*.html` | The approved design boards (static HTML). Visual source of truth. |
| `reference/screenshots/*.png` | Renders of `preview/index.html` at 1280, 360 and 180 px. |
| `PROPOSALS.md` | Optional changes beyond pure CSS. **Do not apply these without the product owner's OK.** |

## Steps

1. **Find the stylesheet.** Locate the app's single global CSS file (e.g. `src/index.css` / `src/App.css`) and how it's imported. Read it fully first.
2. **Check the markup matches.** Compare the rendered markup (components that render `.page`, `.app-header`, `.layout`, `.form-card`, `.results-card`, `.history-card`, `.confirm-dialog`) with the selectors in `styles/app.css`. Note any class names that differ. Adapt the **CSS selectors**, never the markup.
3. **Replace the stylesheet** with `styles/app.css` (keep the same file path and import). If the old file had rules for things not covered here (e.g. the fatal-error screen, a visually-hidden utility like `.sr-only`), carry those rules over and restyle them using the new tokens.
4. **Theme switching.** The app sets `data-theme="light" | "dark"` on `<html>`. Tokens live on `:root[data-theme=…]`. Keep the existing JS. The `prefers-color-scheme` block only covers the moment before JS sets the attribute.
5. **Fatal error screen.** Not in the brief's markup. Find its element and style it centred, `--text` on `--bg`, 18px/650, max-width 280px. See `reference/artboards/Dialogs.html`.
6. **Run the checks** (below). Fix by changing CSS only.
7. **Compare visually.** Start the dev server and screenshot at 1280, 768, 360 and 180 px, light + dark, against `reference/artboards/`.

## Hard rules (each is tested or protects money/accessibility)

- Don't change any visible text, element order, roles, ARIA, or `tabindex`. No CSS reordering (`order`, reversed flex, absolute repositioning of content).
- Keep the tested token names: `--bg --surface --text --text-muted --primary --on-primary --error --border --input-border --focus`.
- Contrast: text ≥ 4.5:1 on `--bg` and `--surface` (body, muted, error, on-primary on primary); input/select borders ≥ 3:1.
- Focus: CSS `outline` ≥ 2px on every focusable element, including `.schedule-scroll` and the Saved calculations `h2[tabindex=-1]`. The stylesheet uses `:focus` (not only `:focus-visible`) on purpose.
- Every input, select and button ≥ 44 × 44 px, fully inside a 360px viewport.
- No horizontal page scroll from 360px (and at 180px). Only `.schedule-scroll` scrolls sideways.
- Stale results are **removed**, never dimmed. Field errors stay directly under their field.
- System fonts only, no network requests, plain CSS, native `<select>`/`<dialog>`/`<input>`.
- Long figures wrap between digit groups (the app already inserts break opportunities after commas); no ellipsis, no clipping.

## Verify

```bash
node <bundle>/scripts/check-contrast.mjs        # token pairs
npm test                                         # or the project's unit test command
npx playwright test                              # e2e in chromium, firefox, webkit
```

Then a quick no-overflow check in each browser at widths 1280 / 768 / 360 / 180:
`document.documentElement.scrollWidth === innerWidth`.

If a test fails, report which rule it checks and fix it in CSS. If the only fix would need a markup change, stop and list it as a proposal instead.

## Known gap without proposals

The idle and stale results messages share `p.status`. Without proposal **P1** (the `status-stale` modifier class) both render in the idle style. Everything else works with CSS alone.
