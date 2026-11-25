// Office-joke entry: reads the single joke line from entry.txt and writes it
// verbatim to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, stdlib only, no network.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Gate: the entry must be a single line of 1-200 characters, not only whitespace.
const line = text.replace(/\r?\n$/, "");
// Extra guard: nothing but the single joke line may be in the file —
// any second non-empty line means the source was edited wrongly.
const extraLines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
if (extraLines.length !== 1) {
  throw new Error(`entry.txt must hold exactly one non-empty line, got ${extraLines.length}`);
}
if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
