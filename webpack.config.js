const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const PUBLIC_PATH = 'assets'

module.exports = function (opts) {
  opts = opts || {}
  return {
    mode: 'none',
    entry: {
      polyfills: './src/polyfills.js',
      index: './src/index.js'
    },
    output: {
      filename: '[name].[hash].js',
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
    optimization: {
      noEmitOnErrors: true,
      concatenateModules: true,
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCssAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.less$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
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
          type: 'javascript/auto',
          test: /\.json$/,
          loader: 'file-loader',
          options: {
            name: `${PUBLIC_PATH}/[name].[ext]`
          }
        }
      ]
    },
    plugins: [
      // new BundleAnalyze(),
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
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new ImageminPlugin({
        pngquant: {
          quality: '95-100'
        }
      })
    ]
  }
}
