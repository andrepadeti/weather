import React, { useEffect, useState } from 'react'
import { getWeather } from '../utils/api'

import City from './city'
import CurrentWeather from './currentWeather'
import Precipitation from './precipitation'
import Hourly from './hourlyChart'
import Daily from './daily'

const Weather = ({ searchData, method, handleMarkFavourite, favourite }) => {
  const [weather, setWeather] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeather(searchData, method)
      if (response.error) {
        alert("Couldn't fetch!")
      } else {
        setWeather(response.jsonData)
        setLoaded(true)
      }
    }
    fetchData()
    // console.log(searchData)
  }, [searchData, method])

  return (
    <>
      {loaded && (
        <>
          <City
            cityName={searchData.description.cityName}
            country={searchData.description.country}
            handleMarkFavourite={handleMarkFavourite}
            favourite={favourite}
          />
          <CurrentWeather data={weather.current} timezone={weather.timezone} />
          <Precipitation data={weather.minutely} timezone={weather.timezone} />
          <Hourly data={weather.hourly} timezone={weather.timezone} />
          <Daily data={weather.daily} timezone={weather.timezone} />
        </>
      )}
    </>
  )
}

export default Weather
