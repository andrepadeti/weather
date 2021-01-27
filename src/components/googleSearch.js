import React, { useRef, useContext } from 'react'
import Geosuggest from 'react-geosuggest'
import Context from '../context/context'

const Search = () => {
  let { onSuggestSelect, setExpandNavigation } = useContext(Context)
  const geosuggestRef = useRef(null)

  const handleSuggestSelect = (suggest) => {
    setExpandNavigation(false)
    geosuggestRef.current.clear()
    onSuggestSelect(suggest)
  }

  return (
    <div>
      <Geosuggest
        ref={geosuggestRef}
        types={['(cities)']}
        placeDetailField={['formatted_address']}
        onSuggestSelect={handleSuggestSelect}
        autoActivateFirstSuggest={true}
        inputClassName='input'
        suggestsClassName='suggests'
        suggestsHiddenClassName='suggests-hidden'
      />
    </div>
  )
}

export default Search
