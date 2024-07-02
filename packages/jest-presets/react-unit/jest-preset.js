module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: [
    "<rootDir>/test",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
    "<rootDir>/e2e"
  ],
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // 이 줄이 있는지 확인
  testEnvironment: "jsdom", // jsdom 환경을 지정
};