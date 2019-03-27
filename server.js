const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-server');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const path = require('path');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const server = new webpackDevMiddleware(compiler,
  {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    port: 9090,
    host: "0.0.0.0",
    publicPath: "/",
  }
);

// Serve the files on port 3000.
server.listen(9090, 'localhost', function (err) {
  if (err) throw err
});