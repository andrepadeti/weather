import React, { useState } from 'react'

import SwipeMessage from './swipe-message'

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
      {Math.round(data)}%
    </div>
  )
}

const Pressure = ({ data }) => {
  return (
    <div>
      <i className='wi wi-barometer me-2' />${Math.round(data)} hPa
    </div>
  )
}

const Wind = ({ data }) => {
  return (
    <div>
      <i className='wi wi-strong-wind me-2' />
      {Math.round(data.wind_speed)} km/h
      <i className={`wi wi-wind towards-${data.wind_deg % 360}-deg ms-1`} />
    </div>
  )
}

const Cloudiness = ({ data }) => {
  return (
    <div>
      <i className='wi wi-cloud me-2' />
      {Math.round(data)}%
    </div>
  )
}

const Rain = ({ data }) => {
  return (
    <>
      {data.pop && (
        <div>
          <i className='wi wi-raindrops me-2' />
          <span>
            ${data.pop * 100}% {Math.round(data.rain)}
            <small>mm</small>
          </span>
        </div>
      )}
    </>
  )
}

const UVI = ({ data }) => {
  data = Math.round(data)
  let category
  if (data <= 2) {
    category = 'Low'
  } else if (data >= 3 && data <= 5) {
    category = 'Moderate'
  } else if (data >= 6 && data <= 7) {
    category = 'High'
  } else if (data >= 8 && data <= 10) {
    category = 'Very High'
  } else if (data >= 11) {
    category = 'Extreme'
  }

  return (
    <div>
      <i className='wi wi-day-sunny me-2' />
      {`UV ${data}, ${category}`}
    </div>
  )
}

const Daily = ({ data, timezone }) => {
  const [scrollPosition, setScrollPosition] = useState('start')

  const getWeekDay = epoch => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    epoch *= 1000
    const date = new Date(epoch)
    return weekday[date.getDay()]
  }

  const handleScroll = e => {
    const threshold = 15 // number of pixels to consider the start and end of scrolling

    if (e.target.scrollLeft < threshold) {
      setScrollPosition('start')
    } else if (
      e.target.scrollWidth - e.target.scrollLeft <=
      e.target.clientWidth + threshold
    ) {
      setScrollPosition('end')
    } else setScrollPosition('middle')
  }

  return (
    <div className='my-5'>
      <div className='text-center text-white'>
        <h3>Daily Forecast</h3>
        <div>
          for the next 7 days
          <br />
        </div>
      </div>

      <div
        className='mt-3 mb-2 hide-scrollbar'
        style={{
          // height: '20vh',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
        onScroll={e => handleScroll(e)}
      >
        {data.map((day, index) => (
          <div
            key={index}
            className='card d-inline-block me-1 text-white bg-gradient bg-dark text-center rounded'
            style={{width:'30px'}}
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
        ))}
      </div>

      <SwipeMessage scrollPosition={scrollPosition} />
    </div>
  )
}

export default Daily
