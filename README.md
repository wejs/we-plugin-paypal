# We.js paypal integration plugin

[![Build Status](https://travis-ci.org/wejs/we-plugin-paypal.svg?branch=master)](https://travis-ci.org/wejs/we-plugin-paypal)
[![Dependency Status](https://david-dm.org/wejs/we-plugin-paypal.png)](https://david-dm.org/wejs/we-plugin-paypal)
[![Coverage Status](https://coveralls.io/repos/github/wejs/we-plugin-paypal/badge.svg?branch=master)](https://coveralls.io/github/wejs/we-plugin-paypal?branch=master)

Add paypal SDK in your We.js project

## Installation

```sh
we i-we-plugin-paypal
```

## Configuration

### 1. First get client_id and client_secret in paypal:

Configure and get your keys in: https://developer.paypal.com/

### 2. In: [project]/config/local.js

```js
    // ...
    apiKeys: {
      paypall: {
        mode: 'sandbox', //sandbox or live
        'client_id': 'yourPaypalClientId',
        'client_secret': 'yourPaypalClientSecret',
      }
    },  
    // other configs ...
```


## Links

> * We.js site: http://wejs.org

## NPM Info:
[![NPM](https://nodei.co/npm/we-plugin-event.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/we-plugin-event/)

## License

MIT license](https://github.com/wejs/we-core/blob/master/LICENSE.md).



