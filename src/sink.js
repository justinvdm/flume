export default function sink(init, fn) {
  return {
    init: init,
    process: sinkFn
  };

  function sinkFn(state, v) {
    return [state, fn(state, v)];
  }
}
