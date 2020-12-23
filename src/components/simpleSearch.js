import React, { useState } from "react"

import cities from "../content/cities.json"

const SimpleSearch = props => {
  const [searchText, setSearchText] = useState("")

  const handleOnSubmit = e => {
    searchText.replace(" ", "+")
    props.onSuggestSelect({ cityName: searchText })
    e.preventDefault()
  }

  const handleChange = e => {
    setSearchText(e.target.value)
  }

  return (
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="form-control w-100"
            list="cityList"
            id="city"
            type="text"
            value={searchText}
            onChange={handleChange}
          />
          {/* {searchText.length > 2 && ( */}
          {false && (
            <datalist id="cityList">
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
