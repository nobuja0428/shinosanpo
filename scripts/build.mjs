import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import site from "../site.config.json" with { type: "json" };

const root = path.resolve(import.meta.dirname, "..");

const run = (command, args, env = process.env) => {
  const result = spawnSync(command, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

for (const directory of [".next", "out"]) {
  fs.rmSync(path.join(root, directory), { recursive: true, force: true });
}

run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "validate:content"]);
run(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "build"],
  {
    ...process.env,
    NODE_ENV: "production",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || site.productionUrl,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || site.productionBasePath,
    NEXT_PUBLIC_GA4_ENABLED: process.env.NEXT_PUBLIC_GA4_ENABLED || "false",
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "",
    NEXT_PUBLIC_CONTACT_FORM_URL: process.env.NEXT_PUBLIC_CONTACT_FORM_URL || "",
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || ""
  }
);
