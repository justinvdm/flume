export default function map(fn) {
  return function mapFn(_, v, opts) {
    return [null, fn(v, opts)];
  };
}
