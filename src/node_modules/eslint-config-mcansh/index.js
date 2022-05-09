module.exports = {
  extends: [
    'airbnb',
    'kentcdodds/possible-errors',
    'kentcdodds/best-practices',
    'kentcdodds/stylistic',
    'kentcdodds/es6',
    'kentcdodds/import',
    'kentcdodds/react',
    'kentcdodds/jsx-a11y',
    'kentcdodds/jest',
    './common.js',
    'prettier',
    'prettier/react',
  ],
  rules: {
    complexity: 'off',
    'one-var': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-underscore-dangle': ['error', { allow: ['__NEXT_DATA__'] }],

    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/extensions': ['error', 'never', { svg: 'always', json: 'always' }],
  },
};
