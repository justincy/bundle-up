// Generated by CoffeeScript 1.4.0
(function() {
  var Bundle, Css, cleanCss, fs, os, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  cleanCss = require('clean-css');

  Bundle = require('./bundle');

  fs = require('fs');

  os = require('os');

  path = require('path');

  Css = (function(_super) {

    __extends(Css, _super);

    function Css(options) {
      this.options = options;
      this.fileExtension = '.css';
      Css.__super__.constructor.apply(this, arguments);
    }

    Css.prototype.minify = function(code) {
      var filename;
      if (!this.options.minifyCss) {
        return code;
      }
      try {
        return cleanCss.process(code, {
          keepSpecialComments: 0
        });
      } catch (err) {
        filename = path.resolve(os.tmpDir(), 'tmpcss.css');
        fs.writeFileSync(filename, code);
        console.error("CSSO", err, "temporary file at: ", filename);
        return process.exit();
      }
    };

    Css.prototype.render = function(namespace) {
      var file, style, _i, _len, _ref;
      style = '';
      _ref = this.files;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.namespace === namespace) {
          style += "<link href='" + file.url + "' rel='stylesheet' type='text/css'/>";
        }
      }
      return style;
    };

    Css.prototype._convertFilename = function(filename) {
      var splitted;
      splitted = filename.split('.');
      return splitted.splice(0, splitted.length - 1).join('.') + '.css';
    };

    return Css;

  })(Bundle);

  module.exports = Css;

}).call(this);
