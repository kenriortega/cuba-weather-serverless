const {
  RCApiClient,
  RCWeather,
  RED_CUBA_SOURCE,
  MUNICIPALITIES,
  UtilsService
} = require('cuba-weather-javascript')

module.exports = (req, res) => {
  // res.json({ name: , email: 'john@example.com' })

  let municipality = MUNICIPALITIES.find(
    municipality => municipality.nameCured === req.query.name
  )
  let bestSource = UtilsService.getBestDistanceByMunicipality(
    municipality,
    RED_CUBA_SOURCE
  )

  try {
    let res = await RCApiClient.get(bestSource.name)
    let weather = new RCWeather(res.data.data)
    res.json(weather.weathertoOBJS())
  } catch (err) {
    res.send({err:"error"})
  }
}
