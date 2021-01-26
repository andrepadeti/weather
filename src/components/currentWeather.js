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
      <article className='d-flex flex-column'>
        <Fade spy={currentData} appear>
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
                {/* <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} /> */}
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
          <Daytime
            sunrise={currentData.sunrise}
            sunset={currentData.sunset}
            timezone={timezone}
            className='text-center fs-4'
          />
        </Fade>

        <div className='text-center py-2 flex-fill'>
          <Fade spy={currentData} appear delay={400}>
            <h3 className='fw-light mt-5'>Currently</h3>
            <Pressure data={currentData.pressure} />
            <Wind
              data={{
                wind_speed: currentData.wind_speed,
                wind_deg: currentData.wind_deg,
              }}
            />
            <Humidity data={currentData.humidity} />
            <UVI data={currentData.uvi} />
          </Fade>
        </div>
      </article>
    </>
  )
}

export default CurrentWeather
