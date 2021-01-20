import React, { useEffect, useState } from 'react'

import { getCityFromGeolocation } from '../utils/api'

import SEO from '../components/seo'
import Search from '../components/googleSearch'
// import Search from "../components/typeaheadSearch"
// import Search from '../components/simpleSearch'
import Weather from '../components/weather'
import Favourites from '../components/favourites'
import Loading from '../components/loading'

import Fade from 'react-reveal/Fade'

export default function Home() {
  const [searchData, setSearchData] = useState({})
  const [searchComplete, setSearchComplete] = useState(false)
  const [method, setMethod] = useState()
  const [favourite, setFavourite] = useState() // for the start icon for the current city on display
  const [favouritesList, setFavouritesList] = useState(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('weatherAppFavouritesList')) || [] // if null, set to empty array
      : []
  )

  const isFavourite = ({ lat, lng, description }) => {
    if (!favouritesList) return false
    return favouritesList.some(
      item =>
        item.description.cityName === description.cityName &&
        item.description.country === description.country
    )
  }

  const getDescription = suggest => {
    const fullDescription = suggest.gmaps.address_components
    let description = {}
    description.cityName = fullDescription[0].long_name
    fullDescription.forEach(component => {
      if (component.types[0] === 'country') {
        description.country = component.short_name
      }
    })
    return description
  }

  const onSuggestSelect = suggest => {
    // console.log(JSON.stringify(suggest))
    if (suggest) {
      if ('test' in suggest) {
        setSearchData({
          test: true,
          description: { cityName: 'Santo André', country: 'BR' },
        })
        setMethod('test')
      } else if ('cityName' in suggest) {
        if (searchData.cityName !== suggest.cityName) {
          setSearchData({ cityName: suggest.cityName })
          setMethod('city name')
        } else console.log('avoiding unnecessary fetch')
      } else if ('location' in suggest) {
        const lat = suggest.location.lat
        const lng = suggest.location.lng
        const description = getDescription(suggest)
        setFavourite(isFavourite({ lat, lng, description }))
        setSearchData({ lat, lng, description })
        setMethod('geographic coordinates')
      } else if ('geoNameId' in suggest) {
        if (searchData.geoNameId !== suggest.geoNameId) {
          setSearchData({ geoNameId: suggest.geoNameId })
          setMethod('geoNameId')
        } else console.log('avoiding unnecessary fetch')
      }
      setSearchComplete(true)
    }
  }

  const handleMarkFavourite = (cityName, country) => {
    let auxFavouritesList
    if (favourite) {
      // pull item from favourites list
      auxFavouritesList = JSON.parse(
        localStorage.getItem('weatherAppFavouritesList')
      )
      for (let i = 0; i < auxFavouritesList.length; i++) {
        if (
          auxFavouritesList[i].description.cityName === cityName &&
          auxFavouritesList[i].description.country === country
        )
          auxFavouritesList.splice(i, 1) // remove the not-anymore-favourite city
      }
    } else {
      // push item to favourites list
      auxFavouritesList = JSON.parse(
        localStorage.getItem('weatherAppFavouritesList')
      )
      if (auxFavouritesList === null) auxFavouritesList = [] // in case localstorage hasn't been created yet
      auxFavouritesList.push(searchData)
    }
    localStorage.setItem(
      'weatherAppFavouritesList',
      JSON.stringify(auxFavouritesList)
    )
    setFavouritesList(
      JSON.parse(localStorage.getItem('weatherAppFavouritesList'))
    )

    setFavourite(!favourite)
  }

  const handleClickFavourite = ({ lat, lng, description }) => {
    setFavourite(true)
    setSearchData({ lat, lng, description })
    setMethod('geographic coordinates')
    setSearchComplete(true)
  }

  const handleDeleteFavourites = () => {
    localStorage.setItem('weatherAppFavouritesList', null)
    setFavouritesList([])
    setFavourite(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('geolocation' in navigator) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }

        navigator.geolocation.getCurrentPosition(
          async position => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const response = await getCityFromGeolocation(lat, lng)
            if (response.error) {
              alert("Couldn't fetch current location")
            } else {
              setFavourite(
                isFavourite({ lat, lng, description: response.description })
              )
              setSearchData({ lat, lng, description: response.description })
              setMethod('geographic coordinates')
              setSearchComplete(true)
            }
          },
          () =>
            alert(
              'Please, allow location access so that next time I can show the weather forecast for your current location.'
            ),
          options
        )
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SEO title='Weather App' description='The ultimate weather app!' />
      <div className='container'>
        <div className='row mt-1'>
          <div className='col-11 mx-auto my-3'>
            <Favourites
              favouritesList={favouritesList}
              handleClickFavourite={handleClickFavourite}
              handleDeleteFavourites={handleDeleteFavourites}
            />
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-11 mx-auto my-3'>
            <Fade delay={300} duration={2000}>
              <h1 className='text-center display-5'>Weather Forecast</h1>
            </Fade>
          </div>
        </div>

        <div className='row'>
          <div className='col-11 col-md-5 mx-auto mt-3 mb-5'>
            <Fade delay={600} duration={2000}>
              <Search onSuggestSelect={onSuggestSelect} />
            </Fade>
          </div>
        </div>

        <div className='row'>
          <div className='col-11 mx-auto'>
            {searchComplete ? (
              <Weather
                searchData={searchData}
                method={method}
                handleMarkFavourite={handleMarkFavourite}
                favourite={favourite}
              />
            ) : (
              <Loading message='Fetching geolocation...' />
            )}
          </div>
        </div>
      </div>
      <div></div>
    </>
  )
}
