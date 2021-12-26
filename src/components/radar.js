import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'

import Title from './common/title'

const Radar = ({ lat, lng }) => {
  const [showRadarDetails, setShowRadarDetails] = useState(false)

  return (
    <article className='my-5'>
      <Title title='Radar' className='mb-3'>
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
      </Title>

      <Fade left in={showRadarDetails} collapse>
        <div style={{ height: '50vh' }}>
          <iframe
            title='Radar rain map'
            // src={`https://www.rainviewer.com/map.html?loc=${lat},${lng},8&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&rmt=3&c=1&o=83&lm=0&th=1&sm=1&sn=1`}
            src={`https://www.rainviewer.com/map.html?loc=${lat},${lng},8&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&rmt=0&c=1&o=83&lm=0&th=0&sm=1&sn=1`}
            width='100%'
            frameBorder='0'
            style={{ height: '50vh' }}
            allowFullScreen
          ></iframe>
        </div>
      </Fade>
    </article>
  )
}

export default Radar
