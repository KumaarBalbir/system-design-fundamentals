const database = require("./database");
const express = require("express");
const redis = require("redis").createClient();

const app = express();

app.get("/nocache/index.html", (req, res) => {
  database.get("index.html", (page) => {
    res.send(page);
  });
});

app.get("/withcache/index.html", (req, res) => {
  redis.get("index.html", (err, redisResponse) => {
    if (redisResponse) {
      res.send(redisResponse);
      return;
    }
  });
  database.get("index.html", (page) => {
    redis.set("index.html", page, "EX", 10); //expires in 10 seconds
    res.send(page);
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));

//run: node server.js
