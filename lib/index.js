var _functions = require('./_functions.js');
var Action = require('./action.js');

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
 * Registers a function
 * @param {string}   name Function name
 * @param {function} func Function
 */
var registerFunction = function(name, func) {
  _functions[name] = func;
};

var h5 = module.exports = {
  action: createAction,
  register: registerFunction,
};
