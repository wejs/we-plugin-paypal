/**
 * Plugin.js file, main paypal integration plugin file
 *
 * see http://wejs.org/docs/we/plugin
 */

var paypal = require('paypal-rest-sdk');

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  plugin.paypal = paypal;
  // set plugin configs
  plugin.setConfigs({
    apiKeys: {
      paypall: {
        mode: 'sandbox', //sandbox or live
        'client_id': null,
        'client_secret': null,
      }
    },
    paypal: {}
  });

  // set plugin routes
  // plugin.setRoutes({
  // });

  plugin.events.on('we:after:load:plugins', function afterLoadAllPlugins(we) {
    // set paypal configuration after load all plugins
    if (we.config.apiKeys.paypal && we.config.apiKeys.paypal.client_id && we.config.apiKeys.paypal.client_secret) {
      paypal.configure(we.config.apiKeys.paypal);
    } else {
      we.log.warn('we-plugin-paypal: Paypal apiKey configuration not found');
    }
  });

  return plugin;
};