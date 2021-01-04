import forecast from '../content/forecast.json'

const getWeather = async (searchData, method, units = 'metric') => {
  let repeatedFetch = false
  if (method === 'test') {
    return { error: false, jsonData: forecast }
  }

  let url
  if (method === 'geographic coordinates') {
    // check whether this is the same fetch as before
    const weatherAppLat = sessionStorage.getItem('weatherAppLat')
    const weatherAppLng = sessionStorage.getItem('weatherAppLng')

    if (weatherAppLat == searchData.lat && weatherAppLng == searchData.lng) {
      repeatedFetch = true
    } else {
      sessionStorage.setItem('weatherAppLat', searchData.lat)
      sessionStorage.setItem('weatherAppLng', searchData.lng)
    }
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchData.lat}&lon=${searchData.lng}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  }
  if (method === 'city name')
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searchData.cityName}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  if (method === 'geoNameId')
    url = `https://api.openweathermap.org/data/2.5/weather?id=${searchData.geoNameId}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`

  if (repeatedFetch) {
    const weatherAppData = sessionStorage.getItem('weatherAppData')
    console.log('avoiding unecessary fetch')
    return { error: false, jsonData: JSON.parse(weatherAppData) }
  }

  try {
    const response = await fetch(url)
    if (!response.ok) return { error: true }
    const jsonData = await response.json()
    sessionStorage.setItem('weatherAppData', JSON.stringify(jsonData))
    return { error: false, jsonData }
  } catch (error) {
    return { error: true }
  }
}

export default getWeather
