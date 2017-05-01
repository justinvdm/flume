function capture(arr) {
  return (_, v) => {
    arr.push(v);
    return {value: null};
  };
}


function defer() {
  let resolve;
  let reject;

  const promise = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  });

  return {
    resolve,
    reject,
    promise
  };
}


export {
  capture,
  defer
};
