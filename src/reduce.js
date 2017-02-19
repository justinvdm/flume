export default function reduce(init, fn) {
  return {
    init: init,
    process: reduceFn
  };

  function reduceFn(state, v, opts) {
    var res = fn(state, v, opts);
    return [res, res];
  }
}
