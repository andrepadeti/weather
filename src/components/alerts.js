import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

const Alerts = ({ data, timezone }) => {
  const [showAlerts, setShowAlerts] = useState(false)

  return (
    <article className='my-5'>
      <header className='mb-3'>
        <h3>Alerts</h3>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            checked={showAlerts}
            onChange={() => setShowAlerts(!showAlerts)}
            value=''
            id='showAlerts'
          />
          <label className='form-check-label' htmlFor='showAlerts'>
            Show alerts
          </label>
        </div>
      </header>

      <Fade left in={showAlerts} collapse>
        <>
          {data.map((alert, index) => (
            <div
              key={index}
              className='alert alert-theme mb-4'
              role='alert'
            >
              <h5 className='alert-heading'>{alert.event}</h5>
              <p>
                <strong>Start:</strong>{' '}
                {format(new Date(alert.start * 1000), "PPPP' at 'HH:mm", {
                  locale: enGB,
                })}
                <br />
                <strong>End:</strong>{' '}
                {format(new Date(alert.end * 1000), "PPPP' at 'HH:mm", {
                  locale: enGB,
                })}
              </p>
              <p className='text-start'>
                {alert.sender_name}
                <br />
                {alert.description}
              </p>
            </div>
          ))}
        </>
      </Fade>
    </article>
  )
}

export default Alerts
