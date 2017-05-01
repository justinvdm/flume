function init() {
  return '';
}


function strsplit(sep) {
  function transform(data, chunk) {
    var lines = (data + chunk).split(sep);
    return {
      state: lines.slice(-1),
      values: lines.slice(0, -1)
    };
  }

  return {
    init: init,
    transform: transform
  };
}


export default strsplit;
