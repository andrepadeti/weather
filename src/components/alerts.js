import React from 'react'
import { format } from 'date-fns'

const Alerts = ({ data, timezone }) => {
  return (
    <article>
      <header>
        {data.map((alert, index) => (
          <div
            key={index}
            className='alert alert-theme alert-dismissible fade show  mb-4'
            role='alert'
          >
            <h5 className='alert-heading'>{alert.event}</h5>
            <button
              type='button'
              class='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
            ></button>
            <p>
              {alert.sender_name}
              <br />
              <strong>Start:</strong>{' '}
              {format(new Date(alert.start * 1000), "PPPP' at 'HH:mm:ss")}
              <br />
              <strong>End:</strong>{' '}
              {format(new Date(alert.end * 1000), "PPPP' at 'HH:mm:ss")}
            </p>
            <p className='text-start'>{alert.description}</p>
          </div>
        ))}
      </header>
    </article>
  )
}

export default Alerts
