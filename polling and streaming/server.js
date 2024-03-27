const express = require("express");
const app = express();
const expressWs = require("express-ws"); // WebSocket endpoints for Express applications. Lets you define WebSocket endpoints
expressWs(app);
const messages = [{ id: 0, text: "Welcome", username: "Chat Room" }];
const Sockets = [];

app.use(express.json()); // for parsing application/json

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  const message = req.body;
  messages.push(message);
  Sockets.forEach((socket) => {
    socket.send(JSON.stringify(message));
  });
});

app.ws("/messages", (socket) => {
  Sockets.push(socket);
  socket.on("close", () => {
    Sockets.splice(Sockets.indexOf(socket), 1);
  });
});

app.listen(8080, () => console.log("Server started on port 8080"));
