var maybeAsync = require('./core').maybeAsync
var resultValue = require('./utils/resultValue')

module.exports = function map(fn) {
  fn = maybeAsync(fn)
  return function mapFn(_, v, opts) {
    return fn(v, opts).then(resultValue)
  }
}
