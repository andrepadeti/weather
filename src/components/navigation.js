import React, { useContext } from 'react'
import Context from '../context/context'
import Navbar from 'react-bootstrap/Navbar'

import Search from '../components/googleSearch'
// import Search from "../components/typeaheadSearch"
// import Search from '../components/simpleSearch'
import Favourites from '../components/favourites'

import Fade from 'react-reveal/Fade'

const Navigation = ({ expandNavigation }) => {
  const { setExpandNavigation } = useContext(Context)

  return (
    <Navbar
      onToggle={() => setExpandNavigation(!expandNavigation)}
      className='navbar-background'
      variant='dark'
      expand='xl'
      expanded={expandNavigation}
    >
      <div className='container-fluid' style={{ maxWidth: '600px' }}>
        <Navbar.Toggle aria-controls='navbar' />
        <Navbar.Collapse id='navbar'>
          <div className='container'>
            <div className='row mt-1'>
              <div className='col-12 mx-auto my-3'>
                <Favourites />
              </div>
            </div>
            <div className='row'>
              <div className='col-12 mx-auto my-4'>
                <Search />
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Navigation
