/* eslint-disable @typescript-eslint/no-require-imports */
const { app, BrowserWindow, shell } = require("electron");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

let server;

function portfolioDirectory() {
  return app.isPackaged
    ? path.join(process.resourcesPath, "portfolio")
    : path.join(__dirname, "..", "out");
}

function startLocalServer() {
  const root = portfolioDirectory();

  server = http.createServer((request, response) => {
    const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
    const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
    const requestedFile = path.resolve(root, relativePath);

    if (!requestedFile.startsWith(path.resolve(root))) {
      response.writeHead(403).end("Acesso negado");
      return;
    }

    fs.stat(requestedFile, (statError, stats) => {
      let filePath = requestedFile;
      if (!statError && stats.isDirectory()) filePath = path.join(requestedFile, "index.html");

      fs.readFile(filePath, (readError, data) => {
        if (readError) {
          response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          response.end("Conteudo nao encontrado");
          return;
        }

        response.writeHead(200, {
          "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
          "Cache-Control": "no-store",
        });
        response.end(data);
      });
    });
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

async function createWindow() {
  const port = await startLocalServer();
  const window = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 360,
    minHeight: 640,
    backgroundColor: "#070b14",
    autoHideMenuBar: true,
    title: "Portfolio - Sergio Loyola",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  await window.loadURL(`http://127.0.0.1:${port}`);
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
app.on("before-quit", () => server?.close());
