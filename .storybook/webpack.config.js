const path = require('path');

module.exports = ({ config }) => {
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');
  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ];
  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
  ];
  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main'];

  // Support absolute imports
  config.resolve.modules.push(path.resolve(__dirname, '../src'));

  // Support SVGs
  config.resolve.extensions.push('.svg');
  // Strip SVG from existing file loader
  config.module.rules = config.module.rules.map(data =>
    /svg\|/.test(String(data.test))
      ? {
          ...data,
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        }
      : data
  );
  // Add svg-react-loader, same loader the Gatsby plugin uses
  config.module.rules.push({
    test: /\.svg$/,
    exclude: /node_modules/,
    use: [{ loader: require.resolve('svg-react-loader') }],
  });

  return config;
};
