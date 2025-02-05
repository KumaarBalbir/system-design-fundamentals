const express = require("express");
const app = express();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.headers);
  res.send(`Hello from port ${port}!\n`);
});
