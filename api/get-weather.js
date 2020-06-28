const {
    RCApiClient,
    RCWeather,
    RED_CUBA_SOURCE,
    MUNICIPALITIES,
    UtilsService,
    IsmetWeather,
    IsmetClient
  } = require('cuba-weather-javascript')

module.exports = (req, res) => {
  const name = req.query.name
  let municipality = MUNICIPALITIES.find(
    municipality => municipality.nameCured === name
  )
  let bestSource = UtilsService.getBestDistanceByMunicipality(
    municipality,
    RED_CUBA_SOURCE
  )

  try {
    let res = await RCApiClient.get(bestSource.name)
    let weather = new RCWeather(res.data.data)
    res.send(weather.weathertoOBJS())
  } catch (err) {
    res.send(err)
  }
}
