import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
for (const name of [".lighthouseci", "lighthouse-report"]) {
  fs.rmSync(path.join(root, name), { recursive: true, force: true });
}
