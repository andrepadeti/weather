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

// eslint-disable-next-line no-unused-vars
import { throttle } from 'lodash'

import ScrollIcons from './scrollIcons'

// icons to be used in the legend
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons'

const Ticks = props => {
  // eslint-disable-next-line
  const { x, y, stroke, payload, index, visibleTicksCount } = props

  return (
    <>
      {/* show selected ticks: */}
      {(index === 0 ||
        index === visibleTicksCount - 1 ||
        parseInt(payload.value) % 2 === 0) && (
        <g transform={`translate(${x},${y})`}>
          <Text x={8} y={0} dy={16} textAnchor='end' fill={stroke}>
            {payload.value}
          </Text>
        </g>
      )}
    </>
  )
}

let lastTemperature
const LineLabel = props => {
  const { x, y, stroke, value } = props
  const valueToShow = Math.round(value)

  // if last shown temperature hasn't changed, don't show the same number again
  if (lastTemperature === 'undefined') lastTemperature = valueToShow - 1 // initialise variable if undefined
  const showTemperature = lastTemperature !== valueToShow
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

let lastPrecipitation
const BarLabel = props => {
  const { x, y, stroke, value } = props
  const valueToShow = Math.round(value)

  // if last shown precipitation hasn't changed, don't show the same number again
  if (lastPrecipitation === 'undefined') lastPrecipitation = valueToShow - 1 // initialise variable if undefined
  const showPrecipitation = lastPrecipitation !== valueToShow
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

/**
 * Wrapper component 
 * 
 * I had a problem. BarLabel and LineLabel components were rerendering too many times!
 * Then I read this article by Kent C Dodds:
 * https://kentcdodds.com/blog/optimize-react-re-renders
 * It suggests doing the following:
 * 1) "Lift" the expensive component to a parent where it will be rendered less often.
 * 2) Then pass the expensive component down as a prop.
 * and so I did!
 */
const Wrapper = ({ children }) => {
  const [scrollEvent, setScrollEvent] = useState(null)

  return (
    <article className='my-5'>
      <header>
        <h3>Hourly Forecast</h3>
        <div>for the next 48 hours</div>
        <div>
          <FontAwesomeIcon icon={faChartLine} className='me-1' />
          Temperature in &#8451;
          <FontAwesomeIcon icon={faChartBar} className='ms-3 me-1' />
          Precipitation in mm
        </div>
      </header>

      <div
        className='hide-scrollbar'
        style={{
          height: '20vh',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
        onScroll={e => {
          e.persist()
          setScrollEvent(e)
        }}
      >
        {children}
      </div>

      <ScrollIcons scrollEvent={scrollEvent} />
    </article>
  )
}

const Hourly = ({ data, timezone }) => {
  const lineColour = 'darkslategrey'
  const barColour = {
    stroke: 'lightslategrey',
    fill: 'lightslategrey',
    label: 'slategrey',
  }

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

  return (
    <Wrapper>
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
              dataMin => Math.floor(dataMin) - 3,
              dataMax => Math.ceil(dataMax) + 3,
            ]}
            hide={true}
          >
            <Label stroke='white' angle={-90} dx={-10}>
              temp
            </Label>
          </YAxis>
          <YAxis
            yAxisId='right'
            orientation='right'
            allowDecimals={false}
            domain={[0, dataMax => Math.floor((dataMax + 1) * 1.5)]}
            hide={true}
            label={{ value: 'mm', stroke: 'white', angle: -90 }}
          />
          <XAxis
            dataKey='name'
            tick={<Ticks stroke={lineColour} />}
            stroke={lineColour}
          />
          {/* <Tooltip /> */}
          {/* <CartesianGrid /> */}
          <Bar
            yAxisId='right'
            type='monotone'
            dataKey='rain'
            stroke={barColour.stroke}
            fill={barColour.fill}
            label={<BarLabel stroke={barColour.label} />}
          />
          <Line
            yAxisId='left'
            type='monotone'
            dot={false}
            name='temperature'
            dataKey='temp'
            stroke={lineColour}
            label={<LineLabel stroke={lineColour} />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}

export default Hourly
