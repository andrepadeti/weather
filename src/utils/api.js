import axios from 'axios'
// TODO implement react-query
// import { useQuery } from 'react-query'
import testData from '../content/forecast.json'

const initialiseLocalStorage = () => {
  if (localStorage.getItem('weatherAppFetch') === null) {
    let weatherAppFetch
    weatherAppFetch = {}
    weatherAppFetch.description = {}
    weatherAppFetch.description.cityName = ''
    weatherAppFetch.description.area = ''
    weatherAppFetch.description.country = ''
    weatherAppFetch.lastFetch = Date.now()
    weatherAppFetch.data = {}
    localStorage.setItem('weatherAppFetch', JSON.stringify(weatherAppFetch))

    // remove old localStorage
    localStorage.removeItem('weatherAppLat')
    localStorage.removeItem('weatherAppLng')
    localStorage.removeItem('weatherAppLastFetch')
  }
}

export const getWeather = async (
  searchData,
  method = 'geographic coordinates',
  units = 'metric'
) => {
  let repeatedFetch = false
  let newFetch = {}
  let weatherAppFetch
  let url

  initialiseLocalStorage()

  if (method === 'test') {
    return { error: false, data: testData }
  }

  if (method === 'geographic coordinates') {
    weatherAppFetch = JSON.parse(localStorage.getItem('weatherAppFetch'))

    // check whether this is the same fetch as before
    if (
      weatherAppFetch.description.cityName ===
        searchData.description.cityName &&
      weatherAppFetch.description.area === searchData.description.area &&
      weatherAppFetch.description.country === searchData.description.country &&
      Date.now() - weatherAppFetch.lastFetch < 5 * 60 * 1000 // = 5 minutes in epoch
    ) {
      repeatedFetch = true
    } else {
      newFetch.description = searchData.description
    }

    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchData.lat}&lon=${searchData.lng}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  }
  // if (method === 'city name')
  //   url = `https://api.openweathermap.org/data/2.5/weather?q=${searchData.cityName}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  // if (method === 'geoNameId')
  //   url = `https://api.openweathermap.org/data/2.5/weather?id=${searchData.geoNameId}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`

  if (repeatedFetch) {
    console.log('avoiding unnecessary forecast fetch')
    return { error: false, data: weatherAppFetch.data }
  }

  try {
    const { data } = await axios(url)
    console.log('fetched forecast')
    newFetch.lastFetch = data.lastFetch = Date.now() // ugly work around!
    newFetch.data = data
    localStorage.setItem('weatherAppFetch', JSON.stringify(newFetch))
    return { error: false, data }
  } catch (error) {
    console.log(error)
    return { error: true, status: error }
  }
}

export const getCityNameAndCountry = data => {
  let cityName, area, country

  data.forEach(component => {
    if (component.types.some(type => type === 'country'))
      country = component.short_name
    if (component.types.some(type => type === 'administrative_area_level_1'))
      area = component.short_name
    if (component.types.some(type => type === 'locality'))
      cityName = component.short_name
  })

  return { cityName, area, country }
}

export const getCityFromGeolocation = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&result_type=locality&key=${process.env.GATSBY_GOOGLE_MAPS_KEY}`

  try {
    const { data } = await axios(url)
    console.log('fetched geolocation')
    if (data.status !== 'OK') throw new Error('Google Geocode error')
    const description = getCityNameAndCountry(
      data.results[0].address_components
    )
    return { error: false, description }
  } catch (error) {
    return { error: true, status: error }
  }
}
