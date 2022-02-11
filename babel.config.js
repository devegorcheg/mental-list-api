// eslint-disable-next-line func-names, space-before-function-paren
module.exports = function (api) {
  api.cache(true);

  const presets = [["@babel/preset-env"], "@babel/preset-typescript"];

  const plugins = [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-object-rest-spread",
  ];

  return {
    presets,
    plugins,
  };
};