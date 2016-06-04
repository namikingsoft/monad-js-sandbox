module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
  ],
  "rules": {
    "no-console": 0,
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
