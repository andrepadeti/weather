import React, { useState } from 'react'

import { isToday, isTomorrow } from 'date-fns'
import { Fade } from 'react-awesome-reveal'

import ScrollIcons from './scrollIcons'
import { Icon } from './itemsWeather'
import { MaxTemperature } from './itemsWeather'
import { MinTemperature } from './itemsWeather'
import { Humidity } from './itemsWeather'
import { Pressure } from './itemsWeather'
import { Wind } from './itemsWeather'
import { Cloudiness } from './itemsWeather'
import { Rain } from './itemsWeather'
import { UVI } from './itemsWeather'

const Daily = ({ data, timezone }) => {
  const [scrollEvent, setScrollEvent] = useState(null)

  const getWeekDay = epoch => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    epoch *= 1000
    const date = new Date(epoch)
    if (isToday(date)) {
      return 'Today'
    } else if (isTomorrow(date)) {
      return 'Tomorrow'
    } else return weekday[date.getDay()]
  }

  return (
    <Fade delay={300}>
      <article className='my-5'>
        <header>
          <h3>Daily Forecast</h3>
          <div>for the next 7 days</div>
        </header>

        <div
          className='mt-3 mb-2 hide-scrollbar'
          style={{
            // height: '20vh',
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
          }}
          onScroll={e => {
            e.persist()
            setScrollEvent(e)
          }}
        >
          {data.map((day, index) => (
            <div
              key={index}
              className='card d-inline-block me-1 bg-secondary bg-gradient text-center rounded'
              style={{ width: '10rem' }}
            >
              <h5 className='card-title mt-3'>{getWeekDay(day.dt)}</h5>
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

        <ScrollIcons scrollEvent={scrollEvent} />
      </article>
    </Fade>
  )
}

export default Daily
