/* eslint-disable */
module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "tsconfigRootDir": __dirname,
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "max-len": ["warn", { "code": 120 }]
  }
}
