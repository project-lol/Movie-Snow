const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const EsLintPlugin = require("eslint-webpack-plugin")

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new EsLintPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 9000,
    open: true,
    historyApiFallback: true, // SPA에서 404 에러가 발생할 때 index.html로 리다이렉트
  },
  module: {
    rules: [
      /*
        1. js와 jsx 확장자를 가진 파일을 찾는다.
        2. src 폴더 내에 있는 파일만 babel-loader를 통해 변환한다.
        3. node_modules 폴더 내에 있는 파일은 babel-loader를 통해 변환하지 않는다.
        4. babel-loader를 통해 변환할 때, @babel/preset-env와 @babel/preset-react를 사용한다.
        */
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                "@babel/preset-react",
              ],
            },
          },
          {
            loader: "eslint-loader",
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          /*
          1. postcss-loader를 통해 css를 변환한다.
          2. postcss-preset-env를 통해 css를 변환한다.
          3. postcss-preset-env는 autoprefixer를 포함하고 있어서,
          css를 변환할 때, 브라우저 호환성을 고려하여 prefix를 자동으로 붙여준다.
          */
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}
