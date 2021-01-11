import React from 'react'

const Favourites = ({ favouritesList }) => {
  return (
    <>
      {favouritesList &&
        favouritesList.map((favourite, index) => 
          <p key={index} className='text-white'>{favourite.description.cityName}</p>
        )}
    </>
  )
}

export default Favourites
