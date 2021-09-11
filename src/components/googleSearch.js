import React, { useRef, useContext } from 'react'
import Geosuggest from 'react-geosuggest'
import Context from '../context/context'

const Search = () => {
  let { placeSelect, setExpandNavigation } = useContext(Context)
  const geosuggestRef = useRef(null)

  const handleSelect = suggest => {
    setExpandNavigation(false)
    geosuggestRef.current.clear()
    placeSelect(suggest)
  }

  return (
    <div>
      <Geosuggest
        ref={geosuggestRef}
        types={['(cities)']}
        placeDetailField={['formatted_address']}
        onSuggestSelect={handleSelect}
        autoActivateFirstSuggest={true}
        inputClassName='input'
        suggestsClassName='suggests'
        suggestsHiddenClassName='suggests-hidden'
      />
    </div>
  )
}

export default Search
