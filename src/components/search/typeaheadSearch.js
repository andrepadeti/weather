import * as React from 'react'
import {
  Typeahead,
  AsyncTypeahead,
  Highlighter,
} from 'react-bootstrap-typeahead'
import axios from 'axios'

import Context from '../../context/context'
import cities from '../../content/cities.json'

/* IMPORTANT: Search from json file or search online? */
const SEARCH_ONLINE = true

const TypeaheadSearch = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [options, setOptions] = React.useState()

  let { placeSelect } = React.useContext(Context)
  const ref = React.useRef()

  const handleOnSubmit = city => {
    console.log(city)
    if (typeof city !== 'undefined' && city.length > 0) {
      ref.current.blur()
      console.log(city)
      const suggest = {
        location: {
          lat: city[0].lat,
          lng: city[0].lon || city[0].lng,
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

  if (SEARCH_ONLINE) {
    return (
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
      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={handleOnSubmit}>
          <Typeahead
            id='searchbox'
            placeholder='Search for a city...'
            labelKey='name'
            options={cities}
            onChange={handleOnSubmit}
            minLength={3}
            highlightOnlyResult={false}
            maxResults={4}
            renderMenuItemChildren={renderMenuItemChildren}
            ref={ref}
            // options I've been testing:
            // labelKey={item => `${item.name}, ${item.subcountry}, ${item.country}`}
            // onChange={(selected) => setSearchText({selected})}
            // selected={searchText}
            // style={{position: 'absolute', overflowY: 'auto'}}
            // positionFixed={true}
          />
        </form>
      </div>
    )
  }
}

export default TypeaheadSearch
