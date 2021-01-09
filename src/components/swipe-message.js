import React from 'react'
import Shake from 'react-reveal/Shake'
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
          <Shake delay={2000} duration={2000}>
            {scrollPosition !== 'end' && (
              <FontAwesomeIcon icon={faAngleDoubleRight} className='ms-3' />
            )}
          </Shake>
        </div>
      </div>
    </div>
  )
}

export default SwipeMessage
