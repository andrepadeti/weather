# Weather App

This is my take on the weather app. I'm building it on Gatsby.
I'm also uising [Netlify Functions](https://github.com/netlify/cli/blob/main/docs/netlify-dev.md) to keep api keys secret

## Searchbox

I built two searchbox components:  
- `typeaheadSearch.js` implements autocomplete from Open Weather Map Geocoding API. ALternatively, I can use data in a json file.
- `search.js` uses google places api.

## Weather Information  

Weather information comes from the [Open Weather Map](https://openweathermap.org/)

## Rain map

I'm using the rain map from [RainViewer](https://www.rainviewer.com/)  
