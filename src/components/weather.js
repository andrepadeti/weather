import React, { useEffect, useState } from 'react'
import getWeather from '../utils/api'

import CurrentWeather from './currentWeather'
import Precipitation from './precipitation'
import Hourly from './hourlyChart'
// import Hourly from './hourlyCard'

import Fade from 'react-reveal/Fade'

const Weather = ({ searchData, method }) => {
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
          <Fade spy={searchData} left appear>
            <h3 className='text-center text-white fw-bold'>
              {`${searchData.description.cityName} `}
              <span className='badge bg-primary px-2'>
                {`${searchData.description.country}`}
              </span>
            </h3>
          </Fade>
          <CurrentWeather data={weather.current} timezone={weather.timezone} />
          <Precipitation data={weather.minutely} timezone={weather.timezone} />
          <Hourly data={weather.hourly} timezone={weather.timezone}/>
        </>
      )}
    </>
  )
}

export default Weather
