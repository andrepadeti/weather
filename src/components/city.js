import React, { useContext } from 'react'
import Context from '../context/context'

import Fade from 'react-reveal/Fade'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

const City = props => {
  let { favourite } = useContext(Context)
  const { cityName, area, country } = props.data

  return (
    <Fade spy={cityName} left appear>
      <div className='d-flex justify-content-center align-items-start'>
        <h3 className='text-center fw-light'>
          {cityName}
          {area && area !== cityName && ', ' + area}
          <span className='badge opaque px-2 ms-2'>{country}</span>
          <FontAwesomeIcon
            icon={favourite ? faStarSolid : faStarRegular}
            className='ms-3'
            onClick={() => props.handleMarkFavourite(cityName, area, country)}
          />
        </h3>
      </div>
    </Fade>
  )
}

export default City
