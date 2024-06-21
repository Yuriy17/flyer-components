import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    rules: {
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
    },
    files: ['src/**/*.js'],
    // ignores: ['dist/**/*.js', 'node_modules/**/*.js'],
    // env: {
    //   browser: true,
    //   es2021: true,
    // },
    // extends: 'eslint:recommended',
  },
  pluginJs.configs.recommended,
];