const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  mode: 'development',
  entry: './src/index.ts',

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug",
      filename: 'index.html',
    }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin({
      output: {
        path: path.resolve(process.cwd(), 'dist'),
      }
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new CopyPlugin([
      { from: 'src/dist/', to: './'},
    ]),
  ],

  module: {
    rules: [
      {
        test: /.(js)?$/,
        loader: 'file-loader',
        include: [],
        exclude: [/node_modules/]
      },
      {
        test: /.(ts|tsx)?$/,
        loader: 'ts-loader',
        include: [],
        exclude: [/node_modules/]
      },
      {
        test: /.(css)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            publicPath: '/',
          }
        },
        'extract-loader',
        {
          loader: "css-loader",
          options: {
            sourceMap: false
          }
        }
        ]
      },
      {
        test: /.(less)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'main.css',
            esModule: false,
            publicPath: '/',
          }
        },
        'extract-loader',
        {
          loader: "css-loader",
          options: {
            sourceMap: false
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /.pug$/,
        use: [
          'pug-loader'
        ]
      },
      {
        test: /\.(svg|jpg|woff(2)?|ttf|eot)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/[hash].[ext]',
            esModule: false,
            publicPath: '/'
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  optimization: {
    minimizer: [new TerserPlugin()],
  }
}
