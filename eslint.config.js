import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.config({
    extends: [
      'eslint:recommended',
    ],
  }),
  tseslint.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }),
]; 