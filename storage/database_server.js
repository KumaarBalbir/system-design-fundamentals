const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const hashtable = {};
const DATA_DIR = "local_db";

app.listen(3001, () => console.log("Server started on port 3001"));

app.get("/memory/:key", (req, res) => {
  const key = req.params.key;
  if (key in hashtable) {
    res.send("Data from memory: " + hashtable[key]);
    return;
  }
});

app.post("/memory/:key", (req, res) => {
  const key = req.params.key;
  hashtable[key] = req.body;
  res.send("Successfully data recorded in memory...");
  return;
});

app.get("/disk/:key", (req, res) => {
  const key = req.params.key;
  const filename = `${DATA_DIR}/${key}`;
  try {
    const data = fs.readFileSync(filename, "utf8");
    res.send("Here is your data from disk: ", JSON.parse(data));
  } catch (e) {
    res.send("No data found on disk...");
  }
});
app.post("/disk/:key", (req, res) => {
  const key = req.params.key;
  const filename = `${DATA_DIR}/${key}`;
  fs.writeFileSync(filename, JSON.stringify(req.body));
  res.send("Successfully data recorded on disk...");
  return;
});
