
var debug = module.exports = {
  on: false
};

/**
 * Logs if debug is enabled
 * @param {string} log
 */
debug.log = function() {
  if (debug.on) {
    console.log.apply(null, arguments);
  }
};
