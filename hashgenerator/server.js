require("dotenv").config();
const fsPromises = require("fs").promises;
const express = require("express");
const axios = require("axios");

const app = express();

const { PINGPONG_URL, HASHGENERATOR_URL } = process.env;
console.log("HASHGENERATOR_URL:", HASHGENERATOR_URL);
console.log("PINGPONG_URL:", PINGPONG_URL);

const PORT = process.env.SERVER_PORT || 3000;
const MESSAGE = process.env.MESSAGE || "Not from dotenv";

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  console.log(`${req.ip} requested a hashFile + pingPongFile`);

  let currentHash;

  if (!HASHGENERATOR_URL) {
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
      return res
        .status(200)
        .send(`${MESSAGE}<br> ${currentHash}<br> ${pingPongCounter}`);
    }

    // If nothing
    return res.status(200).send(currentHash);
  } catch (error) {
    res.status(400).send(`error: ${error.message}`);
    console.error(`error: ${error.message}`);
  }
});

app.get("/healthz", async (req, res) => {
  if (!PINGPONG_URL)
    return res.status(400).json({ error: "PINGPONG_URL is undefined" });
  if (!HASHGENERATOR_URL)
    return res.status(400).json({ error: "HASHGENERATOR_URL is undefined" });
  const pingPongHealthz = `${new URL(PINGPONG_URL).origin}/healthz`; // http://localhost:3000/healthz

  try {
    const resAxios = await axios.get(pingPongHealthz);
    if (resAxios.status === 200) {
      return res.status(200).json({
        [pingPongHealthz]: {
          response: resAxios.data,
          status: resAxios.status,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      [pingPongHealthz]: {
        response: error.message,
        status: error.code,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
