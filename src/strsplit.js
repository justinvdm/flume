function init() {
  return '';
}


function strsplit(sep) {
  function process(data, chunk) {
    var lines = (data + chunk).split(sep);
    return [lines.slice(-1), lines.slice(0, -1)];
  }

  return {
    init: init,
    process: process
  };
}


export default strsplit;
