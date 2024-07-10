import globals from 'globals';
import pluginJs from '@eslint/js';
import babelParser from '@babel/eslint-parser';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          // your babel options
          presets: ['@babel/preset-env'],
        },
      },
    },
    rules: {
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      'no-process-env': 'off',
    },
    files: ['src/**/*.js'],
    ignores: ['**/*.config.js'],
  },
  pluginJs.configs.recommended,
];
