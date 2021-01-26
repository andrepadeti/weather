import React, { useEffect, useState } from 'react'
import Context from '../context/context'

// function imports
import { getCityFromGeolocation, getCityNameAndCountry } from '../utils/api'

// component imports
import SEO from '../components/seo'
import Navigation from '../components/navigation'
import ModalWindow from '../components/modal'
import Weather from '../components/weather'
import Loading from '../components/loading'

import Fade from 'react-reveal/Fade'

export default function Home() {
  const [searchData, setSearchData] = useState({})
  const [searchComplete, setSearchComplete] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

  const onSuggestSelect = suggest => {
    if (suggest) {
      if ('test' in suggest) {
        setSearchData({
          test: true,
          description: { cityName: 'Santo André', country: 'BR' },
          method: 'test',
        })
      } else if ('cityName' in suggest) {
        if (searchData.cityName !== suggest.cityName) {
          setSearchData({ cityName: suggest.cityName, method: 'city name' })
        } else console.log('avoiding unnecessary fetch')
      } else if ('location' in suggest) {
        const lat = suggest.location.lat
        const lng = suggest.location.lng
        const description = suggest.gmaps
          ? getCityNameAndCountry(suggest.gmaps.address_components)
          : suggest.description
        const method = 'geographic coordinates'
        setFavourite(isFavourite({ lat, lng, description }))
        setSearchData({ lat, lng, description, method })
      } else if ('geoNameId' in suggest) {
        if (searchData.geoNameId !== suggest.geoNameId) {
          setSearchData({ geoNameId: suggest.geoNameId, method: 'geoNameId' })
        } else console.log('avoiding unnecessary fetch')
      }
      setSearchComplete(true)
    }
  }

  const handleMarkFavourite = (cityName, area, country) => {
    let auxFavouritesList
    if (favourite) {
      // pull item from favourites list
      auxFavouritesList = JSON.parse(
        localStorage.getItem('weatherAppFavouritesList')
      )
      for (let i = 0; i < auxFavouritesList.length; i++) {
        if (
          auxFavouritesList[i].description.cityName === cityName &&
          auxFavouritesList[i].description.area === area &&
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
    setSearchComplete(false)
    setFavourite(true)
    setSearchData({ lat, lng, description, method: 'geographic coordinates' })
    setSearchComplete(true)
  }

  const handleDeleteFavourites = ({ modalRef }) => {
    localStorage.setItem('weatherAppFavouritesList', null)
    setFavouritesList([])
    setFavourite(false)
    setShowModal(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('geolocation' in navigator) {
        const success = async position => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const method = 'geographic coordinates'
          const response = await getCityFromGeolocation(lat, lng)
          if (response.error) {
            alert("Couldn't fetch current location")
          } else {
            onSuggestSelect({
              location: { lat, lng },
              description: response.description,
            })
          }
        }

        const error = () =>
          alert(
            'Please, allow location access so that next time I can show the weather forecast for your current location.'
          )

        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }

        navigator.geolocation.getCurrentPosition(success, error, options)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Context.Provider
      value={{
        // who uses it:
        favourite, // City
        onSuggestSelect, // Search
        favouritesList,
        handleClickFavourite,
        setShowModal, // Favourites
      }}
    >
      <SEO title='Weather App' description='The ultimate weather app!' />
      <Navigation />
      <ModalWindow
        handleDeleteFavourites={handleDeleteFavourites}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className='container' style={{ maxWidth: '600px' }}>
        <div className='row mt-4'>
          <div className='col-12 mx-auto my-3'>
            <Fade delay={300} duration={2000}>
              <h1 className='text-center display-5'>Weather Forecast</h1>
            </Fade>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 mx-auto'>
            {searchComplete ? (
              <Weather
                searchData={searchData}
                handleMarkFavourite={handleMarkFavourite}
                favourite={favourite}
              />
            ) : (
              <Loading message='Fetching geolocation...' className='mb-5' />
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}
