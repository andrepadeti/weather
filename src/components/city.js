import React from 'react'

import Fade from 'react-reveal/Fade'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

const City = ({ cityName, country, handleMarkFavourite, favourite }) => {
  

  return (
    <Fade spy={cityName} left appear>
      <div className='d-flex justify-content-center align-items-start'>
        <h3 className='text-center text-white fw-bold'>
          {`${cityName} `}
          <span className='badge bg-primary px-2'>{`${country}`}</span>
          <FontAwesomeIcon icon={favourite ? faStarSolid : faStarRegular} className='ms-3' onClick={handleMarkFavourite} />
        </h3>
        {/* <div className=''> */}
        {/* </div> */}
      </div>
    </Fade>
  )
}

export default City