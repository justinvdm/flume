export default function reduce(init, fn) {
  return {
    init: init,
    process: reduceFn
  };

  function reduceFn(state, v) {
    var res = fn(state, v);
    return [res, res];
  }
}
