import React, { useRef, useState } from 'react'
import cities from '../../content/cities.json'

const SimpleSearch = props => {
  const [searchText, setSearchText] = useState('')
  const refButton = useRef()

  const handleOnSubmit = e => {
    searchText.replace(' ', '+')
    props.onSuggestSelect({ cityName: searchText })
    refButton.current.blur()
    setSearchText('')
    e.preventDefault()
  }

  return (
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            className='form-control w-100'
            list='cityList'
            id='city'
            type='text'
            placeholder='Search for a city...'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <div className='d-grid mt-1 d-md-none'>
            <button type='submit' className='btn btn-primary' ref={refButton}>
              Submit
            </button>
          </div>
          {/* {searchText.length > 2 && ( */}
          {false && (
            <datalist id='cityList'>
              {cities
                .filter(
                  city =>
                    city.name
                      .normalize()
                      .toLowerCase()
                      .indexOf(searchText.normalize().toLowerCase()) > -1
                )
                .map((filtered, index) => (
                  <option
                    key={index}
                    value={`${filtered.name},${filtered.country}`}
                  >
                    {`${filtered.name},${filtered.country}`}
                  </option>
                ))}
            </datalist>
          )}
        </form>
      </div>
    </>
  )
}

export default SimpleSearch
