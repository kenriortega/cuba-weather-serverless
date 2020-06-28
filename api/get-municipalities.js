const { MUNICIPALITIES } = require('cuba-weather-javascript')

module.exports = async (req, res) => {
  res.json({ data: MUNICIPALITIES })
}
