# Weather App

This is my take on the weather app. I'm building it on Gatsby.
I'm also uising [Netlify Functions](https://github.com/netlify/cli/blob/main/docs/netlify-dev.md) to keep api keys secret

## Searchbox

I built three searchbox components:  
- `simpleSearch.js` tries to implement autocomplete from a json file. It's too slow!
- `typeaheadSearch.js` does it a little better for some obscure reason (I `npm install`ed it from the web)
- `search.js` uses google places api. It works wonders! I'm using this one.

## Weather Information  

Weather information comes from the [Open Weather Map](https://openweathermap.org/)

## Rain map

I'm using the rain map from [RainViewer](https://www.rainviewer.com/)  
