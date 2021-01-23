import React from 'react'

import Pulse from 'react-reveal/Bounce'
import Fade from 'react-reveal/Fade'

import { UVI } from './itemsWeather'
import { Humidity } from './itemsWeather'
import { Pressure } from './itemsWeather'
import { Wind } from './itemsWeather'
import { CurrentTemperature } from './itemsWeather'
import { Daytime } from './itemsWeather'

const CurrentWeather = ({ currentData, dayData, timezone }) => {
  return (
    <>
      <article className='d-flex flex-column flex-md-row justify-content-md-evenly'>
        <Pulse spy={currentData} appear>
          <div className='d-flex justify-content-evenly align-items-center mb-3 flex-fill'>
            {currentData.weather.map((weather, index) => (
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
            <CurrentTemperature
              current={currentData.temp}
              min={dayData.temp.min}
              max={dayData.temp.max}
            />
          </div>
        </Pulse>

        <header className='mt-5'>
          <h3>Currently</h3>
        </header>

        <div className='text-center py-2 flex-fill'>
          <Fade left spy={currentData} cascade duration={300}>
            {/* These extra divs are the cascade effect requirement */}
            <div>
              <div>
                <Pressure data={currentData.pressure} />
              </div>
              <div>
                <Wind
                  data={{
                    wind_speed: currentData.wind_speed,
                    wind_deg: currentData.wind_deg,
                  }}
                />
              </div>
              <div>
                <Humidity data={currentData.humidity} />
              </div>
              <div>
                <UVI data={currentData.uvi} />
              </div>
              <div>
                <Daytime
                  sunrise={currentData.sunrise}
                  sunset={currentData.sunset}
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
