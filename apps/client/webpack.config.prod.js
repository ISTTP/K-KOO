const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 244_000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](sentry|react-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 0.9%, not dead',
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  regenerator: true,
                },
              ]
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: path.resolve(__dirname, 'public', 'favicon.png'),
    }),
    new Dotenv({
      path: './.env',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'firebase-messaging-sw.js'),
          to: '',
        },
      ],
    })
  ],
};
