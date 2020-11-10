const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
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
      '@Component': path.resolve(__dirname, 'src/component'),
      '@Page': path.resolve(__dirname, 'src/page'),
      '@Public': path.resolve(__dirname, 'public'),
      '@Util': path.resolve(__dirname, 'src/util'),
      '@Api': path.resolve(__dirname, 'src/api'),
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
        // options: {
        // publicPath: '/public/',
        // name: '[name].[ext]?[hash]',
        // },
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
