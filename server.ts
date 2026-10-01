import { resolve, join, extname } from "node:path";

const ROOT = resolve(import.meta.dir, "public");
const PORT = Number(process.env.PORT ?? 3000);

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const filePath = resolve(join(ROOT, pathname));
    if (!filePath.startsWith(ROOT + "/")) {
      return new Response("Forbidden", { status: 403 });
    }

    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    const type = TYPES[extname(filePath)] ?? "application/octet-stream";
    const cache = extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600";
    return new Response(file, {
      headers: { "Content-Type": type, "Cache-Control": cache },
    });
  },
});

console.log(`Q platby → http://localhost:${PORT}`);
