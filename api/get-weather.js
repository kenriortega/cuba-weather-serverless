const {
  RCApiClient,
  RCWeather,
  RED_CUBA_SOURCE,
  MUNICIPALITIES,
  UtilsService
} = require('cuba-weather-javascript')

module.exports = async (req, res) => {
  let municipality = MUNICIPALITIES.find(
    municipality => municipality.nameCured === req.query.name
  )
  let bestSource = UtilsService.getBestDistanceByMunicipality(
    municipality,
    RED_CUBA_SOURCE
  )

  try {
    let response = await RCApiClient.get(bestSource.name)
    let weather = new RCWeather(response.data.data)
    res.send(weather.weathertoOBJS())
  } catch (err) {
    res.send({ err })
  }
}
