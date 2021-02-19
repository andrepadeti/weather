import React, { useState, useContext, useRef } from 'react'
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
  const [showScroll, setShowScroll] = useState(false)

  // checks whether to show ScrollIcons depending on the total width of favourites buttons
  // ref implementation from https://www.robinwieruch.de/react-ref
  const ref = node => {
    if (!node) return
    // wait a little until map() is over
    setTimeout(() => {
      const { width } = node.getBoundingClientRect()
      console.log('width: ' + width)
      const windowWidth = window && window.innerWidth
      setShowScroll(windowWidth < width || width > 600)
    }, 200)
  }

  return (
    <article>
      <h3 className='fw-light text-center'>Favourites</h3>
      <div
        className='text-center'
        role='button'
        tabIndex={0}
        onClick={() => setShowDeleteFavouritesModal(true)}
        onKeyDown={e => e.key === 'Enter' && setShowDeleteFavouritesModal(true)}
      >
        {favouritesList.length > 0 && (
          <>
            <span>Delete all</span>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className='icon justify-self-end ms-3'
            />
          </>
        )}
      </div>

      {favouritesList.length > 0 ? (
        <>
          <div
            className='mt-3 hide-scrollbar text-center'
            style={{
              // height: '20vh',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
            }}
            onScroll={e => {
              e.persist()
              setScrollEvent(e)
            }}
          >
            <span ref={ref}>
              {favouritesList.map((favourite, index) => (
                <button
                  key={index}
                  className='btn btn-primary d-inline-block me-2 bg-gradient fs-7 rounded'
                  style={{ width: '8rem', height: '5rem' }}
                  onClick={() =>
                    handleClickFavourite({
                      lat: favourite.lat,
                      lng: favourite.lng,
                      description: favourite.description,
                    })
                  }
                >
                  <p className='mb-0 text-truncate'>
                    {favourite.description.cityName}
                    {favourite.description.area &&
                      favourite.description.area !==
                        favourite.description.cityName && (
                        <span>{`, ${favourite.description.area}`}</span>
                      )}
                    <br />
                    <span className='badge opaque'>
                      {favourite.description.country}
                    </span>
                  </p>
                </button>
              ))}
            </span>
          </div>
          {showScroll ? (
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
