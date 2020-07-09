const { uuid } = require("uuidv4");
const express = require("express");
const app = express();

const PORT = 3000;

app.set("trust proxy", true);

let hashTimestamp;

const infiniteLoop = () => {
  setTimeout(() => {
    const ts = new Date();
    hashTimestamp = `${ts.toISOString()}: ${uuid()}`;
    console.log(hashTimestamp);
    infiniteLoop();
  }, 5000);
};

infiniteLoop();

app.get("/", function (req, res) {
  console.log(`${req.ip} requested timestamp`);
  return res.send(hashTimestamp);
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
