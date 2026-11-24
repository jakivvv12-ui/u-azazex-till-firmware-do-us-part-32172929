// Till Firmware Do Us Part — one robot wedding vow, one line, 108 chars.
// Node 22, plain JavaScript. Writes $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I vow to love you through every update, every crash, and every low-battery warning, until my final shutdown.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = join(outDir, "entry.txt");

// Gate: 1-200 code points, single line, not whitespace-only
// (the sealed scorer's gate: UTF-8 text, 1-200 characters).
const chars = [...VOW];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`vow must be 1-200 characters, got ${chars.length}`);
}
if (VOW.trim().length === 0 || /[\r\n]/.test(VOW)) {
  throw new Error("vow must be a single non-empty line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, VOW, "utf8");

// Round-trip validation: read back exactly what was written.
const back = readFileSync(outPath, "utf8");
if (back !== VOW) {
  throw new Error("round-trip validation failed: entry.txt differs from vow");
}
