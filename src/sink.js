export default function sink(init, fn) {
  return {
    init: init,
    transform: sinkFn
  };

  function sinkFn(state, v, opts) {
    return [state, fn(state, v, opts)];
  }
}
