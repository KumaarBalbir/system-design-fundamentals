const database = require("./database");
const express = require("express");
const app = express();

app.listen(3000, () => console.log("Server started on port 3000"));

// keep a map of the previous request time for each user
const access = {};

app.get("/index.html", function (req, res) {
  const { user } = req.headers;
  if (user in access) {
    const prev = access[user];
    const curr = Date.now();
    if (curr - prev < 5000) {
      res.status(429).send("Too many requests.\n");
      return;
    }
  }

  //serve the page and store the request time
  database.get("index.html", (page) => {
    access[user] = Date.now();
    res.send(page + "\n");
  });
});
