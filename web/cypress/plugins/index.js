const watchApp = require("cypress-app-watcher-preprocessor");
module.exports = (on, config) => {
  on("file:preprocessor", watchApp());
};
