# inject-config-loader

[![Build Status](https://travis-ci.org/tinkerscript/inject-config-loader.svg?branch=master)](https://travis-ci.org/tinkerscript/inject-config-loader)

inject config into webpack bundle

## Install
```bash
yarn add -D inject-config-loader
```

## Usage
```javascript
// webpack.config.js

module.exports = {
  // ...
  resolve: {
    alias: {
      config: path.join(__dirname, 'source/dummy.config')
    }
  },
  module: {
    rules: [
      {
        test: /\.config$/,
        use: [
          {
            loader: 'inject-config-loader',
            options: {
              field: 'front',
              watch: true // for live-reloading; default is false
            }
          }
        ]
      }
    ]
  },
  // ...
}
```


See sample webpack.config.js in [demo folder](https://github.com/tinkerscript/inject-config-loader/tree/master/demo).
