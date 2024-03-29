module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  extends: ['airbnb', 'airbnb-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  settings: {
    react: {
      version: '^18.2.0',
    },
  },
  rules: {
    quotes: ['error', 'single'],
    semi: [1, 'always'],
    'max-len': ['warn', { code: 120 }],
  },
  overrides: [
    {
      files: ['bin/*.js', 'lib/*.js', '*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        'linebreak-style': 'off',
        'no-alert': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'react/jsx-props-no-spreading': 'off',
        'jsx-quotes': [2, 'prefer-single'],
        'react/function-component-definition': [2, {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
        ],
      },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
