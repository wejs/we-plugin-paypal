var assert = require('assert');
var path = require('path');
var sinon = require('sinon');
var request = require('supertest');
var testTools = require('we-test-tools');
var helpers = require('we-test-tools').helpers;
var stubs = require('we-test-tools').stubs;
var http;
var we;
var paypal;
var agent;

describe('we-plugin-paypalFeature', function() {
  var salvedUser, salvedUserPassword, authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);

    we = helpers.getWe();

    paypal = we.plugins.project.paypal;

    var userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err) {
        done(err);
      });
    })
  });

  describe('bootstrap', function () {
    it ('app should log in bootstrap if not have the paypal configs', function (done) {
      var We = require('we-core');
      var we = new We();

      sinon.spy(we.log, 'warn');

      testTools.init({}, we);

      we.bootstrap({
        i18n: {
          directory: path.join(__dirname,'../../', 'locales'),
          updateFiles: false
        }
      } , function (err, we) {
        if (err) throw err;
        assert(we.log.warn.called);
        assert(we.log.warn.calledWith('we-plugin-paypal: Paypal apiKey configuration not found'));

        done();
      });
    });

    it ('app should configure the paypal api with we.config.apikeys.paypal settings', function (done) {

      assert.equal(paypal.configuration.mode, we.config.apiKeys.paypal.mode);
      assert.equal(paypal.configuration.client_id, we.config.apiKeys.paypal.client_id);
      assert.equal(paypal.configuration.client_secret, we.config.apiKeys.paypal.client_secret);

      done();
    });
  });

  describe('paypal account payment', function() {
    it('pay with paypal account should pay with valid data', function (done) {
      // order how will be payd, mey be one product or service
      var order = {
        id: 10, // unique orderId
        description: 'Simple test for pay with paypal account should pay with valid data',
        amount: {
          currency: 'USD',
          total: 1, // $1 dolar
        }
      };

      var paypalPayment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        'redirect_urls': {
          return_url: we.config.hostname + '/test/return/order/'+order.id,// success
          cancel_url: we.config.hostname + '/test/cancel/order/'+order.id,// error
        },
        transactions: []
      };
      // add the order and only with valid fields
      paypalPayment.transactions.push({
        description: order.description,
        amount: {
          currency: order.amount.currency,
          total: order.amount.total, // $1 dolar
        }
      });

      paypal.payment.create(paypalPayment, {}, function afterCreateThePayment(err, resp) {
        if (err) {
          console.error(err, resp);
          return done(err);
        }

        assert(resp.id);
        assert.equal(resp.intent, 'sale');
        assert.equal(resp.state, 'created');
        assert.equal(resp.httpStatusCode, 201);

        assert.equal(resp.payer.payment_method, 'paypal');

        assert.equal(resp.links[0].rel, 'self');
        assert.equal(resp.links[1].rel, 'approval_url');
        assert.equal(resp.links[2].rel, 'execute');

        done();
      });
    });
  })

});