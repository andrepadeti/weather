import React from 'react'

export const Icon = ({ data }) => {
  return (
    <div>
      <i className={`owf owf-${data} owf-3x card-img-top mt-2 icon`} />
    </div>
  )
}

export const MaxTemperature = ({ data, spacing = true, ...rest }) => {
  const background = ('className' in rest) && (rest.className.includes('text-on-background'))
  console.log('max: ', background)

  return (
    <div {...rest}>
      <i className={`wi wi-direction-up me-${spacing ? '2' : '1'} ${background ? 'icon-on-background' : 'icon'}`} />
      {Math.round(data)}&deg;
    </div>
  )
}

export const MinTemperature = ({ data, spacing = true, ...rest }) => {
  const background = ('className' in rest) && (rest.className.includes('text-on-background'))
  console.log('min: ', background)

  return (
    <div {...rest}>
      <i className={`wi wi-direction-down me-${spacing ? '2' : '1'} ${background ? 'icon-on-background' : 'icon'}`} />
      {Math.round(data)}&deg;
    </div>
  )
}

export const CurrentTemperature = ({ current, min, max }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-start opaque px-2 pb-1`}
    >
      <div className='d-flex'> 
        <div style={{ fontSize: '5rem' }} className='lh-1 text-on-background'>
          {Math.round(current)}
        </div>
        {/* <div className='align-self-center'>°C</div> */}
        <div className='align-self-center fs-2'>
          <i className='wi wi-celsius text-on-background' />
        </div>
      </div>
      {min && max && (
        <div className='d-flex justify-content-center'>
          <MinTemperature data={min} className='text-on-background me-2' spacing={false} />
          <MaxTemperature data={max} className='text-on-background' spacing={false} />
        </div>
      )}
    </div>
  )
}

export const Humidity = ({ data }) => {
  return (
    <div>
      <i className='wi wi-humidity me-2 icon' />
      {Math.round(data)}%
    </div>
  )
}

export const Pressure = ({ data }) => {
  return (
    <div>
      <i className='wi wi-barometer me-2 icon' />
      {Math.round(data)} hPa
    </div>
  )
}

export const Wind = ({ data }) => {
  return (
    <div>
      <i className='wi wi-strong-wind me-2 icon' />
      {Math.round(data.wind_speed)} km/h
      <i
        className={`wi wi-wind towards-${data.wind_deg % 360}-deg ms-1 icon`}
      />
    </div>
  )
}

export const Cloudiness = ({ data }) => {
  return (
    <div>
      <i className='wi wi-cloud me-2 icon' />
      {Math.round(data)}%
    </div>
  )
}

export const Rain = ({ data }) => {
  return (
    <div>
      <i className='wi wi-rain me-2 icon' />
      <span>
        {Math.round(data.pop * 100)}%{' '}
        {data.rain && `${Math.round(data.rain)}mm`}
      </span>
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
      <i className='wi wi-day-sunny me-2 icon' />
      {`${data}, ${category}`}
    </div>
  )
}

export const Daytime = ({ sunrise, sunset, timezone, ...rest }) => {
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
    <span {...rest}>
      <i className='wi wi-sunrise icon-on-background' />
      {` ${getFormattedTime(sunrise)} - `}
      {`${getFormattedTime(sunset)} `}
      <i className='wi wi-sunset icon-on-background' />
    </span>
  )
}
