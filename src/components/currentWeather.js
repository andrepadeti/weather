import React from 'react'

import Pulse from 'react-reveal/Bounce'
import Fade from 'react-reveal/Fade'

import { UVI } from './itemsWeather'
import { Humidity } from './itemsWeather'
import { Pressure } from './itemsWeather'
import { Wind } from './itemsWeather'
import { CurrentTemperature } from './itemsWeather'
import { Daytime } from './itemsWeather'

const CurrentWeather = ({ data, timezone }) => {
  return (
    <>
      <article className='d-flex flex-column flex-md-row justify-content-md-evenly'>
        <Pulse spy={data} appear>
          <div className='d-flex justify-content-evenly align-items-center mt-5 mb-3 flex-fill'>
            {data.weather.map((weather, index) => (
              <div
                key={index}
                className={`d-flex flex-column
                        ${index > 0 && `ms-2`}`}
                // style={{ width: '5rem' }}
              >
                {/* TODO try to make use of weather-icons instead of ow */}
                <i className={`owf owf-${weather.id} owf-4x`}></i>
                <div className='description text-center'>
                  {weather.description}
                </div>
              </div>
            ))}
            <CurrentTemperature data={data.temp} />
          </div>
        </Pulse>

        <div className='text-center py-2 fs-2 flex-fill'>
          <Fade left spy={data} cascade duration={300}>
            {/* These extra divs are the cascade effect requirement */}
            <div>
              <div>
                <Humidity data={data.humidity} />
              </div>
              <div>
                <Pressure data={data.pressure} />
              </div>
              <div>
                <Wind
                  data={{
                    wind_speed: data.wind_speed,
                    wind_deg: data.wind_deg,
                  }}
                />
              </div>
              <div>
                <UVI data={data.uvi} />
              </div>
              <div>
                <Daytime
                  sunrise={data.sunrise}
                  sunset={data.sunset}
                  timezone={timezone}
                />
              </div>
            </div>
          </Fade>
        </div>
      </article>
    </>
  )
}

export default CurrentWeather
