const axios = require('axios')

exports.handler = async function (event, context) {
  const { lat, lon, units } = event.queryStringParameters
  const url = `https://api.openweathermap.org/data/2.5/onecall`
  const config = {
    params: { lat, lon, units, appid: process.env.GATSBY_WEATHER_API_KEY },
  }

  try {
    const { data } = await axios(url, config)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: error.toString(),
    }
  }
}
