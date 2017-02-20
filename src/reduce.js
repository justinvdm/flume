export default function reduce(init, fn) {
  if (arguments.length < 2) {
    fn = init;
    init = retNull;
  }

  return {
    init: init,
    process: reduceFn
  };

  function reduceFn(state, v, opts) {
    var res = fn(state, v, opts);
    return [res, res];
  }
}


function retNull() {
  return null;
}
