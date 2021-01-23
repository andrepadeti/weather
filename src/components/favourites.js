import React, { useState, useContext } from 'react'
import Context from '../context/context'
import SwipeMessage from './swipe-message'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Favourites = () => {
  let { favouritesList, handleClickFavourite, setShowModal } = useContext(Context)
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
    <article>
      <div className='d-flex justify-content-center'>
        <h3 className='fw-light'>
          Favourites
          {favouritesList.length > 0 && (
            <FontAwesomeIcon
              icon={faTrashAlt}
              className='ms-3 icon'
              size='xs'
              onClick={() => setShowModal(true)}
            />
          )}
        </h3>
      </div>

      {favouritesList.length > 0 ? (
        <>
          <div
            className='mt-3 hide-scrollbar text-center'
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
                className='card d-inline-block me-1 opaque bg-gradient text-center fs-7 rounded'
                style={{ width: '8rem' }}
                onClick={() =>
                  handleClickFavourite({
                    lat: favourite.lat,
                    lng: favourite.lng,
                    description: favourite.description,
                  })
                }
              >
                <div className='card-body '>
                  <p className='mb-0 text-truncate'>
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
        <div className='text-center fs-7'>
          <p>You don't have any favourites yet</p>
        </div>
      )}
    </article>
  )
}

export default Favourites
