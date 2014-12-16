var _functions = require('./_functions.js');
var assign = require('object-assign');
var uuid = require('node-uuid');
var debug = require('debug')('action');
var cloud = require('./cloud.js');

/**
 * Action class
 * @param {string} name Function name
 * @param {object} args Function arguments
 * @class
 */
function Action(name, args) {
  this.id = uuid.v4();
  this.function = {
    name: name,
    args: args
  };
}

/**
 * Creates next action
 * @param {string} name Function name
 * @param {object} args Function arguments
 * @return {Action}
 */
Action.prototype.action = function(name, args) {
  if (this.next) {
    this.next.action(name, args);
  } else {
    this.next = new Action(name, args);
  }
  return this;
};

/**
 * Runs action
 * @param {object} args Arguments
 * @param {bool} inCloud Runs in cloud when true
 */
Action.prototype.run = function(args, inCloud) {
  debug('RUN', this.id, (inCloud ? 'in cloud' : ''));

  if (inCloud) {
    return cloud.run(this.id, args);
  }

  args = args ? assign({}, this.function.args, args) : this.function.args;
  var result = _functions[this.function.name](args);

  if (this.next) {
    var next = this.next;
    return result.then(function(data) {
      return Action.prototype.run.call(next, data);
    });
  }

  return result;
};

/**
 * Saves action in cloud
 * @return {Promise}
 */
Action.prototype.save = function() {
  return cloud.save(this);
};

/**
 * Prints action to console
 */
Action.prototype.print = function() {
  console.log(JSON.stringify(this.JSON(), 0, 2));
};

/**
 * Returns object stripped from hidden values
 * @return {object}
 */
Action.prototype.JSON = function() {
  var obj = {
    id: this.id,
    function: this.function
  };

  if (this.next) {
    obj.next = Action.prototype.JSON.call(this.next);
  }

  return obj;
};

module.exports = Action;
