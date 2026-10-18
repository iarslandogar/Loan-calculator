#!/usr/bin/env node
// Checks every contrast rule in tokens/tokens.json for both themes.
// Usage: node scripts/check-contrast.mjs   (exit code 1 on any failure)
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, "..", "tokens", "tokens.json"), "utf8"));

const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

let failed = 0;
for (const theme of ["light", "dark"]) {
  const t = { ...tokens.color[theme].tested, ...tokens.color[theme].added };
  console.log(`\n${theme.toUpperCase()}`);
  for (const rule of tokens.contrastRules) {
    for (const bg of rule.bg) {
      const r = ratio(t[rule.fg], t[bg]);
      const ok = r >= rule.min;
      if (!ok) failed++;
      console.log(`  ${ok ? "pass" : "FAIL"}  ${rule.fg.padEnd(15)} on ${bg.padEnd(10)} ${r.toFixed(2)}:1  (min ${rule.min})`);
    }
  }
}
console.log(failed ? `\n${failed} failing pair(s)` : "\nAll pairs pass.");
process.exit(failed ? 1 : 0);
