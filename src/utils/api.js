import forecast from "../content/forecast.json"

const getWeather = async (searchData, method, units = "metric") => {
  if (method === "test") {
    return { error: false, jsonData: forecast }
  }

  let url
  if (method === "geographic coordinates")
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchData.lat}&lon=${searchData.lng}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  if (method === "city name")
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searchData.cityName}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
  if (method === "geoNameId")
    url = `https://api.openweathermap.org/data/2.5/weather?id=${searchData.geoNameId}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) return { error: true }
    const jsonData = await response.json()
    return { error: false, jsonData }
  } catch (error) {
    return { error: true }
  }
}

export default getWeather
