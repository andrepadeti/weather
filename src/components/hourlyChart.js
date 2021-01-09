import React, { useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Text,
  Label,
} from 'recharts'

import SwipeMessage from './swipe-message'


// icons to be used in the legend
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faChartBar,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons'

const Ticks = props => {
  // console.log("props")
  // console.log(props)
  // eslint-disable-next-line
  const { x, y, stroke, payload, index, visibleTicksCount } = props
  return (
    <>
      {/* show selected ticks: */}
      {/* {(index === 0 ||
        index === visibleTicksCount - 1 ||
        payload.value === '24' ||
        payload.value === '12') && ( */}
      <g transform={`translate(${x},${y})`}>
        <Text x={0} y={0} dy={16} textAnchor='end' fill='#666'>
          {payload.value}
        </Text>
      </g>
      {/* )} */}
    </>
  )
}

let lastTemperature, showTemperature
const LineLabel = props => {
  const { x, y, stroke, value } = props
  const valueToShow = Math.round(value)

  // if last shown temperature hasn't changed, don't show the same number again
  if (lastTemperature === 'undefined') lastTemperature = valueToShow - 1 // initialise variable if undefined
  showTemperature = lastTemperature !== valueToShow
  lastTemperature = valueToShow

  return (
    <>
      {showTemperature && (
        <text
          x={x}
          y={y}
          dy={-5}
          fill={stroke}
          fontSize={10}
          textAnchor='middle'
        >
          {valueToShow}
        </text>
      )}
    </>
  )
}

let lastPrecipitation, showPrecipitation
const BarLabel = props => {
  const { x, y, stroke, value } = props
  const valueToShow = Math.round(value)

  // if last shown precipitation hasn't changed, don't show the same number again
  if (lastPrecipitation === 'undefined') lastPrecipitation = valueToShow - 1 // initialise variable if undefined
  showPrecipitation = lastPrecipitation !== valueToShow
  lastPrecipitation = valueToShow

  return (
    <>
      {showPrecipitation && valueToShow !== 0 && (
        <text
          x={x}
          y={y}
          dy={-5}
          dx={10}
          fill={stroke}
          fontSize={10}
          textAnchor='middle'
        >
          {valueToShow}
        </text>
      )}
    </>
  )
}

const Hourly = ({ data, timezone }) => {
  const [scrollPosition, setScrollPosition] = useState('start')

  const timeZone = timezone
  const formattedData = data.map(item => {
    const epoch = item.dt * 1000
    const options = {
      hour: '2-digit',
      // minute: '2-digit',
      timeZone,
      hour12: false,
    }
    const date = new Date(epoch)
    const time = date.toLocaleTimeString([], options)
    const rain = item.rain ? item.rain['1h'] : 0
    return { name: time, temp: item.temp, rain }
  })

  const handleScroll = e => {
    const threshold = 15 // number of pixels to consider the start and end of scrolling

    if (e.target.scrollLeft < threshold) {
      setScrollPosition('start')
    } else if (
      e.target.scrollWidth - e.target.scrollLeft <=
      e.target.clientWidth + threshold
    ) {
      setScrollPosition('end')
    } else setScrollPosition('middle')
  }

  return (
    <div className='my-5'>
      <div className='text-center text-white'>
        <h3>Hourly Forecast</h3>
        <div>
          for the next 48 hours
          <br />
          <FontAwesomeIcon icon={faChartLine} className='me-1' />
          Temperature in &#8451;
          <FontAwesomeIcon icon={faChartBar} className='ms-3 me-1' />
          Precipitation in mm
          <br />
        </div>
      </div>

      <div
        className='hide-scrollbar'
        style={{
          height: '20vh',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
        onScroll={e => handleScroll(e)}
      >
        <ResponsiveContainer height='100%' width='300%'>
          <ComposedChart
            data={formattedData}
            stackOffset='silhouette'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <YAxis
              yAxisId='left'
              orientation='left'
              allowDecimals={false}
              domain={[
                dataMin => Math.floor(dataMin) - 2,
                dataMax => Math.ceil(dataMax) + 2,
              ]}
              hide={true}
            >
              <Label stroke='white' angle={-90} dx={-10}>
                temp
              </Label>
            </YAxis>
            <YAxis
              yAxisId='right'
              label={{ value: 'mm', stroke: 'white', angle: -90 }}
              orientation='right'
              allowDecimals={false}
              hide={true}
            />
            <XAxis dataKey='name' tick={<Ticks />} />
            {/* <Tooltip /> */}
            {/* <CartesianGrid /> */}
            <Bar
              yAxisId='right'
              type='monotone'
              dataKey='rain'
              stroke='#8884d8'
              label={<BarLabel stroke='white' />}
            />
            <Line
              yAxisId='left'
              type='monotone'
              dot={false}
              name='temperature'
              dataKey='temp'
              stroke='#8884d8'
              label={<LineLabel stroke='white' />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <SwipeMessage scrollPosition={scrollPosition} />
    </div>
  )
}

export default Hourly
