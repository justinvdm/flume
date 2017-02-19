export default function sink(init, fn) {
  return {
    init: init,
    process: sinkFn
  };

  function sinkFn(state, v, opts) {
    return [state, fn(state, v, opts)];
  }
}
