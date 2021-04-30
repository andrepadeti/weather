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
import Alerts from './alerts'

const Weather = ({ searchData, handleMarkFavourite }) => {
  const [weather, setWeather] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getWeather(searchData, searchData.method)
      // console.log(response)
      if (response.error) {
        alert(response.status)
        setIsError(true)
      } else {
        setWeather(response.data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [searchData])

  if (isLoading) return <Loading message='Fetching weather data...' />
  if (isError) return <span>Error.</span>

  return (
    <>
      <City
        cityName={searchData.description.cityName}
        area={searchData.description.area}
        country={searchData.description.country}
        handleMarkFavourite={handleMarkFavourite}
      />
      {weather.timezone && (
        <>
          {weather.lastFetch && <LastFetch lastFetch={weather.lastFetch} />}
          {weather.current && (
            <CurrentWeather
              currentData={weather.current}
              dayData={weather.daily[0]}
              timezone={weather.timezone}
            />
          )}
          {weather.alerts && (
            <Alerts data={weather.alerts} timezone={weather.timezone} />
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
      )}
    </>
  )
}

export default Weather
