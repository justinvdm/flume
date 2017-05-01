import {nil, resolveSeq} from './core';
import identity from './utils/identity';
import resultValue from './utils/resultValue';


export default function filter(fn) {
  fn = fn || identity;

  return function filterFn(_, v, opts) {
    return resolveSeq([fn(v, opts), v])
      .then(test)
      .then(resultValue);
  };
}


function test(res) {
  return res[0]
    ? res[1]
    : nil;
}
