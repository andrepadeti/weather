import React, { useState } from 'react'

import SwipeMessage from './swipe-message'

const Favourites = ({ favouritesList, handleClickFavourite }) => {
  const [scrollPosition, setScrollPosition] = useState('start')

  const handleScroll = e => {
    const threshold = 15 // number of pixels to consider the start and end of scrolling

    if (e.target.scrollLeft < threshold) {
      setScrollPosition('start')
    } else if (
      e.target.scrollWidth - e.target.scrollLeft <=
      e.target.clientWidth + threshold
    ) {
      setScrollPosition('end')
    } else setScrollPosition('middle')
  }

  return (
    <div>
      <div className='text-center text-white fw-light'>
        <h3 className='fw-light'>Favourites</h3>
      </div>

      {favouritesList.length > 0 ? (
        <>
          <div
            className='mt-3 mb-2 hide-scrollbar'
            style={{
              // height: '20vh',
              overflowX: 'scroll',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
            }}
            onScroll={e => handleScroll(e)}
          >
            {favouritesList.map((favourite, index) => (
              <div
                key={index}
                className='card d-inline-block me-1 text-white bg-gradient bg-dark text-center rounded text-truncate'
                style={{ width: '10rem' }}
                onClick={() => handleClickFavourite(favourite)}
              >
                <div className='card-body'>
                  <p className='fw-light mb-0'>
                    {favourite.description.cityName}
                    <br />
                    <span className='badge'>
                      {favourite.description.country}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* // TODO: don't show swipe message if not enough cards to swipe */}
          <SwipeMessage scrollPosition={scrollPosition} />
        </>
      ) : (
        <div className='text-white text-center fw-light'>
          <p>Tap the star next to the city name to add</p>
        </div>
      )}
    </div>
  )
}

export default Favourites
