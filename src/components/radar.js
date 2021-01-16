import React, { useState } from 'react'

const Radar = ({ lat, lng }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <div className='my-5'>
        <div className='d-flex flex-column align-items-center text-white fw-light mb-3'>
          <h3 className='fw-light'>Radar</h3>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={showDetails}
              onChange={() => setShowDetails(!showDetails)}
              value=''
              id='showDetails'
            />
            <label className='form-check-label' htmlFor='showDetails'>
              Show rain map
            </label>
          </div>
        </div>

        {showDetails && (
          <iframe
            src={`https://www.rainviewer.com/map.html?loc=${lat},${lng},8&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&rmt=3&c=1&o=83&lm=0&th=1&sm=1&sn=1`}
            width='100%'
            frameBorder='0'
            style={{ height: '50vh' }}
            allowFullScreen
          ></iframe>
        )}
      </div>
    </>
  )
}

export default Radar
