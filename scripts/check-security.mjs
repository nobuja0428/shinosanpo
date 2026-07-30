import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const targets = ["src", "scripts", ".github", "docs", "out", "README.md", "next.config.mjs", "site.config.json"];
const files = [];
const skip = new Set(["node_modules", ".git", ".next"]);
const walk = (target) => {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) { files.push(target); return; }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    walk(path.join(target, entry.name));
  }
};
targets.forEach((target) => walk(path.join(root, target)));
const legacyPaths = [
  ["/", "o", "sanpo", "/"].join(""),
  ["/", "kan", "zen", "/"].join(""),
  ["/", "o", "sanpo", "-club-tokyo", "/"].join("")
];
const hashRoutes = ["area", "course", "spot", "story"].map((segment) => `#/${segment}/`);
const patterns = [
  ["秘密情報らしき文字列", /(ghp_|github_pat_|AIza[0-9A-Za-z_-]{20,}|sk-[A-Za-z0-9]{20,}|BEGIN (?:RSA |EC )?PRIVATE KEY)/],
  ["ローカル絶対パス", /\/workspace\/|file:\/\/|[A-Z]:\\Users\\/],
  ["ハッシュルーティング処理", /location\s*\.\s*hash/]
];
const errors = [];
for (const file of files) {
  if (path.basename(file) === "check-security.mjs") continue;
  if (!/\.(?:ts|tsx|js|mjs|json|html|css|md|txt|xml)$/.test(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const [label, regex] of patterns) if (regex.test(text)) errors.push(`${path.relative(root, file)}: ${label}`);
  for (const value of legacyPaths) if (text.includes(value)) errors.push(`${path.relative(root, file)}: 旧URL ${value}`);
  for (const value of hashRoutes) if (text.includes(value)) errors.push(`${path.relative(root, file)}: ハッシュルート ${value}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Security and legacy-string check passed: ${files.length} files.`);
