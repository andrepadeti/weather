import React from 'react'

import Shake from 'react-reveal/Shake'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'

const Icon = ({ data }) => {
  return (
    <div>
      <i className={`owf owf-${data} owf-2x card-img-top mt-2`} />
    </div>
  )
}
const MaxTemperature = ({ data }) => {
  return (
    <div>
      <i className='wi wi-direction-up me-2' />
      {Math.round(data)}&deg;
    </div>
  )
}

const MinTemperature = ({ data }) => {
  return (
    <div>
      <i className='wi wi-direction-down me-2' />
      {Math.round(data)}&deg;
    </div>
  )
}

const Humidity = ({ data }) => {
  return (
    <div>
      <i className='wi wi-raindrop me-2' />
      {data}%
    </div>
  )
}

const Pressure = ({ data }) => {
  return (
    <div>
      <i className='wi wi-barometer me-2' />${data} hPa
    </div>
  )
}

const Wind = ({ data }) => {
  return (
    <div>
      <i className='wi wi-strong-wind me-2' />
      {data.wind_speed} km/h
      <i className={`wi wi-wind towards-${data.wind_deg % 360}-deg ms-1`} />
    </div>
  )
}

const Cloudiness = ({ data }) => {
  return (
    <div>
      <i className='wi wi-cloud me-2' />
      {data}%
    </div>
  )
}

const Rain = ({ data }) => {
  return (
    <>
      {data.pop && (
        <div>
          <i className='wi wi-raindrops me-2' />
          {`${data.pop * 100}% ${data.rain}mm`}
        </div>
      )}
    </>
  )
}

const UVI = ({ data }) => {
  return (
    <div>
      <i className='wi wi-day-sunny me-2' />
      {data} UVI
    </div>
  )
}

const Daily = ({ data, timezone }) => {
  const getWeekDay = epoch => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    epoch *= 1000
    const date = new Date(epoch)
    return weekday[date.getDay()]
  }

  return (
    <div className='my-5'>
      <div className='text-center text-white'>
        <h3>Daily Forecast</h3>
        <div>
          for the next 7 days
          <br />
          <div className='d-flex justify-content-center'>
            <Shake spy={data} appear delay={3000} duration={1500}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} className='me-3' />
            </Shake>
            Swipe
            <Shake spy={data} appear delay={3000} duration={1500}>
              <FontAwesomeIcon icon={faAngleDoubleRight} className='ms-3' />
            </Shake>
          </div>
        </div>
      </div>

      <div
        className='mt-3'
        style={{
          // height: '20vh',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {data.map((day, index) => {
          return (
            <div
              key={index}
              className='card d-inline-block me-1 text-white bg-gradient bg-dark text-center rounded'
            >
              <div className='card-header'>
                <h5 className='card-title'>{getWeekDay(day.dt)}</h5>
              </div>
              <div className='card-body'>
                <Icon data={day.weather[0].id} />
                <MaxTemperature data={day.temp.max} />
                <MinTemperature data={day.temp.min} />
                <Humidity data={day.humidity} />
                <Pressure data={day.pressure} />
                <Wind
                  data={{ wind_speed: day.wind_speed, wind_deg: day.wind_deg }}
                />
                <Cloudiness data={day.clouds} />
                <Rain data={{ pop: day.pop, rain: day.rain }} />
                <UVI data={day.uvi} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Daily
