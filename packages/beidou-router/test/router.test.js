'use strict';

const path = require('path');
const fs = require('fs');
const request = require('supertest');
const mm = require('egg-mock');
// const chai = require('chai');
// const rimraf = require('rimraf');

// const expect = chai.expect;
const framework = path.join(__dirname, '../../beidou-core/');
const plugin = 'router';

describe('test/router.test.js', () => {
  describe('use default router config', () => {
    let app;
    before((done) => {
      app = mm.app({
        baseDir: './basic',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should response ok for path /', (done) => {
      request(app.callback())
        .get('/')
        .expect(200, done);
    });

    it('should response ok for path /foo', (done) => {
      request(app.callback())
        .get('/foo')
        .expect(200, done);
    });

    it('should response ok for path /foo?bar=bar', (done) => {
      request(app.callback())
        .get('/foo?bar=bar')
        .expect(200, done);
    });

    it('should response ok for path /foo/bar', (done) => {
      request(app.callback())
        .get('/foo/bar')
        .expect(200, done);
    });

    it('should response 404 for path /_exclude', (done) => {
      request(app.callback())
        .get('/_exclude')
        .expect(404, done);
    });

    it('should response 404 for path /_exclude/bar', (done) => {
      request(app.callback())
        .get('/_exclude/bar')
        .expect(404, done);
    });

    it('should response 404 for path /file/_bar', (done) => {
      request(app.callback())
        .get('/file/_bar')
        .expect(404, done);
    });

    it('should search file first for path /file', (done) => {
      request(app.callback())
        .get('/file')
        .expect(200)
        .expect('<!DOCTYPE html><span>file</span>', done);
    });

    it('should response ok for path / and cache', (done) => {
      request(app.callback())
        .get('/')
        .expect(200, done);
    });
  });

  describe("set `router.root = '/about'`", () => {
    let app;
    before((done) => {
      app = mm.app({
        baseDir: './root',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should response 404 for path /about', (done) => {
      request(app.callback())
        .get('/about')
        .expect(404, done);
    });

    it('should response ok for path /', (done) => {
      request(app.callback())
        .get('/')
        .expect(200, done);
    });

    it('should response 404 for path /bar', (done) => {
      request(app.callback())
        .get('/bar')
        .expect(404, done);
    });

    it('should response ok for path /foo', (done) => {
      request(app.callback())
        .get('/foo')
        .expect(200, done);
    });

    it('should response ok for path /foo/bar', (done) => {
      request(app.callback())
        .get('/foo/bar')
        .expect(200, done);
    });
  });

  describe("set `router.urlPrefix = '/about'`", () => {
    let app;
    before((done) => {
      app = mm.app({
        baseDir: './prefix',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should response 404 for path /', (done) => {
      request(app.callback())
        .get('/')
        .expect(404, done);
    });

    it('should response 404 for path /bar', (done) => {
      request(app.callback())
        .get('/bar')
        .expect(404, done);
    });

    it('should response ok for path /about', (done) => {
      request(app.callback())
        .get('/about')
        .expect(200, done);
    });

    it('should response ok for path /about/about', (done) => {
      request(app.callback())
        .get('/about/about')
        .expect(200, done);
    });

    it('should response ok for path /about/foo/bar', (done) => {
      request(app.callback())
        .get('/about/foo/bar')
        .expect(200, done);
    });
  });

  describe("set `router.exclude = '*-*'`", () => {
    let app;
    before((done) => {
      app = mm.app({
        baseDir: './exclude',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should response 404 for path /foo-bar', (done) => {
      request(app.callback())
        .get('/foo-bar')
        .expect(404, done);
    });

    it('should response ok for path /foo', (done) => {
      request(app.callback())
        .get('/foo')
        .expect(200, done);
    });
  });

  describe("set `router.mapping = { about: 'get', login: ['get', 'post']}`", () => {
    let app;
    before((done) => {
      app = mm.app({
        baseDir: './mapping',
        plugin,
        framework,
      });
      app.ready(done);
    });

    after(() => {
      app.close();
    });

    afterEach(mm.restore);

    it('should response 404 for path /foo which not in mapping', (done) => {
      request(app.callback())
        .get('/foo')
        .expect(404, done);
    });

    it('should response ok for path GET:/about', (done) => {
      request(app.callback())
        .get('/about')
        .expect(200, done);
    });

    it('should response ok for path GET:/login', (done) => {
      request(app.callback())
        .get('/login')
        .expect(200, done);
    });

    it('should response ok for path POST:/login', (done) => {
      request(app.callback())
        .post('/login')
        .expect(200, done);
    });
  });
});
