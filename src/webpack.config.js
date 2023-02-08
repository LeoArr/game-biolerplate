const path = require("path");
const fs = require("fs")

module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: path.resolve(
            __dirname,
            "node_modules/p5/lib/addons/p5.sound.js"
        ),
        loader: "imports-loader",
        options: {
            type: "module",
            imports: "p5",
        },
    },
    {
        test: path.resolve(
            __dirname,
            "node_modules/p5/lib/addons/p5.sound.min.js"
        ),
        loader: "imports-loader",
        options: {
            type: "module",
            imports: "p5",
        },
    },
    ],
  },
  devServer: {
    allowedHosts: "all",
    https: {
      key: fs.readFileSync("cert.key"),
      cert: fs.readFileSync("cert.crt"),
      ca: fs.readFileSync("ca.crt"),
    }
  }
};
