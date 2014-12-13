/*
 * Basic functions for testing purposes
 */

var h5 = require('../lib/index.js');
var Promise = require('promise');
var request = require('request');
var cheerio = require('cheerio');

var httpRequest = function(args) {
  return new Promise(function(resolve, reject) {
    request({url: args.url}, function(err, response, body) {
      if (err) {
        reject(err);
      } else {
        resolve({
          body: body
        });
      }
    });
  });
};

var htmlExtract = function(args) {
  var body = args.body;
  var selectors = args.selectors;
  return new Promise(function(resolve) {
    var $ = cheerio.load(body, { normalizeWhitespace: true });
    var results = {};
    for (var key in selectors) {
      var selector = selectors[key];
      results[key] = $(selector).text();
    }
    resolve(results);
  });
};

h5.register('http.request', httpRequest);
h5.register('html.extract', htmlExtract);
