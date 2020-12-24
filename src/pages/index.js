import React, { useState } from "react"

import SEO from "../components/seo"
import Search from "../components/googleSearch"
// import Search from "../components/typeaheadSearch"
// import Search from "../components/simpleSearch"
import Weather from "../components/weather"

import Fade from "react-reveal/Fade"

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
    <>
      <SEO title="Weather App" description="The ultimate weather app!" />
      <div className="container">
        <div className="row mt-5">
          <div className="col-11 mx-auto my-3">
            <Fade delay={300} duration={2000}>
              <h1 className="text-center text-white">Current Weather</h1>
            </Fade>
          </div>
        </div>

        <div className="row">
          <div className="col-11 col-md-5 mx-auto mt-3 mb-5">
            <Fade delay={600} duration={2000}>
              <Search onSuggestSelect={onSuggestSelect} />
            </Fade>
          </div>
        </div>

        <div className="row">
          <div className="col-11 mx-auto">
            {searchComplete && (
              <Weather
                searchData={searchData}
                method={method}
              />
            )}
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}
