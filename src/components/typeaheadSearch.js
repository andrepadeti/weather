import * as React from 'react'
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead'
import axios from 'axios'

import Context from '../context/context'
// import cities from '../content/world-cities.json'

const TypeaheadSearch = props => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [options, setOptions] = React.useState()

  let { placeSelect } = React.useContext(Context)
  const ref = React.useRef()

  const handleOnSubmit = city => {
    if (typeof city !== 'undefined' && city.length > 0) {
      ref.current.blur()
      console.log(city)
      const suggest = {
        location: {
          lat: city[0].lat,
          lng: city[0].lon,
        },
        description: {
          cityName: city[0].name,
          country: city[0].country,
        },
      }
      placeSelect(suggest)
    }
  }

  /*
  [
    {
      "name": "São Paulo",
      "local_names": {
        "af": "São Paulo",
        "ar": "ساو باولو",
        "ascii": "Sao Paulo",
        "bg": "Сао Пауло",
        "ca": "São Paulo",
        "da": "São Paulo",
        "de": "São Paulo",
        "el": "Σάο Πάολο",
        "en": "São Paulo",
        "eu": "Sao Paulo",
        "fa": "سائوپائولو",
        "feature_name": "São Paulo",
        "fi": "São Paulo",
        "fr": "São Paulo",
        "gl": "San Paulo",
        "he": "סאו פאולו",
        "hi": "साओ पाउलो",
        "hu": "São Paulo",
        "id": "São Paulo",
        "it": "San Paolo",
        "ja": "サンパウロ",
        "la": "Urbs Paulistana",
        "lt": "San Paulas",
        "mk": "Сао Паоло",
        "nl": "São Paulo",
        "no": "São Paulo",
        "pl": "São Paulo",
        "pt": "São Paulo",
        "ro": "São Paulo",
        "ru": "Сан-Паулу",
        "sk": "São Paulo",
        "sr": "Сао Пауло",
        "th": "เซาเปาลู",
        "tr": "Sao Paulo",
        "vi": "São Paulo"
      },
      "lat": -23.5475,
      "lon": -46.6361,
      "country": "BR"
    }
  ]
*/

  const renderMenuItemChildren = (item, { text }, index) => (
    <Highlighter search={text}>
      {`${item.name}, ${item.state ? item.state + ',' : ''} ${item.country}`}
    </Highlighter>
  )

  const onSearch = async query => {
    const url = `/.netlify/functions/city`
    const config = {
      params: { query },
    }

    setIsLoading(true)
    let options = []
    try {
      const { data } = await axios(url, config)
      if (data.length > 0) {
        options = data
      }
    } catch (err) {
      options = ['no data']
    } finally {
      setIsLoading(false)
      setOptions(options)
    }
  }

  return (
    <>
      <div>
        <AsyncTypeahead
          id='searchbox'
          placeholder='Search for a city...'
          isLoading={isLoading}
          onSearch={onSearch}
          options={options}
          onChange={handleOnSubmit}
          ref={ref}
          labelKey={option =>
            `${option.name}, ${option.state ? option.state + ',' : ''} ${
              option.country
            }`
          }
          renderMenuItemChildren={renderMenuItemChildren}
          useCache={false}
        />

        {/* <form onSubmit={handleOnSubmit}>
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
        </form> */}
      </div>
    </>
  )
}

export default TypeaheadSearch
