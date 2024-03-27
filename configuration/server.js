const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const staticConfig = JSON.parse(fs.readFileSync("static_config.json"));

app.get("/static/new_feature.html", (req, res) => {
  if (!staticConfig.newFeatureLaunched) {
    res.status(401).send("New feature is not launched");
  } else {
    res.send("New feature is launched");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
