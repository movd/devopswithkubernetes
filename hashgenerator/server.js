require("dotenv").config();
const fsPromises = require("fs").promises;
const express = require("express");
const axios = require("axios");

const app = express();

const {
  HASHFILE_PATH,
  PINGPONGFILE_PATH,
  PINGPONG_URL,
  HASHGENERATOR_URL,
} = process.env;
console.log("HASHGENERATOR_URL:", HASHGENERATOR_URL);
console.log("HASHFILE_PATH:", HASHFILE_PATH);
console.log("PINGPONG_URL:", PINGPONG_URL);
console.log("PINGPONGFILE_PATH:", PINGPONGFILE_PATH);

const PORT = process.env.SERVER_PORT || 3000;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  console.log(`${req.ip} requested a hashFile + pingPongFile`);

  let currentHash;

  if (!HASHGENERATOR_URL && !HASHFILE_PATH) {
    return res.status(400).send(`error not hash provider given`);
  }

  try {
    if (HASHGENERATOR_URL) {
      const fetchHashes = async (url) => {
        try {
          const res = await axios.get(url);
          return res.data.hashTimestamp;
        } catch (error) {
          console.error(error);
        }
      };

      currentHash = await fetchHashes(HASHGENERATOR_URL);
    }

    if (HASHFILE_PATH) {
      currentHash = await fsPromises.readFile(HASHFILE_PATH, "utf-8");
    }

    if (PINGPONG_URL) {
      const fetchPingPongs = async (url) => {
        try {
          const res = await axios.get(url, { headers: { "Read-Only": true } });
          return res.data.counter;
        } catch (error) {
          console.error(error);
        }
      };

      const pingPongCounter = await fetchPingPongs(PINGPONG_URL);
      return res.status(200).send(`${currentHash}<br> ${pingPongCounter}`);
    }

    if (PINGPONGFILE_PATH) {
      const pingPongFile = await fsPromises.readFile(
        PINGPONGFILE_PATH,
        "utf-8"
      );
      return res.status(200).send(`${currentHash}<br> ${pingPongFile}`);
    }

    // If nothing
    return res.status(200).send(currentHash);
  } catch (error) {
    res.status(400).send(`error: ${error.message}`);
    console.error(`error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
