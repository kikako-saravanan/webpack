const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    home: './src/home.js',
    admin: './src/admin.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // ensure @babel/preset-react is installed/configured
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: { extensions: ['.js', '.jsx'] },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      minChunks: 2,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({ filename: 'home.html', template: 'public/home.html', chunks: ['runtime','vendors','common','home'] }),
    new HtmlWebpackPlugin({ filename: 'admin.html', template: 'public/admin.html', chunks: ['runtime','vendors','common','admin'] })
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    devMiddleware: {
      // Forces webpack-dev-server to write the compiled files physically to the dist/ directory on your disk.
      writeToDisk: true
    },
    port: 8080,
    open: false
  }
};
