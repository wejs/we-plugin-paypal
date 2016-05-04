var projectPath = process.cwd();
var deleteDir = require('rimraf');
var testTools = require('we-test-tools');
var path = require('path');
var we;

before(function(callback) {
  this.slow(100);

  testTools.copyLocalConfigIfNotExitst(projectPath, function() {
    var We = require('we-core');
    we = new We();

    testTools.init({}, we);

    we.bootstrap({
      i18n: {
        directory: path.join(__dirname, 'locales'),
        updateFiles: true
      },
      apiKeys: {
        paypal: {
          // test key in sandbox env
          'mode': 'sandbox',
          'client_id' : 'AVkVP80M858Fd3W9CpBmks8pNGkXtU7Im83Wj5ON7BDQVwpwkQbhAQ9ipfxZwt7qa2l3YxQ_V4UZIlLE',
          'client_secret' : 'EGREvrq49gdO0LQL6WDm_GMro7vb4NNFPg37846MrhW6FlxWmmm4qMV3IHr3L5plsj9WgS1XmTmJEPkM'
        }
      }
    } , function(err, we) {
      if (err) throw err;

      we.startServer(function(err) {
        if (err) throw err;
        callback();
      });
    });
  });
});

//after all tests
after(function (callback) {
  we.db.defaultConnection.close();

  var tempFolders = [
    projectPath + '/files/tmp',
    projectPath + '/files/config',
    projectPath + '/files/sqlite',

    projectPath + '/files/public/min',

    projectPath + '/files/public/project.css',
    projectPath + '/files/public/project.js',
    projectPath + '/config/local.js',
  ];

  we.utils.async.each(tempFolders, function(folder, next){
    deleteDir( folder, next);
  }, function(err) {
    if (err) throw new Error(err);
    callback();
  })

});