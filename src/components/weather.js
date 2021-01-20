import React, { useEffect, useState } from 'react'
import { getWeather } from '../utils/api'

import Loading from '../components/loading'

import City from './city'
import CurrentWeather from './currentWeather'
import Precipitation from './precipitation'
import Hourly from './hourly'
import Daily from './daily'
import Radar from './radar'

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
      <City
        cityName={searchData.description.cityName}
        country={searchData.description.country}
        handleMarkFavourite={handleMarkFavourite}
        favourite={favourite}
      />
      {loaded && weather.timezone ? (
        <>
          {weather.current && (
            <CurrentWeather
              data={weather.current}
              timezone={weather.timezone}
            />
          )}
          {weather.minutely && (
            <Precipitation
              data={weather.minutely}
              timezone={weather.timezone}
            />
          )}
          <Radar lat={searchData.lat} lng={searchData.lng} />
          {weather.hourly && (
            <Hourly data={weather.hourly} timezone={weather.timezone} />
          )}
          {weather.daily && (
            <Daily data={weather.daily} timezone={weather.timezone} />
          )}
        </>
      ) : (
        <Loading message='Fetching weather data...' className='mt-5' />
      )}
    </>
  )
}

export default Weather
