const fsPromises = require("fs").promises;
const k8s = require("@kubernetes/client-node");
const scrape = require("website-scraper");

// Begin Website Scraping Stuff:
const validateUrl = (url) => {
  try {
    const { href, hostname } = new URL(url);
    return { href, hostname };
  } catch (error) {
    console.error(`❌ ERROR: "${url}" is not a valid URL!`);
    return { href: "error", hostname: "N/A" };
  }
};

const deleteFolderIfExists = async (path) => {
  try {
    await fsPromises.stat(path);
    await fsPromises.rmdir(path, { recursive: true });
  } catch (error) {}
};

// Website scraper function
const scrapeWebsite = async (url, subfolder) => {
  const options = {
    urls: [url],
    directory: `${__dirname}/output/${subfolder}`,
    // /usr/src/app/output in container
  };

  const { urls, directory } = options;
  try {
    await deleteFolderIfExists(directory);
    const result = await scrape(options);
    console.log(`📸 scraped "${urls[0]}" to ${directory}`);

    return { result, directory, successful: true };
  } catch (error) {
    console.error(`❌ ERROR: could not scrape "${urls[0]}" to ${directory}`);
    console.error(`Reason: ${error.message}`);
    // result[0]))?.text

    return {
      result: [{ text: "error" }],
      directory: "N/A",
      successful: false,
    };
  }
};

// Strip object and functions from main object
// From: <https://stackoverflow.com/a/31557814>
function simpleStringify(object) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}

// k8s client setup
const kc = new k8s.KubeConfig();

process.env.NODE_ENV === "development"
  ? kc.loadFromDefault()
  : kc.loadFromCluster();

// const client = k8s.KubernetesObjectApi.makeApiClient(kc);
const client = kc.makeApiClient(k8s.CustomObjectsApi);
const watch = new k8s.Watch(kc);

console.log("☸️ k8s Cluster config:", kc.getCurrentCluster());

// Connect to Kubernetes API and watch for changes
(async () => {
  console.log(`🎆 DummySite controller launched`);

  watch.watch(
    "/apis/stable.dwk/v1/dummysites",
    {
      allowWatchBookmarks: true,
    },
    // callback is called for each received object.
    async (type, apiObj) => {
      if (type === "ADDED" || type === "MODIFIED") {
        console.log(
          `☸️ the k8s object "${apiObj.metadata?.name}" was created or updated`
        );
        const websiteUrlFromRessource = apiObj.spec?.website_url;
        const { href, hostname } = validateUrl(websiteUrlFromRessource);

        const { result, directory, successful } = await scrapeWebsite(
          href, // url in scraper
          hostname //  subfolder in scraper
        );

        const text = JSON.parse(simpleStringify(result[0]))?.text;

        // Now we write the changes back to k8s
        const { name, namespace } = apiObj.metadata;

        try {
          // Add html text and output folder path to the spec of the k8s object
          const newApiObject = {
            ...apiObj,
            spec: {
              ...apiObj.spec,
              successful,
              html: text,
              path_in_pod: directory,
            },
          };

          const patchOptions = {
            headers: {
              "Content-type": "application/merge-patch+json",
            },
          };

          await client.patchNamespacedCustomObject(
            "stable.dwk", // group
            "v1", // version
            namespace, // namespace
            "dummysites", // plural
            name, // name
            newApiObject, // body
            undefined, // dryRun
            undefined, // fieldManager
            undefined, // force
            patchOptions // options
          );
        } catch (error) {
          console.error(`❌ ERROR: while patching ${name} in ${namespace}!`);
        }
      } else if (type === "DELETED") {
        console.log(`☸️ the k8s object "${apiObj.metadata?.name}" was deleted`);
      }
    },
    (err) => {
      console.error("❌ ERROR: could not watch for k8s objects");
      console.error(`Reason: ${err}`);
    }
  );
})();
