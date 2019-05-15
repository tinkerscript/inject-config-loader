const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'none',
  context: __dirname,
  entry: './source',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  devtool: 'source-map',
  devServer: {
    noInfo: true,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: false
    })
  ],
  resolve: {
    alias: {
      config: path.join(__dirname, 'source/dummy.config')
    }
  },
  module: {
    rules: [
      {
        test: /\.config$/,
        use: [
          {
            loader: 'inject-config-loader',
            options: {
              field: 'front',
              cache: false // for development
            }
          }
        ]
      }
    ]
  }
}
