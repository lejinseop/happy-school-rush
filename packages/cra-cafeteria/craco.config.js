const CracoAlias = require("craco-alias");
const CracoModuleFederation = require("craco-module-federation");

module.exports = {
  plugins: [
    {
      plugin: CracoModuleFederation,
    },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  devServer: {
    port: 5200,
  },
};
