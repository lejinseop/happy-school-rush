const { dependencies } = require("./package.json");

module.exports = {
  name: "cra_cafeteria",
  exposes: {
    "./Cafeteria": "./src/App.tsx",
  },
  filename: "remoteEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
