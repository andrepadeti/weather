import React from 'react'
import HeadShake from 'react-reveal/HeadShake'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'

const SwipeMessage = ({scrollPosition}) => {
  return (
    <div style={{ height: '1rem' }}>
      <div className='d-flex justify-content-end align-items-center text-white'>
        {scrollPosition !== 'start' && (
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='me-3' />
        )}
        Swipe
        <div style={{ width: '1rem' }}>
          <HeadShake delay={500} duration={2000}>
            {scrollPosition !== 'end' && (
              <FontAwesomeIcon icon={faAngleDoubleRight} className='ms-3' />
            )}
          </HeadShake>
        </div>
      </div>
    </div>
  )
}

export default SwipeMessage
