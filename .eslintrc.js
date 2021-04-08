/* eslint-env node */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  plugins: [],
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  rules: {
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    // Next.js imports React for us.
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project).
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
      // Disable mandatory prop types in TS files since types in React.FC<T> cannot be inferred.
      rules: {
        'react/prop-types': 'off',
      },
    },
    // Allow {} as a type in components.
    // See https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
    {
      files: '*.tsx',
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
            },
          },
        ],
      },
    },
    {
      // Let ESLint know about various globals used in test files.
      files: ['*.test.{js,jsx,ts,tsx}'],
      globals: {
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
      },
    },
  ],
};
