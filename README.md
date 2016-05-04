# We.js paypal integration plugin

> This plugin add paypal SDK in your We.js project

## Installation

```sh
npm install --save we-plugin-paypal we-plugin-payment
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

## License

MIT license](https://github.com/wejs/we-core/blob/master/LICENSE.md).



