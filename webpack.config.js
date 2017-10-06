const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:3030/',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2'],
              plugins: ['react-hot-loader/babel'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles SASS to CSS
        }]
      },

    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'app')],
    extensions: ['.js', '.jsx'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
