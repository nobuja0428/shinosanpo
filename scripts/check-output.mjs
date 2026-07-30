import fs from "node:fs";
import path from "node:path";
import site from "../site.config.json" with { type: "json" };

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "out");
const errors = [];
const required = [
  "index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "areas/index.html",
  "areas/koenji/index.html",
  "courses/index.html",
  "courses/koenji-first/index.html",
  "spots/index.html",
  "spots/sensoji/index.html",
  "stories/index.html",
  "stories/asakusa-first-hour/index.html",
  "events/index.html",
  "map/index.html",
  "search/index.html",
  "favorites/index.html",
  "contact/index.html",
  "editorial-policy/index.html",
  "privacy/index.html",
  "operation/index.html"
];
for (const file of required) {
  if (!fs.existsSync(path.join(out, file))) errors.push(`出力不存在: ${file}`);
}

const files = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
};
walk(out);

const nextFiles = files.filter((file) => file.startsWith(path.join(out, "_next")));
if (!nextFiles.some((file) => file.endsWith(".css"))) errors.push("out/_next: CSS不存在");
if (!nextFiles.some((file) => file.endsWith(".js"))) errors.push("out/_next: JavaScript不存在");

const forbidden = [
  ["/", "o", "sanpo", "/"].join(""),
  ["/", "kan", "zen", "/"].join(""),
  ["/", "o", "sanpo", "-club-tokyo", "/"].join(""),
  ["#", "/area/"].join(""),
  ["#", "/course/"].join(""),
  ["#", "/spot/"].join(""),
  ["#", "/story/"].join("")
];

const htmlFiles = files.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const relative = path.relative(out, file);
  const html = fs.readFileSync(file, "utf8");
  if (/href=""|src=""|href="javascript:/i.test(html)) errors.push(`${relative}: 空URLまたはjavascript URL`);
  for (const value of forbidden) {
    if (html.includes(value)) errors.push(`${relative}: 旧URLまたはハッシュルート ${value}`);
  }
  // A preconnect hint is not a page or asset request. Next.js emits
  // `href="/"` for self-hosted fonts, independently of the deployment path.
  const inspectableHtml = html.replace(/<link\b(?=[^>]*\brel="preconnect")[^>]*>/g, "");
  for (const match of inspectableHtml.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(target)) continue;
    const clean = target.split(/[?#]/)[0];
    if (!clean.startsWith(`${site.productionBasePath}/`) && clean !== site.productionBasePath) {
      errors.push(`${relative}: basePath外 ${target}`);
      continue;
    }
    const local = clean.slice(site.productionBasePath.length).replace(/^\//, "");
    const candidate = clean.endsWith("/")
      ? path.join(out, local, "index.html")
      : path.join(out, local);
    if (!fs.existsSync(candidate)) errors.push(`${relative}: 資産・内部リンク切れ ${target}`);
  }
}

const index = fs.existsSync(path.join(out, "index.html"))
  ? fs.readFileSync(path.join(out, "index.html"), "utf8")
  : "";
if (!index.includes(`<link rel="canonical" href="${site.productionUrl}"`)) {
  errors.push("index.html: canonical不一致");
}
if (!index.includes(`property="og:url" content="${site.productionUrl}"`)) {
  errors.push("index.html: OGP URL不一致");
}

const sitemap = fs.existsSync(path.join(out, "sitemap.xml"))
  ? fs.readFileSync(path.join(out, "sitemap.xml"), "utf8")
  : "";
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!match[1].startsWith(site.productionUrl)) errors.push(`sitemap.xml: URL不一致 ${match[1]}`);
}
const robots = fs.existsSync(path.join(out, "robots.txt"))
  ? fs.readFileSync(path.join(out, "robots.txt"), "utf8")
  : "";
if (!robots.includes(`Sitemap: ${site.productionUrl}sitemap.xml`)) {
  errors.push("robots.txt: sitemap URL不一致");
}

const textOutput = files
  .filter((file) => /\.(?:html|css|js|json|xml|txt)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
for (const value of forbidden) {
  if (textOutput.includes(value)) errors.push(`out全体: 旧URLまたはハッシュルート ${value}`);
}
const tokenPrefixes = [
  ["github", "pat"].join("_") + "_",
  ["g", "hp"].join("") + "_"
];
if (
  /\/workspace\/|file:\/\/|BEGIN (?:RSA |EC )?PRIVATE KEY/.test(textOutput) ||
  tokenPrefixes.some((prefix) => textOutput.includes(prefix))
) {
  errors.push("out全体: ローカルパスまたは秘密情報らしき文字列");
}

if (errors.length) {
  console.error([...new Set(errors)].join("\n"));
  process.exit(1);
}
console.log(`Output check passed: ${files.length} files, ${htmlFiles.length} HTML files.`);
