import {maybeAsync} from './core';
import resultValue from './utils/resultValue';


export default function map(fn) {
  fn = maybeAsync(fn);
  return function mapFn(_, v, opts) {
    return fn(v, opts).then(resultValue);
  };
}
