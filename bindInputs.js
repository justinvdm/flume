var conj = require('./core').conj

var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function bindInputs(bindFn, inputs) {
  if (arguments.length < 2) {
    inputs = bindFn
    bindFn = conj
  }

  return function transformFn(inputFns, obj, opts) {
    inputFns = inputFns || createInputFns(inputs, opts.dispatch)
    return {
      state: inputFns,
      value: bindFn(obj, inputFns)
    }
  }

  function createInputFns(inputs, dispatch) {
    var res = {}

    for (var k in inputs) {
      if (hasOwnProperty.call(inputs, k))
        res[k] = createInputFn(inputs[k], dispatch)
    }

    return res
  }

  function createInputFn(input, dispatch) {
    return function inputFn(v) {
      dispatch(input, v)
    }
  }
}
