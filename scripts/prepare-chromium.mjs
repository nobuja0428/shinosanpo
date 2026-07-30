import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "node_modules/@sparticuz/chromium/bin");
const runtime = "/tmp/shinosanpo-chromium-runtime";
fs.mkdirSync(runtime, { recursive: true });
fs.mkdirSync("/tmp/shinosanpo-chromium-home", { recursive: true });
fs.mkdirSync("/tmp/shinosanpo-chromium-cache", { recursive: true });

const inflate = async (input, output) => {
  if (fs.existsSync(output) && fs.statSync(output).size > 0) return;
  await pipeline(fs.createReadStream(input), createBrotliDecompress(), fs.createWriteStream(output));
};

await inflate(path.join(source, "chromium.br"), path.join(runtime, "chromium"));
fs.chmodSync(path.join(runtime, "chromium"), 0o700);

for (const archive of ["swiftshader.tar.br", "fonts.tar.br", "al2023.tar.br"]) {
  const tarPath = path.join(runtime, archive.replace(/\.br$/, ""));
  const marker = path.join(runtime, `.${archive}.done`);
  if (fs.existsSync(marker)) continue;
  await inflate(path.join(source, archive), tarPath);
  const result = spawnSync("tar", ["--no-same-owner", "-xf", tarPath, "-C", runtime], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
  fs.writeFileSync(marker, "ok\n");
}

console.log(`Prepared Chromium: ${path.join(runtime, "chromium")}`);
