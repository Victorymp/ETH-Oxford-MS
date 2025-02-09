// craco.config.js
module.exports = {
  webpack: {
      configure: (webpackConfig) => {
          webpackConfig.resolve.fallback = {
              querystring: require.resolve('querystring-es3'),
          };
          return webpackConfig;
      },
  },
};
