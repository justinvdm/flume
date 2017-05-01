import {maybeAsync} from './core';
import resultValue from './utils/resultValue';


export default function sink(init, fn) {
  fn = maybeAsync(fn);

  return {
    init: init,
    transform: sinkFn
  };

  function sinkFn(state, v, opts) {
    return fn(state, v, opts).then(resultValue);
  }
}
