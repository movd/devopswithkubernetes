require("dotenv").config();
const fsPromises = require("fs").promises;
const scrape = require("website-scraper");

const URL = process.env.URL || "https://icanhazip.com/";

const options = {
  urls: [URL],
  directory: `${__dirname}/output`,
};

const deleteFolderIfExists = async (path) => {
  try {
    await fsPromises.rmdir(path, { recursive: true });
    console.log(
      `💣 folder ${path} already existed, so I just deleted it without asking.`
    );
  } catch (error) {
    console.error(error.message);
  }
};

(async () => {
  console.log(`📸 dummysite controller launched`);
  console.log(`🌐 url set to ${URL}`);
  const { urls, directory } = options;
  try {
    await deleteFolderIfExists(directory);

    const result = await scrape(options);
    console.log(`📸 scraped ${urls[0]} to ${directory}`);
  } catch (error) {
    console.error(`❌ ERROR: could not scrape ${urls[0]} to ${directory}`);
    console.error(`Reason: ${error.message}`);
  }
})();
