import fs from "node:fs";
import path from "node:path";
import site from "../site.config.json" with { type: "json" };

const out = path.resolve(import.meta.dirname, "../out");
const htmlFiles = [];
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) walk(full);
  else if (entry.name.endsWith(".html")) htmlFiles.push(full);
});
walk(out);

const errors = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const matches = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const target of matches) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(target)) continue;
    const clean = target.split(/[?#]/)[0];
    if (!clean.startsWith(site.productionBasePath)) { errors.push(`${path.relative(out, file)}: basePath外 ${target}`); continue; }
    const relative = clean.slice(site.productionBasePath.length) || "/";
    const candidate = relative.endsWith("/")
      ? path.join(out, relative, "index.html")
      : path.join(out, relative.replace(/^\//, ""));
    if (!fs.existsSync(candidate)) errors.push(`${path.relative(out, file)}: 切れた内部リンク ${target}`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Internal link check passed: ${htmlFiles.length} HTML files.`);
