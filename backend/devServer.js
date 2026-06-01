import http from "http";
import url from "url";

// Import serverless handlers
import authHandler from "./api/auth.js";
import itemsHandler from "./api/items.js";
import borrowHandler from "./api/borrow.js";
import notificationsHandler from "./api/notifications.js";
import paymentsHandler from "./api/payments.js";
import aiHandler from "./api/ai.js";
import healthHandler from "./api/health.js";

const PORT = 5000;

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  req.query = parsedUrl.query;

  // Setup request helpers similar to Express/Vercel
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
    return res;
  };

  // Collect request body natively
  req.setEncoding("utf8");
  let buffer = "";

  req.on("data", (chunk) => {
    buffer += chunk;
  });

  req.on("end", async () => {

    if (buffer) {
      try {
        req.body = JSON.parse(buffer);
      } catch (e) {
        req.body = {};
      }
    } else {
      req.body = {};
    }

    // Dynamic routing to Vercel serverless handlers
    try {
      console.log(`[DevServer] ${req.method} ${path}`);
      if (path === "/api/auth" || path === "/api/auth.js") {
        await authHandler(req, res);
      } else if (path === "/api/items" || path === "/api/items.js") {
        await itemsHandler(req, res);
      } else if (path === "/api/borrow" || path === "/api/borrow.js") {
        await borrowHandler(req, res);
      } else if (path === "/api/notifications" || path === "/api/notifications.js") {
        await notificationsHandler(req, res);
      } else if (path === "/api/payments" || path === "/api/payments.js") {
        await paymentsHandler(req, res);
      } else if (path === "/api/ai" || path === "/api/ai.js") {
        await aiHandler(req, res);
      } else if (path === "/api/health" || path === "/api/health.js" || path === "/") {
        await healthHandler(req, res);
      } else {
        res.status(404).json({ error: `Not Found: ${path}` });
      }
    } catch (err) {
      console.error("[DevServer Error]:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 TrustLoop Offline DevServer running at http://localhost:${PORT}`);
  console.log(`👉 Backend routes matched locally to serverless /api folder endpoints.\n`);
});
