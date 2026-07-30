import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];
const required = [
  ".github/workflows/ci.yml",
  ".github/workflows/deploy-pages.yml",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/editorial-policy/page.tsx",
  "src/app/events/page.tsx",
  "src/app/favorites/page.tsx",
  "src/components/Breadcrumbs.tsx",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/Cards.tsx",
  "src/components/MobileBottomNav.tsx",
  "src/components/SearchPanel.tsx",
  "src/components/FilterPanel.tsx",
  "src/components/FavoriteButton.tsx",
  "src/components/TrustPanel.tsx",
  "src/components/ActionPanel.tsx",
  "src/content/index.ts",
  "src/content/areas.ts",
  "src/content/courses.ts",
  "src/content/spots.ts",
  "src/content/stories.ts",
  "src/content/events.ts",
  "src/lib/seo.ts",
  "src/lib/analytics.ts",
  "src/lib/favorites.ts",
  "src/lib/search.ts",
  "src/lib/routes.ts",
  "src/lib/validation.ts",
  "next.config.mjs",
  "site.config.json",
  "package.json",
  "package-lock.json"
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`必須ファイル不存在: ${file}`);
}

const skip = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "playwright-report",
  "test-results",
  "lighthouse-report",
  ".lighthouseci"
]);
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
};
walk(root);

const relativeFiles = files.map((file) => path.relative(root, file));
for (const file of relativeFiles) {
  if (/page \(\d+\)\.tsx$/i.test(file)) errors.push(`自動改名ファイル: ${file}`);
  if (/^[^/]+\.(?:tsx|ts)$/.test(file) && ![
    "next-env.d.ts",
    "playwright.config.ts",
    "vitest.config.ts"
  ].includes(file)) errors.push(`ルート直下の不正なTypeScript: ${file}`);
}

const textFiles = files.filter((file) => /\.(?:md|tsx|ts|yml|yaml|mjs|json|txt|css)$/.test(file));
const hashes = new Map();
for (const file of textFiles) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  const trimmed = text.trim();
  if (!trimmed) continue;

  if (relative.endsWith(".md")) {
    if (/^\s*(?:import|export)\s+.*(?:react|next\/)/m.test(text) && /<[A-Z][A-Za-z]+/.test(text)) {
      errors.push(`MarkdownへReactコード混入: ${relative}`);
    }
    if (/^jobs:\s*$/m.test(text) && /actions\/(?:checkout|deploy-pages|upload-pages-artifact)@/m.test(text)) {
      errors.push(`MarkdownへWorkflow混入: ${relative}`);
    }
  }
  if (relative.endsWith(".tsx") && (/^#\s+\S/m.test(text) || /^```(?:tsx|typescript|yaml)?\s*$/m.test(text))) {
    errors.push(`TSXへMarkdown文書混入: ${relative}`);
  }
  if (/\.(?:yml|yaml)$/.test(relative) && /(?:from\s+["']react["']|<[A-Z][A-Za-z]+\b)/.test(text)) {
    errors.push(`YAMLへReactコード混入: ${relative}`);
  }

  const digest = crypto.createHash("sha256").update(trimmed).digest("hex");
  const previous = hashes.get(digest);
  if (previous) errors.push(`同一内容の異名ファイル: ${previous} / ${relative}`);
  else hashes.set(digest, relative);
}

const roleChecks = [
  ["src/components/Breadcrumbs.tsx", /export function Breadcrumbs/, /ContactPage|問い合わせ先は未設定/],
  ["src/components/Header.tsx", /export function Header/, /FavoritesPage|保存したページはありません/],
  ["src/components/Footer.tsx", /export function Footer/, /EventsPage|現在・今後の確認済みイベント/],
  ["src/app/contact/page.tsx", /export default function ContactPage/, /export function Breadcrumbs/]
];
for (const [file, expected, forbidden] of roleChecks) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, "utf8");
  if (!expected.test(text)) errors.push(`役割export不一致: ${file}`);
  if (forbidden.test(text)) errors.push(`別役割の内容混入: ${file}`);
}

const ci = fs.readFileSync(path.join(root, ".github/workflows/ci.yml"), "utf8");
if (!/pull_request:/.test(ci) || !/push:/.test(ci) || !/npm ci/.test(ci)) {
  errors.push("ci.yml: 必須triggerまたはnpm ci欠損");
}
const deploy = fs.readFileSync(path.join(root, ".github/workflows/deploy-pages.yml"), "utf8");
for (const action of ["actions/configure-pages@", "actions/upload-pages-artifact@", "actions/deploy-pages@"]) {
  if (!deploy.includes(action)) errors.push(`deploy-pages.yml: ${action}欠損`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`File-role check passed: ${relativeFiles.length} files, ${required.length} required paths.`);
