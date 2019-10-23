const path = require('path');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './script-1.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.html$/,
        loader: 'ng-cache-loader?prefix=[dir]/[dir]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
      }


    ] //loaders
  } //module

  //   mode: 'development'
};