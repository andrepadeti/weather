import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'

const Radar = ({ lat, lng }) => {
  const [showRadarDetails, setShowRadarDetails] = useState(false)

  return (
    <Fade delay={300}>
      <article className='my-5'>
        <header className='mb-3'>
          <h3>Radar</h3>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={showRadarDetails}
              onChange={() => setShowRadarDetails(!showRadarDetails)}
              value=''
              id='showRadarDetails'
            />
            <label className='form-check-label' htmlFor='showRadarDetails'>
              Show rain map
            </label>
          </div>
        </header>

        <Fade left in={showRadarDetails} mountOnEnter={true} collapse>
          <div style={{ height: '50vh' }}>
            <iframe
              title='Radar rain map'
              src={`https://www.rainviewer.com/map.html?loc=${lat},${lng},8&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&rmt=3&c=1&o=83&lm=0&th=1&sm=1&sn=1`}
              width='100%'
              frameBorder='0'
              style={{ height: '50vh' }}
              allowFullScreen
            ></iframe>
          </div>
        </Fade>
      </article>
    </Fade>
  )
}

export default Radar
