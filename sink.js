var maybeAsync = require('./core').maybeAsync
var resultValue = require('./utils/resultValue')

module.exports = function sink(init, fn) {
  fn = maybeAsync(fn)

  return {
    init: init,
    transform: sinkFn
  }

  function sinkFn(state, v, opts) {
    return fn(state, v, opts).then(resultValue)
  }
}
