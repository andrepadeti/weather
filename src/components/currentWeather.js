import React from 'react'

import Bounce from 'react-reveal/Bounce'
import Fade from 'react-reveal/Fade'

import { UVI } from './itemsWeather'
import { Humidity } from './itemsWeather'
import { Pressure } from './itemsWeather'
import { Wind } from './itemsWeather'
import { CurrentTemperature } from './itemsWeather'
import { Daytime } from './itemsWeather'

const CurrentWeather = ({ data, timezone }) => {
  // increase delay time each time we call this function
  // so that we create a cascade effect
  let delayTime = 200
  const cascadeDelayTime = () => {
    delayTime = delayTime + 100
    return delayTime
  }

  const getFormattedTime = epoch => {
    epoch *= 1000
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      hour12: false,
    }
    const date = new Date(epoch)
    return date.toLocaleTimeString([], options)
  }

  return (
    <>
      <div className='d-flex flex-column flex-md-row justify-content-md-evenly'>
        <div>
          <Bounce spy={data} appear>
            <div className='d-flex justify-content-center my-5'>
              {data.weather.map((weather, index) => (
                <div
                  key={index}
                  className={`text-center text-white opaque bg-gradient shadow rounded 
                        ${index > 0 && `ms-2`} p-2`}
                  style={{ width: '150px' }}
                >
                  {/* TODO try to make use of weather-icons instead of ow */}
                  <i className={`owf owf-${weather.id} owf-5x`}></i>
                  <div className='description'>{weather.description}</div>
                </div>
              ))}
            </div>
          </Bounce>
        </div>

        <div className='text-center text-white py-2 fs-2 fw-light '>
          {/* <Fade spy={data}  appear delay={cascadeDelayTime()}>
            <CurrentTemperature data={data.temp} />
          </Fade>

          <Fade spy={data}  appear delay={cascadeDelayTime()}>
            <Humidity data={data.humidity} />
          </Fade>
          <Fade spy={data}  appear delay={cascadeDelayTime()}>
            <Pressure data={data.pressure} />
          </Fade>
          <Fade spy={data}  appear delay={cascadeDelayTime()}>
            <Wind
              data={{ wind_speed: data.wind_speed, wind_deg: data.wind_deg }}
            />
          </Fade>
          <Fade spy={data}  appear delay={cascadeDelayTime()}>
            <UVI data={data.uvi} />
          </Fade>
          <Fade spy={data}  appear delay={cascadeDelayTime()}>
            <Daytime
              sunrise={data.sunrise}
              sunset={data.sunset}
              timezone={timezone}
            />
          </Fade> */}
          <Fade spy={data}  cascade duration={4000}>
            <CurrentTemperature data={data.temp} />
            <Humidity data={data.humidity} />
            <Pressure data={data.pressure} />
            <Wind
              data={{ wind_speed: data.wind_speed, wind_deg: data.wind_deg }}
            />
            <UVI data={data.uvi} />
            <Daytime
              sunrise={data.sunrise}
              sunset={data.sunset}
              timezone={timezone}
            />
          </Fade>
        </div>
      </div>
    </>
  )
}

export default CurrentWeather
