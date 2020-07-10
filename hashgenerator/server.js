require("dotenv").config();
const fsPromises = require("fs").promises;
const express = require("express");
const app = express();

const { HASHFILE_PATH } = process.env;

const PORT = 3000;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  console.log(`${req.ip} requested a hashFile`);
  const hashFile = await fsPromises.readFile(HASHFILE_PATH, "utf-8");
  try {
    res.send(hashFile);
  } catch (error) {
    res.send(`error: ${error.message}`);
    console.error(`error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
