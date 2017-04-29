function init() {
  return '';
}


function strsplit(sep) {
  function transform(data, chunk) {
    var lines = (data + chunk).split(sep);
    return [lines.slice(-1), lines.slice(0, -1)];
  }

  return {
    init: init,
    transform: transform
  };
}


export default strsplit;
