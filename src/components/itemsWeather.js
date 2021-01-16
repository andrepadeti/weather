import React from 'react'

export const Icon = ({ data }) => {
  return (
    <div>
      <i className={`owf owf-${data} owf-2x card-img-top mt-2`} />
    </div>
  )
}

export const MaxTemperature = ({ data }) => {
  return (
    <div>
      <i className='wi wi-direction-up me-2' />
      {Math.round(data)}&deg;
    </div>
  )
}

export const MinTemperature = ({ data }) => {
  return (
    <div>
      <i className='wi wi-direction-down me-2' />
      {Math.round(data)}&deg;
    </div>
  )
}

export const CurrentTemperature = ({ data, current }) => {
  return (
    <div className='d-flex'>
      {/* <i className='wi wi-thermometer' /> */}
      <div style={{ fontSize: '5rem' }}>{Math.round(data)}</div>
      <div className='align-self-center'>°C</div>
    </div>
  )
}

export const Humidity = ({ data }) => {
  return (
    <div>
      <i className='wi wi-raindrop me-2' />
      {Math.round(data)}%
    </div>
  )
}

export const Pressure = ({ data }) => {
  return (
    <div>
      <i className='wi wi-barometer me-2' />
      {Math.round(data)} hPa
    </div>
  )
}

export const Wind = ({ data }) => {
  return (
    <div>
      <i className='wi wi-strong-wind me-2' />
      {Math.round(data.wind_speed)} km/h
      <i className={`wi wi-wind towards-${data.wind_deg % 360}-deg ms-1`} />
    </div>
  )
}

export const Cloudiness = ({ data }) => {
  return (
    <div>
      <i className='wi wi-cloud me-2' />
      {Math.round(data)}%
    </div>
  )
}

export const Rain = ({ data }) => {
  return (
    <div>
      {data.pop > 0 ? (
        <>
          <i className='wi wi-raindrops me-2' />
          <span>
            {data.pop * 100}% {data.rain && `${Math.round(data.rain)}mm`}
          </span>
        </>
      ) : (
        <>-</>
      )}
    </div>
  )
}

export const UVI = ({ data }) => {
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
      {`${data}, ${category}`}
    </div>
  )
}

export const Daytime = ({ sunrise, sunset, timezone }) => {
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
    <div>
      <i className='wi wi-sunrise' />
      {` ${getFormattedTime(sunrise)} - `}
      {`${getFormattedTime(sunset)} `}
      <i className='wi wi-sunset' />
    </div>
  )
}
