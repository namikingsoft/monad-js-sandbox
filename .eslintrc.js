module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react",
    "flow-vars",
  ],
  "rules": {
    "func-names": 0,
    "no-console": 0,
    "no-underscore-dangle": 0,
    "flow-vars/define-flow-type": 1,
    "flow-vars/use-flow-type": 1,
  },
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true,
    "node": true,
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "src",
        ],
      },
    },
  },
};
