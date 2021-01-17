import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'

const Radar = ({ lat, lng }) => {
  const [showRadarDetails, setShowRadarDetails] = useState(false)

  return (
    <>
      <div className='my-5'>
        <div className='d-flex flex-column align-items-center text-white fw-light mb-3'>
          <h3 className='fw-light'>Radar</h3>
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
        </div>

        <Fade left when={showRadarDetails} collapse>
          <iframe
            src={`https://www.rainviewer.com/map.html?loc=${lat},${lng},8&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&rmt=3&c=1&o=83&lm=0&th=1&sm=1&sn=1`}
            width='100%'
            frameBorder='0'
            style={{ height: '50vh' }}
            allowFullScreen
          ></iframe>
        </Fade>
      </div>
    </>
  )
}

export default Radar
