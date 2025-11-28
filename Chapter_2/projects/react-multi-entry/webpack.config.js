const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    home: "./src/home.js",
    admin: "./src/admin.js"
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },

  devServer: {
    // Tells webpack-dev-server where to serve static files from.
    static: {
      directory: path.resolve(__dirname, "dist")
    },
    devMiddleware: {
      // Forces webpack-dev-server to write the compiled files physically to the dist/ directory on your disk.
      writeToDisk: true
    },
    port: 3000,
    hot: true,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]]
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "home.html",
      chunks: ["home"],
      template: "public/home.html"
    }),
    new HtmlWebpackPlugin({
      filename: "admin.html",
      chunks: ["admin"],
      template: "public/admin.html"
    })
  ],

  /*
  tells Webpack which file extensions it should automatically try when importing modules.
  Ex:
  import Home from "./Home";
  Webpack will automatically try the following in order:
  1. ./Home.js
  2. ./Home.jsx
*/
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
