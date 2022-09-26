const path = require('path');
const slsw = require('serverless-webpack');
// var nodeExternals = require('webpack-node-externals')

//module.exports = {
//  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
//  entry: slsw.lib.entries,
//  // externals: [nodeExternals()],
//  devtool: 'source-map',
//  resolve: {
//    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
//  },
//  output: {
//    libraryTarget: 'commonjs',
//    path: path.join(__dirname, '.webpack'),
//    filename: '[name].js',
//  },
//  target: 'node',
//  module: {
//    rules: [
//      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
//      { test: /\.tsx?$/, use: 'ts-loader' },
//    ],
//  },
//};



// webpack.config.js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  devtool: 'source-map',
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        // add transpileOnly option if you use ts-loader < 9.3.0
         options: {
           transpileOnly: true
         }
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
};
