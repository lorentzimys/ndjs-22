/* eslint-disable */
module.exports = {
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "max-len": ["warn", { "code": 120 }]
    }
}
