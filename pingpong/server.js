require("dotenv").config();
const os = require("os");
const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = os.hostname();

const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_DB = process.env.POSTGRES_DB || "postgres";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD.trim() || "password";
console.log(`NEVER log a db password to stdin: '${POSTGRES_PASSWORD}'`);

const dbConfig = {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

app.set("trust proxy", true);

const pool = new Pool(dbConfig);

const query = async (q) => {
  const client = await pool.connect();
  let res;
  try {
    await client.query("BEGIN");
    try {
      res = await client.query(q);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
};

app.get("/", (req, res) => {
  res.redirect("/pingpong");
});

app.get("/pingpong", async (req, res) => {
  try {
    const { rows } = await query(
      "INSERT INTO pingpongers (name) VALUES ('mr. ping async')"
    );
    console.log("ping");
  } catch (error) {
    return res.status(400).json({ error: error.message, hostname });
  }

  try {
    const { rows } = await query("SELECT * FROM pingpongers");
    console.log("pong", rows.length);
    return res.status(200).json({ counter: rows.length, hostname });
  } catch (error) {
    return res.status(400).json({ error: error.message, hostname });
  }
});

app.get("/healthz", async (req, res) => {
  try {
    await query("SELECT * FROM pingpongers");
    console.log(`health check from ${req.ip}`);
    return res.status(200).json({ status: "connected to db", hostname });
  } catch (error) {
    return res.status(400).json({ status: error.message, hostname });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on: ${PORT}`);
});
