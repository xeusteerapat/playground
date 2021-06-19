const pkg = require('./package.json');

module.exports = {
  presets: [
    [
      // @babel/preset-typescript if you're using Typescript
      '@babel/preset-env',
      {
        targets: {
          node: pkg.engines.node,
        },
      },
    ],
  ],
};
