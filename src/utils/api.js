import forecast from '../content/forecast.json'

export const getWeather = async (searchData, method, units = 'metric') => {
  let repeatedFetch = false
  if (method === 'test') {
    return { error: false, jsonData: forecast }
  }

  let url
  if (method === 'geographic coordinates') {
    // check whether this is the same fetch as before
    const weatherAppLat = JSON.parse(localStorage.getItem('weatherAppLat'))
    const weatherAppLng = JSON.parse(localStorage.getItem('weatherAppLng'))
    const weatherAppLastFetch = JSON.parse(
      localStorage.getItem('weatherAppLastFetch')
    )

    if (
      weatherAppLat === searchData.lat &&
      weatherAppLng === searchData.lng &&
      Date.now() - weatherAppLastFetch < 300000 // = 5 minutes in epoch
    ) {
      repeatedFetch = true
    } else {
      localStorage.setItem('weatherAppLat', JSON.stringify(searchData.lat))
      localStorage.setItem('weatherAppLng', JSON.stringify(searchData.lng))
      localStorage.setItem('weatherAppLastFetch', JSON.stringify(Date.now()))
    }
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchData.lat}&lon=${searchData.lng}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  }
  if (method === 'city name')
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searchData.cityName}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  if (method === 'geoNameId')
    url = `https://api.openweathermap.org/data/2.5/weather?id=${searchData.geoNameId}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`

  if (repeatedFetch) {
    const weatherAppData = JSON.parse(localStorage.getItem('weatherAppData'))
    console.log('avoiding unnecessary fetch')
    return { error: false, jsonData: weatherAppData }
  }

  try {
    const response = await fetch(url)
    if (!response.ok) return { error: true }
    const jsonData = await response.json()
    localStorage.setItem('weatherAppData', JSON.stringify(jsonData))
    return { error: false, jsonData }
  } catch (error) {
    return { error: true }
  }
}

export const getCityFromGeolocation = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&result_type=locality&key=${process.env.GATSBY_GOOGLE_MAPS_KEY}`

  const getCityNameAndCountry = jsonData => {
    const data = jsonData.results[0].address_components
    let cityName, country

    data.forEach(component => {
      if (component.types.some(type => type === 'country'))
        country = component.short_name
      if (component.types.some(type => type === 'locality'))
        cityName = component.short_name
    })

    return { cityName, country }
  }

  try {
    const response = await fetch(url)
    if (!response.ok) return { error: true }
    const jsonData = await response.json()
    const { cityName, country } = getCityNameAndCountry(jsonData)
    return { error: false, description: { cityName, country } }
  } catch (error) {
    return { error: true }
  }
}
