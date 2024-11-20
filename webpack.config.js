const path = require("path");
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const baseConfig = {
  entry: resolvePath("./src/index.jsx"),
  mode: "production",
  output: {
    path: resolvePath("./dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
module.exports = baseConfig;
