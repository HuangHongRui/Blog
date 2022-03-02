const fs = require("fs");
const path = require("path");
const appDir = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDir, relativePath);

module.exports = {
  path: path,
  root: resolveApp("."),
  src: resolveApp("./src"),
  dist: resolveApp("./dist"),
  public: resolveApp("./public"),
};
