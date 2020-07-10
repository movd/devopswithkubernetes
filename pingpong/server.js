require("dotenv").config();
const express = require("express");
const fsPromises = require("fs").promises;

const app = express();

const { PINGPONGFILE_PATH } = process.env;
const PORT = 3000;

app.set("trust proxy", true);

let counter = 0;

app.get("/pingpong", async (req, res) => {
  counter++;
  console.log(
    `pingpong: ${req.ip} has pinged. i have been ping ${counter} times.`
  );
  try {
    await fsPromises.writeFile(PINGPONGFILE_PATH, `Ping / Pongs: ${counter}`);
  } catch (error) {
    console.error(`pingpong error: ${error.message}`);
  }
  return res.send(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
