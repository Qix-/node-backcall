/**
 * BACKCALL
 * Reverse your callback order
 *
 * To use (javascript):
 *
 *    var backcall = require('backcall');
 *    var async = backcall(require('async'));
 *
 * To use (coffeescript):
 *
 *    backcall = require 'backcall'
 *    async = backcall require 'async'
 */

module.exports = function BackCall(prefix, module) {
  'use strict';

  if (prefix && !module) {
    module = prefix;
    prefix = 'r';
  }

  if (module && module.prototype) {
    for (var key in module.prototype) {
      if (module.prototype.hasOwnProperty(key) &&
          module.prototype[key] instanceof Function &&
          !(module.prototype[prefix + key])) {
        (function(fn, prefix, key) {
          module.prototype[prefix + key] = function(cb) {
            return fn.apply(this,
                (Array.prototype.slice.call(arguments, 1).concat(cb)));
          }
        })(module.prototype[key], prefix, key);
      }
    }
  }

  return module;
};
