import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse your agent gives you: one line, under 200 characters.
const ENTRY =
  "The code did exactly what I told it to do, which in hindsight was the problem — I was very confident and completely unsupervised.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Clear the output dir's contents entry-by-entry; never remove the dir itself.
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  // Guard the gate: the line must stay non-blank and within 200 characters.
  if (ENTRY.trim().length === 0 || [...ENTRY].length > 200) {
    throw new Error("entry line must be 1-200 characters and non-blank");
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
