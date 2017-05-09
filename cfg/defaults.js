/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const modulesPath = path.join(__dirname, '/../node_modules');
const dfltPort = 7000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: srcPath,
        exclude: modulesPath
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax',
        include: srcPath,
        exclude: modulesPath
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
        include: srcPath,
        exclude: modulesPath
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader',
        include: srcPath,
        exclude: modulesPath
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: srcPath,
        exclude: modulesPath
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader',
        include: srcPath,
        exclude: modulesPath
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
