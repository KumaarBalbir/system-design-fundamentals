const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT;
const DATA_DIR = process.env.DATA_DIR;

const app = express();
app.use(express.json());

app.post("/:key", (req, res) => {
  const key = req.params.key;
  console.log("Storing data at key: " + key);
  const destinationFile = `${DATA_DIR}/${key}`;
  fs.writeFileSync(destinationFile, req.body.data);
  res.send();
});

app.get(":/key", (req, res) => {
  const key = req.params.key;
  console.log("Fetching data at key: " + key);
  const sourceFile = `${DATA_DIR}/${key}`;
  try {
    const data = fs.readFileSync(sourceFile);
    res.send(data);
  } catch (err) {
    res.send("null");
  }
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
