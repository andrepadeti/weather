const axios = require('axios')

exports.handler = async function (event, context) {
  const { lat, lng } = event.queryStringParameters
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&result_type=locality&key=${process.env.GATSBY_GOOGLE_MAPS_KEY}`

  try {
    const { data } = await axios(url)
    return { 
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: error.toString()
    }
  }
}
