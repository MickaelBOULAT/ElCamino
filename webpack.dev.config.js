const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const PUBLIC_PATH = 'assets'

module.exports = function (opts) {
  opts = opts || {}
  return {
    mode: 'development',
    entry: {
      polyfills: './src/polyfills.js',
      index: './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@connector$': path.resolve(__dirname, 'src/connector.js'),
        '@constants$': path.resolve(__dirname, 'src/constants.js'),
        '@css': path.resolve(__dirname, 'src/css/'),
        '@stores': path.resolve(__dirname, 'src/stores/')
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                globalVars: opts.lessVars || {},
                javascriptEnabled: true,
                paths: [path.resolve(__dirname, 'src', 'css')]
              }
            }
          ]
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader'
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /(node_modules)/,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.(png|jpe?g|otf|ttf|woff|woff2)(\?.*)?$/,
          loader: 'file-loader',
          include: path.resolve(__dirname, 'src/assets'),
          options: {
            name: `${PUBLIC_PATH}/[hash].[ext]`
          }
        },
        {
          test: /\.json$/,
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            name: `${PUBLIC_PATH}/[name].[ext]`
          }
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      }),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
