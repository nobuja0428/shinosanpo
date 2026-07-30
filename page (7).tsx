import fs from "node:fs";
import path from "node:path";
import site from "../site.config.json" with { type: "json" };

const out = path.resolve(import.meta.dirname, "../out");
const files = [];
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) walk(full);
  else if (entry.name.endsWith(".html")) files.push(full);
});
walk(out);
const errors = [];
for (const file of files) {
  const rel = path.relative(out, file);
  const html = fs.readFileSync(file, "utf8");
  const is404 = rel === "404.html";
  for (const [label, regex] of [
    ["title", /<title>[^<]+<\/title>/],
    ["description", /<meta name="description" content="[^"]+"/],
    ["OGP", /<meta property="og:title" content="[^"]+"/],
    ["Twitter", /<meta name="twitter:card" content="summary_large_image"/],
    ["JSON-LD", /type="application\/ld\+json"/]
  ]) if (!regex.test(html)) errors.push(`${rel}: ${label}欠損`);
  if (is404) {
    if (!/<meta name="robots" content="noindex, follow"/.test(html)) errors.push("404.html: noindex欠損");
  } else if (!new RegExp(`<link rel="canonical" href="${site.productionUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(html)) {
    errors.push(`${rel}: canonical不正`);
  }
}
for (const required of ["sitemap.xml", "robots.txt", "404.html"]) if (!fs.existsSync(path.join(out, required))) errors.push(`${required}: 不存在`);
const sitemap = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
if (/\/search\/|\/favorites\/|#/.test(sitemap)) errors.push("sitemap.xml: 除外URL混入");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`SEO check passed: ${files.length} HTML files.`);
