const path = require('path');

module.exports = {
  extends: [
    './index.js',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {},
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'spaced-comment': ['error', 'always', { markers: ['/ <reference'] }],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: path.join(process.cwd(), 'tsconfig.json'),
      },
      rules: {
        'react/prop-types': 'off', // handled by using React.FC<Props>

        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^ignored',
            args: 'after-used',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.tsx'] }],
  },
};
