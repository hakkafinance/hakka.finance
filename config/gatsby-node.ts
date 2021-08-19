const webpack = require('webpack');
const path = require('path');
import { REWARD_POOLS, BSC_REWARD_POOLS } from '../src/constants/rewards';

module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: [require.resolve('buffer/'), 'Buffer'],
      })
    ],
    resolve: {
      fallback: {
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert/'),
      }
    }
  })
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const poolTemplate = path.resolve(`./src/templates/pool.tsx`);
  Object.keys({ ...REWARD_POOLS, ...BSC_REWARD_POOLS }).forEach(pool => {
    createPage({
      path: `/farms/${pool}`,
      component: poolTemplate,
      context: {
        pool: pool,
      },
    });
  });
}
