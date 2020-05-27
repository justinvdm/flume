var core = require('./core')
var nil = core.nil
var resolveSeq = core.resolveSeq
var identity = require('./utils/identity')
var resultValue = require('./utils/resultValue')

module.exports = function filter(fn) {
  fn = fn || identity

  return function filterFn(_, v, opts) {
    return resolveSeq([fn(v, opts), v])
      .then(test)
      .then(resultValue)
  }
}

function test(res) {
  return res[0] ? res[1] : nil
}
