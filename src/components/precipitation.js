import React from 'react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  XAxis,
  Text,
  Label,
} from 'recharts'

const Ticks = props => {
  // console.log("props")
  // console.log(props)
  const { x, y, stroke, payload, index, visibleTicksCount } = props
  return (
    <>
      {/* show first and last ticks only: */}
      {(index === 0 || index === visibleTicksCount - 1) && (
        <g transform={`translate(${x},${y})`}>
          <Text x={0} y={0} dy={16} textAnchor='end' fill='#666'>
            {payload.value}
          </Text>
        </g>
      )}
    </>
  )
}

const Precipitation = ({ data, timezone }) => {
  const timeZone = timezone
  const formattedData = data.map(item => {
    const epoch = item.dt * 1000
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
      hour12: false,
    }
    const date = new Date(epoch)
    const time = date.toLocaleTimeString([], options)
    return { name: time, mm: item.precipitation }
  })

  return (
    <div className='my-5'>
      <div className='text-center text-white'>
        <h3>Precipitation</h3>
        <p>Expected precipitation for the next hour</p>
      </div>
      <div style={{ height: '20vh' }}>
        <ResponsiveContainer>
          <AreaChart
            data={formattedData}
            stackOffset='silhouette'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <YAxis allowDecimals={false} domain={['auto', 'auto']}>
              <Label
                stroke='white'
                angle='-90'
                dx={-10}
              >
                mm
              </Label>
            </YAxis>
            <XAxis dataKey='name' tick={<Ticks />} />
            <Tooltip />
            {/* <CartesianGrid /> */}
            <Area type='monotone' dataKey='mm' stroke='#8884d8' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div></div>
    </div>
  )
}

export default Precipitation
