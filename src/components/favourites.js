import React from 'react'

const Favourites = ({ favouritesList, handleClickFavourite }) => {
  return (
    <div className='dropdown'>
      <button
        className='btn btn-primary dropdown-toggle'
        type='button'
        id='dropdownFavourites'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Favourites
      </button>
      <ul
        className='dropdown-menu'
        aria-labelledby='dropdownFavourites'
        style={{ margin: 0 }}
      >
        {favouritesList ? (
          favouritesList.map((favourite, index) => (
            <li
              key={index}
              className='dropdown-item'
              onClick={() => handleClickFavourite(favourite)}
            >
              {`${favourite.description.cityName}, ${favourite.description.country}`}
            </li>
          ))
        ) : (
          <li className='dropdown-item'>Empty</li>
        )}
        {/* {favouritesList ? <li>yes</li> : <li>nope</li>}  */}

      </ul>
    </div>
  )
}

export default Favourites
