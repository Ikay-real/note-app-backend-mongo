module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021, // Or the ECMAScript version you're targeting
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0
  },
};
