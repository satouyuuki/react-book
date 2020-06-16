module.exports = {
  mode: "development",
  entry: "./src/main.js",
  devServer: {
    contentBase: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env",
                // ReactのJSXを解釈
                "@babel/react"
              ]
            }
          }
        ]
      }
    ]
  }
}