import React from 'react'
import Search from '../components/googleSearch'
import Favourites from '../components/favourites'

import Fade from 'react-reveal/Fade'

const Navigation = () => {
  return (
    <nav className='navbar navbar-dark navbar-background'>
      <div className='container-fluid' style={{maxWidth: '600px'}}>
        {/* <a className='navbar-brand' href='#'>
          Weather Forecast
        </a> */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <div className='cointainer'>
            <div className='row mt-1'>
              <div className='col-12 mx-auto my-3'>
                <Favourites />
              </div>
            </div>
            <div className='row'>
              <div className='col-12 mx-auto mt-3 mb-5'>
                <Search />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
