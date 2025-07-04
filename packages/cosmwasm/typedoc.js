// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
const packageJson = require("./package.json");

module.exports = {
  entryPoints: ["./src"],
  out: "docs",
  exclude: "**/*.spec.ts",
  name: `${packageJson.name} Documentation`,
  readme: "README.md",
  excludeExternals: true,
  excludePrivate: true,
};
