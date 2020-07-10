require("dotenv").config();
const fsPromises = require("fs").promises;
const express = require("express");
const app = express();

const { HASHFILE_PATH, PINGPONGFILE_PATH } = process.env;

const PORT = 3000;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  console.log(`${req.ip} requested a hashFile + pingPongFile`);
  try {
    const hashFile = await fsPromises.readFile(HASHFILE_PATH, "utf-8");
    const pingPongFile = await fsPromises.readFile(PINGPONGFILE_PATH, "utf-8");
    res.status(200).send(`${hashFile}<br> ${pingPongFile}`);
  } catch (error) {
    res.status(400).send(`error: ${error.message}`);
    console.error(`error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
  console.log("HASHFILE_PATH: ", HASHFILE_PATH);
  console.log("PINGPONGFILE_PATH: ", PINGPONGFILE_PATH);
});
