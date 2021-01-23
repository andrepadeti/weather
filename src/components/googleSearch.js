import React, { useRef, useContext } from 'react'
import Geosuggest from 'react-geosuggest'
import Context from '../context/context'

const Search = () => {
  let { onSuggestSelect } = useContext(Context)
  const geosuggestEl = useRef(null)

  return (
    <div>
      <Geosuggest
        ref={geosuggestEl}
        types={['(cities)']}
        placeDetailField={['formatted_address']}
        onSuggestSelect={onSuggestSelect}
        autoActivateFirstSuggest={true}
        inputClassName='input'
        suggestsClassName='suggests'
        suggestsHiddenClassName='suggests-hidden'
      />
    </div>
  )
}

export default Search
