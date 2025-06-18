const { createRequestHandler } = require("@remix-run/express");
const express = require("express");
const path = require("path");
const process = require("process");
const { fileURLToPath } = require('url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "build", "client")));

// Manejar todas las rutas con Remix
app.all("*", createRequestHandler({
  build: () => require("./build/server"),
}));

const port = (typeof process !== "undefined" && process.env && process.env.PORT) ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});