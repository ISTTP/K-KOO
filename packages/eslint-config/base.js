module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "quotes": ["error", "single"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        singleQuote: true
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeAlias",  // 타입선언
        format: ["PascalCase"],
      },
      {
        selector: "memberLike",  // Property 멤버
        format: ["camelCase"],
      },
      {
        selector: "function",  // function
        format: ["camelCase"],
      },
      {
        selector: "variable",  // 변수
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: "parameter",  // 파라미터
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "enumMember",  // enum
        format: ["UPPER_CASE"],
      },
    ],
  },
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
};
