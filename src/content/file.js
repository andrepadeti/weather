/*
I used this small javascript to get rid of irrelevant information from current.city.list.json and
create a smaller cities.json file to use with the Search component
*/

const fs = require('fs')
const big = require('./city.list.json')
// const big = require('./small.json')

let small = []
big.map(item=>{
  // small.push({name: item.name, country: item.country, coord: {lon: item.coord.lon, lat: item.coord.lat}})
  small.push({name: item.name, country: item.country})
  // console.log(`${item.name},${item.country}`)
})

// console.log(small)

const jsonData = JSON.stringify(small)
fs.writeFileSync('./cities.json', jsonData)
