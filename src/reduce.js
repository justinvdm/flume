export default function reduce(init, reducer) {
  if (arguments.length < 2) {
    reducer = init;
    init = retNull;
  }

  reducer = parseReducer(reducer);

  return {
    init: init,
    transform: reduceFn
  };

  function reduceFn(state, v, opts) {
    try{
    var res = reducer(state, v, opts);
    return [res, res];
    } catch(e) { console.log(e); }
  }
}


function parseReducer(obj) {
  if (typeof obj == 'function') return obj;
  if (Array.isArray(obj)) return caseSourceOfReducer(obj);
  throw new Error('Unsupported reducer type given to reduce(): ' + typeof obj);
}


function caseSourceOfReducer(pairs) {
  var defaultFn = identityProcessor;

  if (typeof pairs[pairs.length - 1] == 'function') {
    defaultFn = pairs[pairs.length - 1];
    pairs = pairs.slice(0, -1);
  }

  return function caseSourceOfFn(state, v, opts) {
    var source = opts.source;
    var i = -1;
    var n = pairs.length;
    var pair;

    while (++i < n) {
      pair = pairs[i];
      if (pair[0] === source) return pair[1](state, v, opts);
    }

    return defaultFn(state, v, opts);
  };
}


function retNull() {
  return null;
}


function identityProcessor(state, v) {
  return v;
}
