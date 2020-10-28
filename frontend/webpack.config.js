const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/',
    overlay: true,
    stats: 'errors-only',
    historyApiFallback: true,
    hot: true,
    port: 4000,
  },
  resolve: {
    alias: {
      '@Example': path.resolve(__dirname, 'src/example'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: './public/',
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyURLs: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
  ],
}
