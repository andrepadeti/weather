import React, { useEffect, useState } from 'react'
import HeadShake from 'react-reveal/HeadShake'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'

const ScrollIcons = ({ scrollEvent }) => {
  const [scrollPosition, setScrollPosition] = useState('start')
  const threshold = 15 // number of pixels to consider the start and end of scrolling

  useEffect(() => {
    if (!scrollEvent) {
      setScrollPosition('start')
    } else if (scrollEvent.target.scrollLeft < threshold) {
      setScrollPosition('start')
    } else if (
      scrollEvent.target.scrollWidth - scrollEvent.target.scrollLeft <=
      scrollEvent.target.clientWidth + threshold
    ) {
      setScrollPosition('end')
    } else setScrollPosition('middle')
  }, [scrollEvent])

  return (
    <div style={{ height: '1rem' }}>
      <div className='d-flex  text-white'>
        {scrollPosition !== 'start' && (
          <div className='me-auto' style={{ width: '1rem' }}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </div>
        )}
        {/* Swipe */}
        <HeadShake delay={500} duration={2000}>
          <div className='ms-auto' style={{ width: '1rem' }}>
            {scrollPosition !== 'end' && (
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            )}
          </div>
        </HeadShake>
      </div>
    </div>
  )
}

export default ScrollIcons
