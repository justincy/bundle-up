// Generated by CoffeeScript 1.4.0
(function() {
  var rimraf;

  rimraf = require('rimraf');

  exports.beforeEach = function() {
    try {
      return rimraf.sync(__dirname + '/files/public/min');
    } catch (e) {

    }
  };

}).call(this);