// NIMBARA — The City Above the Clouds
// Travel poster for a place that isn't there.
// main.ts writes the poster image to /output/entry.png and verifies
// the written bytes match the bundled asset byte for byte.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = "/output";
const outPath = join(outDir, "entry.png");

const bytes = readFileSync(source);
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, bytes);

const written = readFileSync(outPath);
if (!written.equals(bytes)) {
  throw new Error(
    `byte mismatch: wrote ${bytes.length} bytes, read back ${written.length} bytes`,
  );
}
console.log(`wrote ${outPath} (${bytes.length} bytes, verified byte-identical)`);
