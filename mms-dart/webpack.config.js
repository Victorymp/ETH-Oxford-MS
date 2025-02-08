const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  resolve: {
    fallback: {
      "querystring": require.resolve("querystring-es3")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['file-loader']
      }
    ]
  },
  // other webpack configurations...
};