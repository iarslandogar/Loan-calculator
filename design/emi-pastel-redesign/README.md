# Loan EMI Calculator: "Soft ledger" pastel redesign bundle

Calm pastel surfaces with deep plum ink for every word and number. Mint holds the monthly payment, peach means "recalculate", butter is the rounding note, rose means invalid or remove, and lavender is the primary action and focus.

## Use it with Claude Code

1. Unzip this folder next to (or inside) the calculator repo, e.g. `design/emi-pastel-redesign/`.
2. In the repo, start Claude Code and say:

   > Read `design/emi-pastel-redesign/CLAUDE_CODE_HANDOFF.md` and apply the redesign. CSS only. Don't apply anything in PROPOSALS.md unless I approve it.

3. Review the screenshots it produces against `reference/artboards/`.

To approve a proposal later: *"Apply P1 and P4 from PROPOSALS.md."*

## Contents

- `CLAUDE_CODE_HANDOFF.md`: the implementation brief for Claude Code
- `styles/app.css`: the drop-in stylesheet
- `tokens/tokens.json`: tokens, type, spacing, radii, breakpoints, contrast rules
- `scripts/check-contrast.mjs`: `node scripts/check-contrast.mjs`
- `preview/index.html`: open in a browser and use the bottom-right switcher to see every state in both themes
- `reference/`: the design boards and screenshots
- `PROPOSALS.md`: optional changes that need approval
