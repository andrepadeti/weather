import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

// import { getWeather } from '../utils/api'

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
  const refetchInterval = 5 * 60 * 1000
  
  const fetchWeatherData = async searchData => {
    const units = 'metric'
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchData.lat}&lon=${searchData.lng}&units=${units}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
    const { data } = await axios(url)
    console.log('fetched forecast')
    console.log(searchData.description)
    data.lastFetch = Date.now()
    return data
  }

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: weather,
    dataUpdatedAt,
  } = useQuery(
    ['fetchWeatherData', searchData.description],
    () => fetchWeatherData(searchData),
    { refetchInterval }
    // { refetchInterval, staleTime: refetchInterval }
  )
  // TODO cache fetches and, when tap on a favourite, use previous fetch if not "stale"

  // console.log(Date(dataUpdatedAt))
  // console.log(weather.lastFetch)

  if (isLoading) return <Loading message='Fetching weather data...' />
  if (isFetching) return <Loading message='Refreshing...' />
  if (isError) return <span>Error: {error.message}</span>

  return (
    <>
    {console.log(Date(dataUpdatedAt))}
      <City
        cityName={searchData.description.cityName}
        area={searchData.description.area}
        country={searchData.description.country}
        handleMarkFavourite={handleMarkFavourite}
      />
      {weather.timezone && (
        <>
          {weather.lastFetch && <LastFetch lastFetch={dataUpdatedAt} />}
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
