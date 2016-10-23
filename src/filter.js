import { nil, resolveSeq } from './core';


export default function filter(fn) {
  return function filterFn(_, v) {
    return [null, resolveSeq([fn(v), v]).then(test)];
  };
};


function test(res) {
  return res[0]
    ? res[1]
    : nil;
}
