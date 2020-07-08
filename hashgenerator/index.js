const { uuid } = require("uuidv4");

const infiniteLoop = () => {
  setTimeout(() => {
    const ts = new Date();
    console.log(`${ts.toISOString()}: ${uuid()}`);
    infiniteLoop();
  }, 5000);
};

infiniteLoop();
