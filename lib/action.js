var _functions = require('./_functions.js');
var assign = require('object-assign');
var uuid = require('node-uuid');

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
  if (this._next) {
    this._next.action(name, args);
  } else {
    var action = new Action(name, args);
    action._parent = this;
    this.next = action.id;
    this._next = action;
  }
  return this;
};

/**
 * Runs action
 * @param {object} args Arguments
 */
Action.prototype.run = function(args) {
  args = args ? assign({}, this.function.args, args) : this.function.args;
  var result = _functions[this.function.name](args);

  if (this._next) {
    var _next = this._next;
    return result.then(function(data) {
      return _next.run(data);
    });
  }

  return result;
};

/**
 * TODO
 * Saves action
 * @return {Action} this
 */
Action.prototype.save = function() {
  return this;
};

/**
 * Prints action to console
 */
Action.prototype.print = function() {
  console.log(this.JSON());
};

/**
 * Returns object stripped from hidden values
 * @return {object}
 */
Action.prototype.JSON = function() {
  var obj = {
    id: this.id,
    function: this.function,
  };

  if (this._next) {
    obj.next = this._next.JSON();
  }

  return obj;
};

module.exports = Action;
