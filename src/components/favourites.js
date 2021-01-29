import React, { useState, useContext } from 'react'
import Context from '../context/context'
import ScrollIcons from './scrollIcons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Favourites = () => {
  let {
    favouritesList,
    handleClickFavourite,
    setShowDeleteFavouritesModal,
  } = useContext(Context)
  const [scrollEvent, setScrollEvent] = useState(null)

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
              onClick={() => setShowDeleteFavouritesModal(true)}
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
            onScroll={e => {
              e.persist()
              setScrollEvent(e)
            }}
          >
            {favouritesList.map((favourite, index) => (
              <div
                key={index}
                className='card d-inline-block me-1 bg-primary bg-gradient text-center fs-7 rounded'
                style={{ width: '8rem' }}
                role='button'
                tabIndex={0}
                onClick={() =>
                  handleClickFavourite({
                    lat: favourite.lat,
                    lng: favourite.lng,
                    description: favourite.description,
                  })
                }
                onKeyDown={() =>
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
                    <span className='badge opaque'>
                      {favourite.description.country}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* // TODO: don't show swipe message if not enough cards to swipe */}
          {favouritesList.length > 2 ? (
            <ScrollIcons scrollEvent={scrollEvent} />
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
