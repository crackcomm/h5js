var Promise = require('promise');
var request = require('request');
var debug = require('debug')('cloud');
var url = require('url');

var cloud = module.exports = {
  url: null
};

/**
 * Sends POST request with JSON body
 * @param {string} url
 * @param {object} body
 */
function postJSON(url, body) {
  return new Promise(function(resolve, reject) {
    var options = {
      url: url,
      json: true,
      body: (body ? JSON.stringify(body) : ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    request(options, function(err, response, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

/**
 * Sets action cloud URL
 * @param {string} url cloud url
 */
cloud.set = function(url) {
  cloud.url = url;
};

/**
 * Saves action in cloud
 * @param {Action} action
 */
cloud.save = function(action) {
  if (cloud.url) {
    var _url = url.resolve(cloud.url, 'action/store');
    debug('SAVE', _url + '/' + action.id);
    return postJSON(_url, action.JSON());
  } else {
    return Promise.reject(new Error('Action cloud URL is not set'));
  }
};

/**
 * Runs action in cloud
 * @param {string} id Action ID
 * @return {Promise}
 */
cloud.run = function(id, args) {
  if (cloud.url) {
    var _url = url.resolve(cloud.url, 'action/run/') + id;
    debug('RUN', _url);
    return postJSON(_url, args);
  } else {
    return Promise.reject(new Error('Action cloud URL is not set'));
  }
};
