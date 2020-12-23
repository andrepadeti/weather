import React, { useEffect, useRef, useState } from "react"
import { Typeahead, Highlighter } from "react-bootstrap-typeahead"

import cities from "../content/world-cities.json"

const TypeaheadSearch = props => {
  const [singleSelections, setSingleSelections] = useState([])
  const ref = useRef()

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleOnSubmit = city => {
    if (typeof city !== "undefined" && city.length > 0) {
      props.onSuggestSelect({ geoNameId: city[0].geonameid })
    }
  }

  const renderMenuItemChildren = (item, { text }, index) => (
      <Highlighter search={text}>{`${item.name}, ${item.subcountry}, ${item.country}`}</Highlighter>
  )

  return (
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <Typeahead
            id="typeahead"
            labelKey={item => `${item.name}, ${item.subcountry}, ${item.country}`}
            options={cities}
            // onChange={setSingleSelections}
            onChange={handleOnSubmit}
            selected={singleSelections}
            minLength={3}
            highlightOnlyResult={false}
            // maxResults={3}
            renderMenuItemChildren={renderMenuItemChildren}
            ref={ref}
          />
        </form>
      </div>
    </>
  )
}

export default TypeaheadSearch
