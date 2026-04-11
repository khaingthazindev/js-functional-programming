const fs = require("node:fs");
console.time("timer");
console.timeLog("timer", "Read start");
fs.readFile("./file/helloworld.txt", "utf-8", (err, data) => {
  if (!err) {
    console.timeLog("timer", "Data", data, data.toString.length);
  }
});
console.timeLog("timer", "End");
