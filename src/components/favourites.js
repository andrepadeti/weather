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
  const [showScroll, setShowScroll] = useState(false)

  // checks whether to show ScrollIcons depending on the total width of favourites buttons
  // ref implementation from https://www.robinwieruch.de/react-ref
  const ref = node => {
    if (!node) return
    // wait a little until map() is over
    setTimeout(() => {
      const { width } = node.getBoundingClientRect()
      const windowWidth = window && window.innerWidth
      console.log(width)
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
              // maxWidth: '580px',
              // height: '20vh',
              overflowX: 'auto',
              overflowY: 'hidden',
              // whiteSpace: 'nowrap',
            }}
            onScroll={e => {
              e.persist()
              setScrollEvent(e)
            }}
          >
            <span ref={ref} 
              className="d-flex gap-2 flex-wrap justify-content-center"
              style={{
              // maxWidth: '580px',
              // height: '20vh',
              overflowX: 'auto',
              overflowY: 'hidden',
              // whiteSpace: 'nowrap',
            }} >
              {favouritesList.map((favourite, index) => {
                const { lat, lng, description } = favourite
                const { cityName, area, country } = description
                return (
                  <button
                    key={index}
                    className='btn btn-primary d-inline-block bg-gradient fs-7 rounded'
                    style={{ width: '8rem', height: '5rem' }}
                    onClick={() =>
                      handleClickFavourite({
                        lat,
                        lng,
                        description,
                      })
                    }
                  >
                    <p className='mb-0 text-truncate'>
                      {cityName}
                      {area && area !== cityName && <span>{`, ${area}`}</span>}
                      <br />
                      <span className='badge opaque'>{country}</span>
                    </p>
                  </button>
                )
              })}
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
