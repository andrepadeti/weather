import React from 'react'
import HeadShake from 'react-reveal/HeadShake'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'

const SwipeMessage = ({ scrollPosition }) => {
  return (
    <div style={{ height: '1rem' }}>
      <div className='d-flex align-items-center text-white'>
        {scrollPosition !== 'start' && (
          <div className='me-auto' style={{ width: '1rem' }}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} className='me-3' />
          </div>
        )}
        {/* Swipe */}
        <HeadShake delay={500} duration={2000}>
          <div className='ms-auto' style={{ width: '1rem' }}>
            {scrollPosition !== 'end' && (
              <FontAwesomeIcon icon={faAngleDoubleRight} className='ms-3' />
            )}
          </div>
        </HeadShake>
      </div>
    </div>
  )
}

export default SwipeMessage
