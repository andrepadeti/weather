import React, { useRef } from "react"
import Geosuggest from "react-geosuggest"

const Search = props => {
  console.log(props)
  const geosuggestEl = useRef(null)

  return (
    <div>
      <Geosuggest
        ref={geosuggestEl}
        types={["(cities)"]}
        placeDetailField={["formatted_address"]}
        onSuggestSelect={props.onSuggestSelect}
        autoActivateFirstSuggest={true}
        inputClassName="input"
        suggestsClassName="suggests"
        suggestsHiddenClassName="suggests-hidden"
      />
    </div>
  )
}

export default Search
