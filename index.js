var core = require('./core')

module.exports = core.conj(core, {
  map: require('./map'),
  reduce: require('./reduce'),
  filter: require('./filter'),
  sink: require('./sink'),
  strsplit: require('./strsplit'),
  bindInputs: require('./bindInputs')
})
