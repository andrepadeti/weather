import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Text,
  Label,
} from 'recharts'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons'

const Ticks = props => {
  // eslint-disable-next-line
  const { x, y, stroke, fill, payload, index, visibleTicksCount } = props
  return (
    <>
      {/* show first and last ticks only: */}
      {(index === 0 || index === visibleTicksCount - 1) && (
        <g transform={`translate(${x},${y})`}>
          <Text x={15} y={0} dy={16} textAnchor='end' fill={fill}>
            {payload.value}
          </Text>
        </g>
      )}
    </>
  )
}

const Precipitation = ({ data, timezone }) => {
  const colour = 'lightslategrey'
  const [showPrecipitationDetails, setShowPrecipitationDetails] = useState(
    false
  )

  let accumulatedPrecipitation = 0

  const formattedData = data.map(item => {
    const epoch = item.dt * 1000
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      hour12: false,
    }
    accumulatedPrecipitation += item.precipitation / 60
    const date = new Date(epoch)
    const time = date.toLocaleTimeString([], options)
    return { name: time, mm: item.precipitation }
  })

  return (
    <>
      {accumulatedPrecipitation > 0 && (
        <article className='my-5'>
          <header>
            <h3>Precipitation</h3>
            <div>
              {`within the next hour: ${
                accumulatedPrecipitation > 1
                  ? accumulatedPrecipitation.toFixed()
                  : '< 1'
              } mm`}
            </div>
            <div>
              <FontAwesomeIcon icon={faChartLine} className='me-1' />
              mm per hour
              <br />
            </div>

            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={showPrecipitationDetails}
                onChange={() =>
                  setShowPrecipitationDetails(!showPrecipitationDetails)
                }
                value=''
                id='showPrecipitationDetails'
              />
              <label
                className='form-check-label'
                htmlFor='showPrecipitationDetails'
              >
                Show details
              </label>
            </div>
          </header>

          <Fade left when={showPrecipitationDetails} collapse>
            <div className='mt-3' style={{ height: '20vh' }}>
              <ResponsiveContainer>
                <AreaChart
                  data={formattedData}
                  stackOffset='silhouette'
                  margin={{ top: 0, right: 0, left: -35, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor={colour} stopOpacity={0.8} />
                      <stop offset='95%' stopColor={colour} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis
                    allowDecimals={false}
                    domain={[0, 'auto']}
                    stroke={colour}
                  />
                  <XAxis dataKey='name' tick={<Ticks />} stroke={colour} />
                  <Area
                    type='monotone'
                    dataKey='mm'
                    stroke={colour}
                    dot={false}
                    fillOpacity={1}
                    fill='url(#colorUv)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Fade>
        </article>
      )}
    </>
  )
}

export default Precipitation
