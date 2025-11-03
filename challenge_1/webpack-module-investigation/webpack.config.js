const path = require('path');

module.exports = {
  mode: 'development',   // readable, non-minified output
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,        // disables source maps for raw output inspection
};
