module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'computed-property-spacing': [2, 'never'],
    'curly': [2, 'all'],
    'eqeqeq': [2, 'allow-null'],
    'quotes': 0,
    'semi': [2, 'always'],
    'no-tabs': 0,
    'no-return-assign': 0,
    'space-in-parens': [0, 'always'],
    'space-before-function-paren': [0, 'always'],
    'no-extend-native': 0,
    'no-useless-escape': 0,
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'none'
    }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
