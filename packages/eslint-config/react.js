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
  rules: {
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react-hooks/exhaustive-deps": "off",
  },
}
