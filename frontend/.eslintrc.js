module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-mixed-spaces-and-tabs': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-underscore-dangle': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'new-parens': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
