import React from 'react'

// icons to be used in the legend
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faChartBar,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'

const Hourly = ({ data, timezone }) => {
  const timeZone = timezone
  const formattedData = data.map(item => {
    const epoch = item.dt * 1000
    const options = {
      hour: '2-digit',
      // minute: '2-digit',
      timeZone,
      hour12: false,
    }
    const date = new Date(epoch)
    const time = date.toLocaleTimeString([], options)
    const rain = item.rain ? item.rain['1h'] : 0
    return { name: time, temp: item.temp, rain }
  })

  return (
    <div className='my-5'>
      <div className='text-center text-white'>
        <h3>Hourly Forecast</h3>
        <p>
          for the next 48 hours
          <br />
          <FontAwesomeIcon icon={faChartLine} className='me-1' />
          Temperature in &#8451;
          <FontAwesomeIcon icon={faChartBar} className='ms-3 me-1' />
          Precipitation in mm
          <br />
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='me-1' />
          Scroll
          <FontAwesomeIcon icon={faAngleDoubleRight} className='ms-1' />
        </p>
      </div>
      <div 
        style={{
          // height: '20vh',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {data.map(hour => {
          return (
            <div className='card d-inline-block'>
              <div className='card-body'>{hour.temp}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Hourly
