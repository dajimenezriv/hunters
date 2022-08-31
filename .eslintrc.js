module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'prettier',
  ],
  rules: {
    indent: 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['error', { code: 140 }],
    'react/jsx-closing-bracket-location': 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'no-use-before-define': 'off',
    'react/no-unstable-nested-components': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
  },
};
