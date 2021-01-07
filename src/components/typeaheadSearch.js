import React, { useRef } from 'react'
import { Typeahead, Highlighter } from 'react-bootstrap-typeahead'

import cities from '../content/world-cities.json'

const TypeaheadSearch = props => {
  // const [searchText, setSearchText] = useState([])
  const ref = useRef()

  const handleOnSubmit = city => {
    if (typeof city !== 'undefined' && city.length > 0) {
      ref.current.blur()
      props.onSuggestSelect({ geoNameId: city[0].geonameid })
    }
  }

  const renderMenuItemChildren = (item, { text }, index) => (
    <Highlighter
      search={text}
    >{`${item.name}, ${item.subcountry}, ${item.country}`}</Highlighter>
  )

  return (
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <Typeahead
            id='searchbox'
            placeholder='Search for a city...'
            // labelKey={item => `${item.name}, ${item.subcountry}, ${item.country}`}
            labelKey='name'
            options={cities}
            // onChange={(selected) => setSearchText({selected})}
            onChange={handleOnSubmit}
            // selected={searchText}
            minLength={3}
            highlightOnlyResult={false}
            maxResults={4}
            renderMenuItemChildren={renderMenuItemChildren}
            ref={ref}
            // style={{position: 'absolute', overflowY: 'auto'}}
            // positionFixed={true}
          />
        </form>
      </div>
    </>
  )
}

export default TypeaheadSearch
