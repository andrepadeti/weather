import React from 'react'

const Favourites = ({ favouritesList, handleClickFavourite }) => {
  return (
    <div
      className='mt-3 mb-2 hide-scrollbar'
      style={{
        // height: '20vh',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {favouritesList ? (
        favouritesList.map((favourite, index) => (
          <div
            key={index}
            className='card d-inline-block me-1 text-white bg-gradient bg-dark text-center rounded'
            onClick={() => handleClickFavourite(favourite)}
          >
            <div className='card-body'>
              {`${favourite.description.cityName}, ${favourite.description.country}`}
            </div>
          </div>
        ))
      ) : (
        <div className='card d-inline-block me-1 text-white bg-gradient bg-dark text-center rounded'>
          <div className='card-body'>Empty</div>
        </div>
      )}
    </div>
  )
}

export default Favourites
