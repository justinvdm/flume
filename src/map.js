export default function map(fn) {
  return function mapFn(_, v) {
    return [null, fn(v)];
  };
}
