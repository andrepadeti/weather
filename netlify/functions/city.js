const axios = require('axios')

/**
 * Netlify function that calls openweathermap geocoding api 
 * @param {*} event 
 * @param {*} context 
 * @returns all (5) coordinates that match the location name
 */
exports.handler = async function (event, context) {
  const { query } = event.queryStringParameters
  const url = `http://api.openweathermap.org/geo/1.0/direct`
  const config = {
    params: { q: query, limit: 5, appid: process.env.GATSBY_WEATHER_API_KEY },
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
