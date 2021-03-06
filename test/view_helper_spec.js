// Generated by CoffeeScript 1.4.0
(function() {
  var BundleUp, Css, Js, expect, express, fs, helper, request;

  expect = require('expect.js');

  BundleUp = require('./../index');

  Js = require('./../lib/js');

  Css = require('./../lib/css');

  helper = require('./helper');

  fs = require('fs');

  express = require('express');

  request = require('request');

  describe('View Helper', function() {
    beforeEach(function() {
      this.app = express.createServer();
      this.app.set('views', __dirname + '/views');
      this.bundle = BundleUp(this.app, __dirname + '/files/assets_namespaced.coffee', {
        staticRoot: __dirname + '/files/public/',
        staticUrlRoot: '/',
        bundle: true
      });
      this.app.get('/globalJs', function(req, res) {
        return res.render('globalJs.jade', {
          layout: false
        });
      });
      this.app.get('/globalJs/custom_namespaceJs', function(req, res) {
        return res.render('globalAndCustomJs.jade', {
          layout: false
        });
      });
      this.app.get('/custom_namespaceJs', function(req, res) {
        return res.render('customJs.jade', {
          layout: false
        });
      });
      this.app.get('/globalCss', function(req, res) {
        return res.render('globalCss.jade', {
          layout: false
        });
      });
      this.app.get('/globalJs/printNamespaceCss', function(req, res) {
        return res.render('globalAndPrintCss.jade', {
          layout: false
        });
      });
      this.app.get('/print_namespaceCss', function(req, res) {
        return res.render('printCss.jade', {
          layout: false
        });
      });
      return this.app.listen(1338);
    });
    afterEach(function() {
      return this.app.close();
    });
    describe('renderJs', function() {
      it('should render the global.js bundle', function(done) {
        var _this = this;
        return request.get('http://localhost:1338/globalJs', function(err, res) {
          expect(_this.bundle.js.files[0].namespace).to.equal('global');
          expect(res.body).to.contain(_this.bundle.js.files[0].url);
          expect(res.body).to.not.contain(_this.bundle.js.files[1].url);
          return done();
        });
      });
      it('should render the global.js and the custom_namespace.js bundle', function(done) {
        var _this = this;
        return request.get('http://localhost:1338/globalJs/custom_namespaceJs', function(err, res) {
          expect(_this.bundle.js.files[0].namespace).to.equal('global');
          expect(_this.bundle.js.files[1].namespace).to.equal('custom_namespace');
          expect(res.body).to.contain(_this.bundle.js.files[0].url);
          expect(res.body).to.contain(_this.bundle.js.files[1].url);
          return done();
        });
      });
      return it('should only render the custom_namespace.js bundle', function(done) {
        var _this = this;
        return request.get('http://localhost:1338/custom_namespaceJs', function(err, res) {
          expect(_this.bundle.js.files[1].namespace).to.equal('custom_namespace');
          expect(res.body).to.contain(_this.bundle.js.files[1].url);
          expect(res.body).to.not.contain(_this.bundle.js.files[0].url);
          return done();
        });
      });
    });
    return describe('renderStyles', function() {
      it('should render the global.css bundle', function(done) {
        var _this = this;
        return request.get('http://localhost:1338/globalCss', function(err, res) {
          expect(_this.bundle.js.files[0].namespace).to.equal('global');
          expect(res.body).to.contain(_this.bundle.js.files[0].url);
          expect(res.body).to.not.contain(_this.bundle.js.files[1].url);
          return done();
        });
      });
      it('should render the global.css and the print_namespace.css bundle', function(done) {
        var _this = this;
        return request.get('http://localhost:1338/globalJs/printNamespaceCss', function(err, res) {
          expect(_this.bundle.css.files[0].namespace).to.equal('global');
          expect(_this.bundle.css.files[1].namespace).to.equal('print_namespace');
          expect(res.body).to.contain(_this.bundle.css.files[0].url);
          expect(res.body).to.contain(_this.bundle.css.files[1].url);
          return done();
        });
      });
      return it('should only render the print_namespace.css bundle', function(done) {
        var _this = this;
        return request.get('http://localhost:1338/print_namespaceCss', function(err, res) {
          expect(_this.bundle.css.files[1].namespace).to.equal('print_namespace');
          expect(res.body).to.contain(_this.bundle.css.files[1].url);
          expect(res.body).to.not.contain(_this.bundle.css.files[0].url);
          return done();
        });
      });
    });
  });

}).call(this);
