require("dotenv").config();
const express = require("express");
const fsPromises = require("fs").promises;

const app = express();

const { PINGPONGFILE_PATH, ENABLE_DB } = process.env;
if (PINGPONGFILE_PATH) console.log("PINGPONGFILE_PATH:", PINGPONGFILE_PATH);
if (!PINGPONGFILE_PATH) console.log("Writing to txt is disabled");

const PORT = process.env.PORT || 3000;

const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_DB = process.env.POSTGRES_DB || "postgres";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD.trim() || "password";
console.log(`NEVER log a db password to stdin: '${POSTGRES_PASSWORD}'`);

const Pool = require("pg").Pool;
const pool = new Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
});

app.set("trust proxy", true);

let counter = 0;

app.get("/pingpong", async (req, res) => {
  if (!ENABLE_DB) {
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
        await fsPromises.writeFile(
          PINGPONGFILE_PATH,
          `Ping / Pongs: ${counter}`
        );
        console.log(`wrote to ${PINGPONGFILE_PATH}`);
      } catch (error) {
        console.error(`pingpong error: ${error.message}`);
      }
    }

    return res.status(200).json({ counter });
  } else {
    pool.query(
      "INSERT INTO pingpongers (name) VALUES ($1)",
      ["mr. ping"],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          console.log("added a new ping to db");
        }
      }
    );

    pool.query("SELECT * FROM pingpongers", (error, results) => {
      if (error) {
        throw error;
      } else {
        return res.status(200).json({ counter: results.rowCount });
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
