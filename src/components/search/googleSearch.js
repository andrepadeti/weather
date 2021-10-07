import React, { useRef, useContext } from 'react'
import Geosuggest from 'react-geosuggest'
import Context from '../../context/context'

const Search = () => {
  let { placeSelect, setExpandNavigation } = useContext(Context)
  const geosuggestRef = useRef(null)

  const handleSelect = suggest => {
    setExpandNavigation(false)
    geosuggestRef.current.clear()
    placeSelect(suggest)
  }

/*
{
  "description": "São Paulo, State of São Paulo, Brazil",
  "isFixture": false,
  "label": "São Paulo, State of São Paulo, Brazil",
  "matchedSubstrings": {
    "length": 9,
    "offset": 0
  },
  "placeId": "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
  "gmaps": {
    "address_components": [
      {
        "long_name": "São Paulo",
        "short_name": "São Paulo",
        "types": [
          "locality",
          "political"
        ]
      },
      {
        "long_name": "São Paulo",
        "short_name": "São Paulo",
        "types": [
          "administrative_area_level_2",
          "political"
        ]
      },
      {
        "long_name": "State of São Paulo",
        "short_name": "SP",
        "types": [
          "administrative_area_level_1",
          "political"
        ]
      },
      {
        "long_name": "Brazil",
        "short_name": "BR",
        "types": [
          "country",
          "political"
        ]
      }
    ],
    "adr_address": "São Paulo, <span class=\"region\">State of São Paulo</span>, <span class=\"country-name\">Brazil</span>",
    "formatted_address": "São Paulo, State of São Paulo, Brazil",
    "geometry": {
      "location": {
        "lat": -23.5557714,
        "lng": -46.6395571
      },
      "viewport": {
        "south": -24.00822091258167,
        "west": -46.82551400498108,
        "north": -23.35660394283147,
        "east": -46.36508442078742
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
    "icon_background_color": "#7B9EB0",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    "name": "São Paulo",
    "photos": [
      {
        "height": 1002,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101117894133031292623\">Matheus</a>"
        ],
        "width": 828
      },
      {
        "height": 598,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101117894133031292623\">Matheus</a>"
        ],
        "width": 828
      },
      {
        "height": 1350,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111711266034065920837\">Paulo Lourenção</a>"
        ],
        "width": 1080
      },
      {
        "height": 3264,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103914970629529217281\">Danielle Sarmento do Prado</a>"
        ],
        "width": 2448
      },
      {
        "height": 3264,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108514913209199156080\">Lucas Silva</a>"
        ],
        "width": 2448
      },
      {
        "height": 977,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102828351628429426951\">Edson Leandro Zoio</a>"
        ],
        "width": 790
      },
      {
        "height": 3472,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117470605057536485871\">Edyelmo Oliveira</a>"
        ],
        "width": 4640
      },
      {
        "height": 3748,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109977846772672170082\">Cezar Filho</a>"
        ],
        "width": 8226
      },
      {
        "height": 705,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117579716652762659919\">Kelechi Jonathan</a>"
        ],
        "width": 716
      },
      {
        "height": 1816,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114147243511855165231\">Chrispim1966 Chrispim</a>"
        ],
        "width": 4032
      }
    ],
    "place_id": "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
    "reference": "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
    "types": [
      "locality",
      "political"
    ],
    "url": "https://maps.google.com/?q=S%C3%A3o+Paulo,+State+of+S%C3%A3o+Paulo,+Brazil&ftid=0x94ce448183a461d1:0x9ba94b08ff335bae",
    "utc_offset": -180,
    "vicinity": "São Paulo",
    "website": "http://www.capital.sp.gov.br/",
    "html_attributions": [],
    "utc_offset_minutes": -180
  },
  "location": {
    "lat": -23.5557714,
    "lng": -46.6395571
  }
}
*/


  return (
    <div>
      <Geosuggest
        ref={geosuggestRef}
        types={['(cities)']}
        placeDetailField={['formatted_address']}
        onSuggestSelect={handleSelect}
        autoActivateFirstSuggest={true}
        inputClassName='input'
        suggestsClassName='suggests'
        suggestsHiddenClassName='suggests-hidden'
      />
    </div>
  )
}

export default Search
