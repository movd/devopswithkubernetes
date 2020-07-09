const express = require("express");
const app = express();

const PORT = 3000;

app.set("trust proxy", true);

let counter = 0;

app.get("/ping", function (req, res) {
  counter++;
  console.log(`${req.ip} has pinged. i have been ping ${counter} times.`);

  return res.send(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
