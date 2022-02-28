module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    eqeqeq: 0,
  },
};
