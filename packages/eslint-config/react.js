module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    "./base.js",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  //https://github.com/jsx-eslint/eslint-plugin-react#configuration
  settings: {
    react: {
      version: "detect",
    },
  },
}