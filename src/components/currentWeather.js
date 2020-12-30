import React from 'react'

import Bounce from 'react-reveal/Bounce'
import Fade from 'react-reveal/Fade'

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

        <div className='text-center text-white py-2 fs-2 '>
          <Fade spy={data} left appear delay={cascadeDelayTime()}>
            <div>
              <i className='wi wi-thermometer' />
              {` ${data.temp}°C`}
            </div>
          </Fade>
          {data.uvi > 0 && (
            <Fade spy={data} left appear delay={cascadeDelayTime()}>
              <div>
                <i className='wi wi-day-sunny' />
                {` ${data.uvi} UVI`}
              </div>
            </Fade>
          )}
          <Fade spy={data} left appear delay={cascadeDelayTime()}>
            <div>
              <i className='wi wi-raindrop' />
              {` ${data.humidity}%`}
            </div>
          </Fade>
          <Fade spy={data} left appear delay={cascadeDelayTime()}>
            <div>
              <i className='wi wi-barometer' />
              {` ${data.pressure} hPa`}
            </div>
          </Fade>
          <Fade spy={data} left appear delay={cascadeDelayTime()}>
            <div>
              <i className='wi wi-strong-wind' />
              {` ${data.wind_speed} km/h  `}
              <i className={`wi wi-wind towards-${data.wind_deg % 360}-deg`} />
            </div>
          </Fade>
          <Fade spy={data} left appear delay={cascadeDelayTime()}>
            <div>
              <i className='wi wi-sunrise' />
              {` ${getFormattedTime(data.sunrise)} - `}
              {`${getFormattedTime(data.sunset)} `}
              <i className='wi wi-sunset' />
            </div>
          </Fade>
        </div>
      </div>
    </>
  )
}

export default CurrentWeather
