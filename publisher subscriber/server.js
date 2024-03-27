const express = require("express");
const app = express();
const expws = require("express-ws");
expws(app);
app.use(express.json());

const sockets = {};

app.post(":/topicId", (req, res) => {
  const { topicId } = req.params;
  const message = req.body;
  const topicSokets = sockets[topicId] || {};
  for (const socket of topicSokets) {
    socket.socket(JSON.stringify(message));
  }
});

app.ws("/:topicId", (socket, req) => {
  const { topicId } = req.params;
  if (!sockets[topicId]) sockets[topicId] = [];

  const topicSokets = sockets[topicId];
  topicSokets.push(socket);

  socket.on("close", () => {
    topicSokets.splice(topicSokets.indexOf(socket), 1);
  });
});

app.listen(3000, () => {
  console.log("server started!");
});
