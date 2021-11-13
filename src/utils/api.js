import axios from 'axios'
// import testData from '../content/forecast.json'

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
  const url = `/.netlify/functions/maps?lat=${lat}&lng=${lng}`

  try {
    const { data } = await axios(url)
    // if (error) throw new Error('')
    if (data.status !== 'OK')
      throw new Error(data.error_message || "Couldn't fetch from Maps API")
    console.log('Fetched from Maps API')
    const description = getCityNameAndCountry(
      data.results[0].address_components
    )
    return { error: false, description }
  } catch (error) {
    return { error: true, status: error }
  }
}
