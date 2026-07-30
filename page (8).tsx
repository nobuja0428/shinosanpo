import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import site from "../site.config.json" with { type: "json" };

const root = path.resolve(import.meta.dirname, "../out");
const prefix = site.productionBasePath;
const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp" };

http.createServer((request, response) => {
  const raw = new URL(request.url || "/", `http://${request.headers.host}`).pathname;
  if (!raw.startsWith(prefix)) { response.writeHead(404); response.end("Not found"); return; }
  let relative = raw.slice(prefix.length) || "/";
  let file = path.join(root, decodeURIComponent(relative));
  if (relative.endsWith("/")) file = path.join(file, "index.html");
  if (!path.extname(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) file = path.join(root, "404.html");
  response.writeHead(file.endsWith("404.html") && !fs.existsSync(path.join(root, relative)) ? 404 : 200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Serving ${root} at http://127.0.0.1:${port}${prefix}/`));
