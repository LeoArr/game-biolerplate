const express = require("express");
const ws = require("ws");
const fs = require("fs");
// const http = require("http");
const https = require("https");
const gameServer = require("./game-server")

const port = 3000;

const app = express();

const credentials = {
  key: fs.readFileSync("./selfsigned_dev.key"),
  cert: fs.readFileSync("./selfsigned_dev.crt"),
};
const ssl_server = https
  .createServer(credentials, app)
  .listen(port + 443, () => {
    console.log(`Server listening on port: ${port + 443}`);
  });

// const server = http.createServer(app).listen(port, () => {
//   console.log(`Server listening on port: ${port}`);
// });

// const wss = new ws.Server({ server: server }, () => {
//   console.log("Websocket server")
// });
const ssl_wss = new ws.Server({ server: ssl_server }, () => {
  console.log("SSL Websocket server")
});

function setupWss(wss) {
  wss.on("connection", (ws) => {
    gameServer.setupConnection(ws)
  });
}

// setupWss(wss)
setupWss(ssl_wss)