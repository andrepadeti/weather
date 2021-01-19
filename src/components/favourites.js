import React, { useState } from 'react'

import SwipeMessage from './swipe-message'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Favourites = ({
  favouritesList,
  handleClickFavourite,
  handleDeleteFavourites,
}) => {
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
      <div className='d-flex justify-content-center text-white'>
        <h3 className='fw-light'>
          Favourites
          <FontAwesomeIcon
            icon={faTrashAlt}
            className='ms-3'
            size='xs'
            onClick={handleDeleteFavourites}
          />
        </h3>
      </div>

      {favouritesList.length > 0 ? (
        <>
          <div
            className='mt-3 mb-2 hide-scrollbar text-center'
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
                className='card d-inline-block me-1 text-white opaque bg-gradient text-center rounded'
                style={{ width: '10rem' }}
                onClick={() => handleClickFavourite(favourite)}
              >
                <div className='card-body '>
                  <p className='fw-light mb-0 text-truncate'>
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
          {favouritesList.length > 2 ? (
            <SwipeMessage scrollPosition={scrollPosition} />
          ) : (
            <div style={{ width: '1rem' }} />
          )}
        </>
      ) : (
        <div className='text-white text-center fw-light'>
          <p>You don't have any favourites yet</p>
        </div>
      )}
    </div>
  )
}

export default Favourites
