const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('POST /api/translate', function() {
    
        test('Translation with text and locale fields', function(done) {
            chai
            .request(server)
            .post('/api/translate')
            .send({
              text: 'I ate yogurt for breakfast.',
              locale: 'american-to-british'
            })
            
            .end(function(err, res) {
              if (err) return done(err);
              assert.isObject(res.body, 'Response should be an object');
              assert.property(res.body, 'text', 'Response should contain the text');
              assert.property(res.body, 'translation', 'Response should contain the translation');
              assert.equal(res.body.text, 'I ate yogurt for breakfast.');
              assert.equal(res.body.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
              done();
            });
        });
        
        test('Translation with text and invalid locale field', function(done) {
            chai
          .request(server)
            .post('/api/translate')
            .send({
              text: 'I ate yogurt for breakfast.',
              locale: 'invalid-locale'
            })
            
            .end(function(err, res) {
              if (err) return done(err);
              assert.isObject(res.body, 'Response should be an object');
              assert.property(res.body, 'error', 'Response should contain an error');
              assert.equal(res.body.error, 'Invalid value for locale field');
              done();
            });
        });
        
        test('Translation with missing text field', function(done) {
            chai
          .request(server)
            .post('/api/translate')
            .send({
              locale: 'american-to-british'
            })
            
            .end(function(err, res) {
              if (err) return done(err);
              assert.isObject(res.body, 'Response should be an object');
              assert.property(res.body, 'error', 'Response should contain an error');
              assert.equal(res.body.error, 'Required field(s) missing');
              done();
            });
        });
        
        test('Translation with missing locale field', function(done) {
            chai
          .request(server)
            .post('/api/translate')
            .send({
              text: 'I ate yogurt for breakfast.'
            })
            
            .end(function(err, res) {
              if (err) return done(err);
              assert.isObject(res.body, 'Response should be an object');
              assert.property(res.body, 'error', 'Response should contain an error');
              assert.equal(res.body.error, 'Required field(s) missing');
              done();
            });
        });
        
        test('Translation with empty text', function(done) {
            chai
          .request(server)
            .post('/api/translate')
            .send({
              text: '',
              locale: 'american-to-british'
            })
            
            .end(function(err, res) {
              if (err) return done(err);
              assert.isObject(res.body, 'Response should be an object');
              assert.property(res.body, 'error', 'Response should contain an error');
              assert.equal(res.body.error, 'No text to translate');
              done();
            });
        });
        
        test('Translation with text that needs no translation', function(done) {
            chai
          .request(server)
            .post('/api/translate')
            .send({
              text: 'Hello.',
              locale: 'american-to-british'
            })
            
            .end(function(err, res) {
              if (err) return done(err);
              assert.isObject(res.body, 'Response should be an object');
              assert.property(res.body, 'text', 'Response should contain the text');
              assert.property(res.body, 'translation', 'Response should contain the translation');
              assert.equal(res.body.text, 'Hello.');
              assert.equal(res.body.translation, 'Everything looks good to me!');
              done();
            });
        });
      });
});
