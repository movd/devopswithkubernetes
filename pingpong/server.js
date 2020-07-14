require("dotenv").config();
const express = require("express");
const fsPromises = require("fs").promises;

const app = express();

const { PINGPONGFILE_PATH } = process.env;
if (PINGPONGFILE_PATH) console.log("PINGPONGFILE_PATH:", PINGPONGFILE_PATH);
if (!PINGPONGFILE_PATH) console.log("Writing to txt is disabled");

const PORT = 3000;

app.set("trust proxy", true);

let counter = 0;

app.get("/pingpong", async (req, res) => {
  // dont update if read-only header is set
  if (!req.get("read-only")) {
    counter++;
    console.log(
      `pingpong: ${req.ip} has pinged me. i have been ping ${counter} times.`
    );
  } else {
    console.log(`pingpong: ${req.ip} has read my ping count`);
  }

  // only write to disk if PINGPONGFILE_PATH is truthy
  if (PINGPONGFILE_PATH) {
    try {
      await fsPromises.writeFile(PINGPONGFILE_PATH, `Ping / Pongs: ${counter}`);
      console.log(`wrote to ${PINGPONGFILE_PATH}`);
    } catch (error) {
      console.error(`pingpong error: ${error.message}`);
    }
  }
  return res.status(200).json({ counter });
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
