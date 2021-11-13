import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import Context from '../context/context'

// function imports
import { getCityFromGeolocation, getCityNameAndCountry } from '../utils/api'
import ls from '../utils/local-storage'

// component imports
import SEO from '../components/seo'
import Navigation from '../components/navigation'
import { DeleteFavouritesModal, GeolocationModal } from '../components/modals'
import Weather from '../components/weather'
import Loading from '../components/loading'

import Fade from 'react-reveal/Fade'

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      // staleTime: 5 * 60 * 1000,
    },
  },
})
// const queryClient = new QueryClient()

export default function Home() {
  const [fetchingGeolocation, setFetchingGeolocation] = useState(true)
  const [showGeolocationModal, setShowGeolocationModal] = useState(false)
  const [searchData, setSearchData] = useState({})
  const [searchComplete, setSearchComplete] = useState(false)
  const [showDeleteFavouritesModal, setShowDeleteFavouritesModal] = useState(
    false
  )
  const [expandNavigation, setExpandNavigation] = useState(false)
  const [favourite, setFavourite] = useState() // for the start icon for the current city on display
  const [favouritesList, setFavouritesList] = useState(
    typeof window !== 'undefined'
      ? ls.get('weatherAppFavouritesList') || [] // if null, set to empty array
      : []
  )

  const placeSelect = suggest => {
    if (suggest) {
      // if ('test' in suggest) {
      //   setSearchData({
      //     test: true,
      //     description: { cityName: 'Santo André', country: 'BR' },
      //     method: 'test',
      //   })
      // } else if ('cityName' in suggest) {
      //   if (searchData.cityName !== suggest.cityName) {
      //     setSearchData({ cityName: suggest.cityName, method: 'city name' })
      //   } else console.log('avoiding unnecessary fetch')
      // } else if ('location' in suggest) {
      // console.log(suggest)
      const lat = suggest.location.lat
      const lng = suggest.location.lng
      // const time = Date.now()
      const description = suggest.gmaps
        ? getCityNameAndCountry(suggest.gmaps.address_components)
        : suggest.description
      const method = 'geographic coordinates'
      setFavourite(isFavourite({ lat, lng, description }))
      // setSearchData({ time, lat, lng, description, method })
      setSearchData({ lat, lng, description, method })
      // } else if ('geoNameId' in suggest) {
      //   if (searchData.geoNameId !== suggest.geoNameId) {
      //     setSearchData({ geoNameId: suggest.geoNameId, method: 'geoNameId' })
      //   } else console.log('avoiding unnecessary fetch')
      // }
      setSearchComplete(true)
    }
  }

  const isFavourite = ({ lat, lng, description }) => {
    if (!favouritesList) return false
    return favouritesList.some(
      item =>
        item.description.cityName === description.cityName &&
        item.description.country === description.country
    )
  }

  const handleMarkFavourite = (cityName, area, country) => {
    let auxFavouritesList = ls.get('weatherAppFavouritesList') || []

    // find item in favourites
    const index = auxFavouritesList.findIndex(
      item =>
        item.description.cityName === cityName &&
        item.description.area === area &&
        item.description.country === country
    )

    if (index >= 0) {
      // pull item from favourites list
      auxFavouritesList.splice(index, 1) // remove the not-anymore-favourite city
    } else {
      // push item to favourites list
      auxFavouritesList.push(searchData)
    }

    ls.set('weatherAppFavouritesList', auxFavouritesList)
    setFavouritesList(auxFavouritesList)
    setFavourite(oldFavourite => !oldFavourite)
  }

  const handleClickFavourite = ({ lat, lng, description }) => {
    setExpandNavigation(prevState => !prevState)
    setSearchComplete(false)
    setFavourite(true)
    setSearchData({ lat, lng, description, method: 'geographic coordinates' })
    setSearchComplete(true)
  }

  const handleDeleteFavourites = ({ modalRef }) => {
    ls.remove('weatherAppFavouritesList')
    setFavouritesList([])
    setFavourite(false)
    setShowDeleteFavouritesModal(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('geolocation' in navigator) {
        const success = async position => {
          setFetchingGeolocation(false)
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const response = await getCityFromGeolocation(lat, lng)
          if (response.error) {
            // console.log("Couldn't fetch from Maps API")
            console.log(response.status)
            setExpandNavigation(true)
          } else {
            placeSelect({
              location: { lat, lng },
              description: response.description,
            })
          }
        }
        const error = () => {
          setFetchingGeolocation(false)
          setShowGeolocationModal(true)
          setExpandNavigation(true)
        }
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
    <QueryClientProvider client={queryClient}>
      <Context.Provider
        value={{
          // who uses it:
          favourite, // City
          placeSelect, // Search
          favouritesList, // Favourites
          handleClickFavourite, // Favourites
          setShowDeleteFavouritesModal, // Favourites
          setExpandNavigation, // Navigation
          searchData, // lastFetch
          setSearchData, // lastFetch
        }}
      >
        <SEO title='Weather App' description='The ultimate weather app!' />
        <div
          className='container bg-primary px-0'
          style={{ maxWidth: '600px' }}
        >
          <Navigation expandNavigation={expandNavigation} />
          <DeleteFavouritesModal
            handleDeleteFavourites={handleDeleteFavourites}
            showModal={showDeleteFavouritesModal}
            setShowModal={setShowDeleteFavouritesModal}
          />
          <GeolocationModal
            showModal={showGeolocationModal}
            setShowModal={setShowGeolocationModal}
          />
          <div className='container'>
            <div className='row mt-4'>
              <div className='col-12 mx-auto my-3'>
                <Fade delay={300} duration={2000}>
                  <h1 className='text-center display-5'>Weather Forecast</h1>
                </Fade>
              </div>
            </div>

            <div className='row'>
              <div className='col-12 mx-auto'>
                {searchComplete && (
                  <Weather
                    searchData={searchData}
                    handleMarkFavourite={handleMarkFavourite}
                    favourite={favourite}
                  />
                )}
                {fetchingGeolocation && (
                  <Loading message='Fetching geolocation...' className='mb-5' />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <ReactQueryDevtools /> */}
      </Context.Provider>
    </QueryClientProvider>
  )
}
