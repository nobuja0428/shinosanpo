import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const targets = ["src", "scripts", ".github", "out", "README.md", "next.config.mjs", "site.config.json"];
const files = [];
const skip = new Set(["node_modules", ".git", ".next", "docs"]);
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
const patterns = [
  ["秘密情報らしき文字列", /(ghp_|github_pat_|AIza[0-9A-Za-z_-]{20,}|sk-[A-Za-z0-9]{20,}|BEGIN (?:RSA |EC )?PRIVATE KEY)/],
  ["旧URL", /https:\/\/nobuja0428\.github\.io\/(?:osanpo|kanzen)\//],
  ["旧basePath", /["'`](?:\/osanpo\/|\/kanzen\/)/],
  ["ハッシュルーティング", /location\.hash|href=["']#\//]
];
const errors = [];
for (const file of files) {
  if (path.basename(file) === "check-security.mjs") continue;
  if (!/\.(?:ts|tsx|js|mjs|json|html|css|md|txt|xml)$/.test(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const [label, regex] of patterns) if (regex.test(text)) errors.push(`${path.relative(root, file)}: ${label}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Security and legacy-string check passed: ${files.length} files.`);
