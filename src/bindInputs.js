import {conj} from './core';


export default function bindInputs(bindFn, inputs) {
  if (arguments.length < 2) {
    inputs = bindFn;
    bindFn = conj;
  }

  return function transformFn(inputFns, v, opts) {
    inputFns = inputFns || createInputFns(inputs, opts.dispatch);
    return [inputFns, bindFn(v, inputFns)];
  };

  function createInputFns(inputs, dispatch) {
    var res = {};

    for (var k in inputs) {
      if (inputs.hasOwnProperty(k)) res[k] = createInputFn(inputs[k], dispatch);
    }

    return res;
  }

  function createInputFn(input, dispatch) {
    return function inputFn(v) {
      dispatch(input, v);
    };
  }
}
