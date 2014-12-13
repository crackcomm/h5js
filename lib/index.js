var _functions = require('./_functions.js');
var Action = require('./action.js');
var cloud = require('./cloud.js');
var debug = require('./debug.js');

/**
 * Creates a new action
 * @param {string} name Function name
 * @param {object} args Function arguments
 * @return {Action}
 */
var createAction = function(name, args) {
  return new Action(name, args);
};

/**
 * Runs action
 * @param {object} action Action
 * @param {object} args   Action arguments
 * @return {Promise}
 */
var runAction = function(action, args) {
  return Action.prototype.run.call(action, args);
};

/**
 * Registers a function
 * @param {string}   name Function name
 * @param {function} func Function
 */
var registerFunction = function(name, func) {
  _functions[name] = func;
};

/**
 * Changes debug mode
 * @param {bool} on Debug enabled
 */
var debugMode = function(on) {
  debug.on = on;
};

var h5 = module.exports = {
  run: runAction,
  cloud: cloud,
  debug: debugMode,
  action: createAction,
  register: registerFunction
};
