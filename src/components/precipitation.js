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
    accumulatedPrecipitation += item.precipitation / 60
    const date = new Date(epoch)
    const time = date.toLocaleTimeString([], options)
    return { name: time, mm: item.precipitation }
  })

  return (
    <>
      {accumulatedPrecipitation > 0 && (
        <div className='my-5'>
          <div className='d-flex flex-column align-items-center text-white fw-light'>
            <h3 className='fw-light'>Precipitation</h3>
            <div>{`within the next hour: ${
              accumulatedPrecipitation > 1
                ? accumulatedPrecipitation.toFixed()
                : '<1'
            } mm`}</div>

            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={showDetails}
                onChange={() => setShowDetails(!showDetails)}
                value=''
                id='showDetails'
              />
              <label className='form-check-label' htmlFor='showDetails'>
                Show details
              </label>
            </div>
          </div>

          <Fade left when={showDetails} collapse>
            <div className='mt-3' style={{ height: '20vh' }}>
              <ResponsiveContainer>
                <AreaChart
                  data={formattedData}
                  stackOffset='silhouette'
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis allowDecimals={false} domain={[0, 'auto']}>
                    <Label fill='white' angle={-90} dx={-10}>
                      mm
                    </Label>
                  </YAxis>
                  <XAxis dataKey='name' tick={<Ticks />} />
                  <Area
                    type='monotone'
                    dataKey='mm'
                    stroke='#8884d8'
                    dot={false}
                    fillOpacity={1}
                    fill='url(#colorUv)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Fade>
        </div>
      )}
    </>
  )
}

export default Precipitation
