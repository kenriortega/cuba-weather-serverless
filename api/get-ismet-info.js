const { IsmetWeather, IsmetClient } = require('cuba-weather-javascript')

module.exports = async (req, res) => {
  try {
    let response = await IsmetClient.get()
    let weather = new IsmetWeather(response.data)
    res.send(weather.getAllDataFromIsmet())
  } catch (err) {
    res.send({ err })
  }
}
