import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  XAxis,
  Text,
  Label,
} from 'recharts'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

const Ticks = props => {
  // eslint-disable-next-line
  const { x, y, stroke, fill, payload, index, visibleTicksCount } = props
  return (
    <>
      {/* show first and last ticks only: */}
      {(index === 0 || index === visibleTicksCount - 1) && (
        <g transform={`translate(${x},${y})`}>
          <Text x={0} y={0} dy={16} textAnchor='end' fill={fill}>
            {payload.value}
          </Text>
        </g>
      )}
    </>
  )
}

const Precipitation = ({ data, timezone }) => {
  const [showDetails, setShowDetails] = useState(false)

  let accumulatedPrecipitation = 0

  const formattedData = data.map(item => {
    const epoch = item.dt * 1000
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      hour12: false,
    }
    accumulatedPrecipitation += item.precipitation
    const date = new Date(epoch)
    const time = date.toLocaleTimeString([], options)
    return { name: time, mm: item.precipitation }
  })

  return (
    <>
      {accumulatedPrecipitation > 0 && (
        <div className='my-5'>
          <div className='text-center text-white'>
            <h3>Precipitation</h3>
            <p>{`Expected precipitation for the next hour: ${accumulatedPrecipitation.toFixed()} mm`}</p>
          </div>

          <div
          role='button'
          tabIndex={0}
            className='text-white'
            onClick={() => setShowDetails(!showDetails)}
            onKeyPress={e =>
              e.value === 'Enter' && setShowDetails(!showDetails)
            }
          >
            {showDetails ? (
              <span>
                Hide details
                <FontAwesomeIcon
                  icon={faSortUp}
                  className='align-bottom ms-2'
                />
              </span>
            ) : (
              <span>
                Show details
                <FontAwesomeIcon
                  icon={faSortDown}
                  className='ms-2'
                />
              </span>
            )}
          </div>

          {showDetails && (
            <div className='mt-3' style={{ height: '20vh' }}>
              <ResponsiveContainer>
                <BarChart
                  data={formattedData}
                  stackOffset='silhouette'
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <YAxis allowDecimals={false} domain={['auto', 'auto']}>
                    <Label fill='white' angle={-90} dx={-10}>
                      mm
                    </Label>
                  </YAxis>
                  <XAxis dataKey='name' tick={<Ticks />} />
                  <Tooltip />
                  {/* <CartesianGrid /> */}
                  <Bar type='monotone' dataKey='mm' stroke='#8884d8' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Precipitation
