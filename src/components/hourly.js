import React from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  CartesianGrid,
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
      {/* show selected ticks: */}
      {(index === 0 ||
        index === visibleTicksCount - 1 ||
        payload.value === '24' ||
        payload.value === '12') && (
        <g transform={`translate(${x},${y})`}>
          <Text x={0} y={0} dy={16} textAnchor='end' fill='#666'>
            {payload.value}
          </Text>
        </g>
      )}
    </>
  )
}

const Hourly = ({ data, timezone }) => {
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
    <div className='my-5'>
      <div className='text-center text-white'>
        <h3>Hourly Forecast</h3>
        <p>for the next 48 hours</p>
      </div>
      <div style={{ height: '20vh'}}>
        <ResponsiveContainer>
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
            />
            <XAxis dataKey='name' tick={<Ticks />} />
            <Tooltip />
            {/* <CartesianGrid /> */}
            <Line
              yAxisId='left'
              type='monotone'
              dot={false}
              name='temperature'
              dataKey='temp'
              stroke='#8884d8'
            />
            <Bar
              yAxisId='right'
              type='monotone'
              dataKey='rain'
              stroke='#8884d8'
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Hourly
