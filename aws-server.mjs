// AWS Node.js server wrapper for TanStack Start (Cloudflare Workers → Node.js adapter)
// This bridges the Cloudflare Workers fetch() interface to a standard Node.js HTTP server.

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Dynamically import the built Cloudflare Workers-style handler
async function loadHandler() {
  try {
    const handlerPath = path.join(__dirname, "dist", "server", "index.js");
    const handlerUrl = pathToFileURL(handlerPath).href;
    const mod = await import(handlerUrl);
    return mod.default ?? mod;
  } catch (err) {
    console.error("Failed to load server handler:", err);
    throw err;
  }
}

// Convert Node.js IncomingMessage → Web API Request
async function nodeToWebRequest(req) {
  const protocol = req.socket.encrypted ? "https" : "http";
  const host = req.headers.host || `localhost:${PORT}`;
  const url = new URL(req.url, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  const method = req.method || "GET";
  const hasBody = !["GET", "HEAD"].includes(method);

  let body = null;
  if (hasBody) {
    body = await new Promise((resolve) => {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  return new Request(url.toString(), {
    method,
    headers,
    body: hasBody && body.length > 0 ? body : null,
  });
}

// Convert Web API Response → Node.js ServerResponse
async function webToNodeResponse(webResponse, res) {
  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const buffer = await webResponse.arrayBuffer();
  res.end(Buffer.from(buffer));
}

// Serve static files from dist/client
function serveStatic(req, res) {
  const clientDir = path.join(__dirname, "dist", "client");
  let filePath = path.join(clientDir, req.url === "/" ? "index.html" : req.url);

  // Security: prevent path traversal
  if (!filePath.startsWith(clientDir)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return true;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
    };
    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    // Cache assets for 1 year
    if (req.url.includes("/assets/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
}

async function main() {
  const handler = await loadHandler();
  console.log("✅ Server handler loaded");

  const server = http.createServer(async (req, res) => {
    try {
      // Try serving static files first
      if (serveStatic(req, res)) return;

      // Forward to TanStack Start SSR handler
      const webReq = await nodeToWebRequest(req);
      const webRes = await handler.fetch(webReq, process.env, {
        waitUntil: () => {},
        passThroughOnException: () => {},
      });
      await webToNodeResponse(webRes, res);
    } catch (err) {
      console.error("Request error:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  server.listen(PORT, () => {
    console.log(`🚀 DodoX Zenith running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
