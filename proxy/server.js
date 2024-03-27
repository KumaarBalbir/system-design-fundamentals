const express = require("express");
const app = express();

app.listen(3000, () => console.log("Listening on port 3000"));

app.get("/hello", (req, res) => {
  console.log(req.headers);
  res.send("Hello from server...");
});

//run: node server.js
//run: curl localhost:3000/hello (in separate terminal) see response in server terminal
//run: curl localhost:8081/hello (in separate terminal) see response in server terminal
