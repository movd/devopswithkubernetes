require("dotenv").config();
const { uuid } = require("uuidv4");
const fsPromises = require("fs").promises;

const { HASHFILE_PATH } = process.env;

const writeHashFile = async (path) => {
  let ts = new Date();
  let hashTimestamp = `${ts.toISOString()}: ${uuid()}`;
  try {
    await fsPromises.writeFile(path, hashTimestamp);
    console.log(`generated a new hash: ${hashTimestamp}`);
    return hashTimestamp;
  } catch (error) {
    console.error(`error: ${error.message}`);
  }
};

const hashLoop = () => {
  setTimeout(async () => {
    const generatedHashTimestamp = await writeHashFile(HASHFILE_PATH);
    hashLoop();
  }, 5000);
};

(async () => {
  try {
    const generatedHashTimestamp = await writeHashFile(HASHFILE_PATH);
    hashLoop();
  } catch (error) {
    console.error(`error: ${error.message}`);
  }
})();
