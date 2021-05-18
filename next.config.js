/* eslint-env node */

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    // Important: return the modified config
    return config;
  },
};
