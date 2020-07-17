require("dotenv").config();
const express = require("express");
const { uuid } = require("uuidv4");
const fsPromises = require("fs").promises;

const app = express();
const PORT = process.env.GENERATOR_PORT || 3001;
app.set("trust proxy", true);

const { HASHFILE_PATH } = process.env;
if (HASHFILE_PATH) console.log("HASHFILE_PATH:", HASHFILE_PATH);
if (!HASHFILE_PATH) console.log("Writing to txt is disabled");

let hashTimestamp;

const generateHash = async (path) => {
  let ts = new Date();
  hashTimestamp = `${ts.toISOString()}: ${uuid()}`;

  if (HASHFILE_PATH) {
    try {
      await fsPromises.writeFile(path, hashTimestamp);
      console.log(`generated a new hash: ${hashTimestamp}`);
    } catch (error) {
      console.error(`error: ${error.message}`);
    }
  }

  return hashTimestamp;
};

const hashLoop = () => {
  setTimeout(async () => {
    hashTimestamp = await generateHash(HASHFILE_PATH);
    console.log("current:", hashTimestamp);
    hashLoop();
  }, 5000);
};

(async () => {
  try {
    hashTimestamp = await generateHash(HASHFILE_PATH);
    hashLoop();
  } catch (error) {
    console.error(`error: ${error.message}`);
  }
})();

app.get("/", (_req, res) => {
  res.status(200).json({ hashTimestamp });
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
