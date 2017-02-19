import {nil, resolveSeq} from './core';
import identity from './utils/identity';


export default function filter(fn) {
  fn = fn || identity;
  return function filterFn(_, v, opts) {
    return [null, resolveSeq([fn(v, opts), v]).then(test)];
  };
}


function test(res) {
  return res[0]
    ? res[1]
    : nil;
}
