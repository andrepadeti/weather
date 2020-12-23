import React, { useState } from "react"

// import Search from "../components/search"
// import Search from "../components/typeaheadSearch"
import Search from "../components/simpleSearch"
import Weather from "../components/weather"

export default function Home() {
  const [searchData, setSearchData] = useState({})
  const [searchComplete, setSearchComplete] = useState(false)
  const [method, setMethod] = useState()

  const onSuggestSelect = suggest => {
    if (suggest) {
      if ("cityName" in suggest) {
        if (searchData.cityName !== suggest.cityName) {
          setSearchData({ cityName: suggest.cityName })
          setMethod("city name")
        } else console.log("avoiding unecessary fetch")
      } else if ("location" in suggest) {
        const lat = suggest.location.lat
        const lng = suggest.location.lng
        const description = suggest.description
        if (searchData.lat !== lat) {
          setSearchData({ lat, lng, description })
          setMethod("geographic coordinates")
        } else console.log("avoiding unecessary fetch")
      } else if ("geoNameId" in suggest) {
        if (searchData.geoNameId !== suggest.geoNameId) {
          setSearchData({ geoNameId: suggest.geoNameId })
          setMethod("geoNameId")
        } else console.log("avoiding unecessary fetch")
      }
      setSearchComplete(true)
    }
  }

  return (
    <div className="container bg-info mt-5 rounded" style={{ height: "80vh" }}>
      <div className="row">
        <div className="col-8 mx-auto my-3 border-bottom">
          <h1 className="text-center">Current Weather</h1>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-4 border-end">
          <Search onSuggestSelect={onSuggestSelect} />
        </div>
        <div className="col-4">
          {searchComplete && (
            <Weather searchData={searchData} method={method} />
          )}
        </div>
      </div>
    </div>
  )
}
