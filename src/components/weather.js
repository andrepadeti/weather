import React, { useEffect, useState } from 'react'
import { getWeather } from '../utils/api'

import Loading from '../components/loading'
import City from './city'
import CurrentWeather from './currentWeather'
import Precipitation from './precipitation'
import Hourly from './hourly'
import Daily from './daily'
import Radar from './radar'
import LastFetch from './lastFetch'

const Weather = ({ searchData, handleMarkFavourite }) => {
  const [weather, setWeather] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false)
      const response = await getWeather(searchData, searchData.method)
      if (response.error) {
        alert("Couldn't fetch!")
      } else {
        setWeather(response.jsonData)
        setLoaded(true)
      }
    }
    fetchData()
    // console.log(searchData)
  }, [searchData])

  return (
    <>
      <City
        cityName={searchData.description.cityName}
        area={searchData.description.area}
        country={searchData.description.country}
        handleMarkFavourite={handleMarkFavourite}
      />
      {loaded && weather.timezone ? (
        <>
          {weather.lastFetch && <LastFetch lastFetch={weather.lastFetch} />}
          {weather.current && (
            <CurrentWeather
              currentData={weather.current}
              dayData={weather.daily[0]}
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
        <Loading message='Fetching weather data...' />
      )}
    </>
  )
}

export default Weather
