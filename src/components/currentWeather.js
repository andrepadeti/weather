import React from 'react'

import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import { UVI } from './itemsWeather'
import { Humidity } from './itemsWeather'
import { Pressure } from './itemsWeather'
import { Wind } from './itemsWeather'
import { CurrentTemperature } from './itemsWeather'
import { Daytime } from './itemsWeather'

const CurrentWeather = ({ currentData, dayData, timezone }) => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 600) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageName = `${currentData.weather[0].icon}.jpg`
  const fluid = allImageSharp.nodes.find(
    n => n.fluid.originalName === imageName
  ).fluid

  return (
    <>
      <article className='d-flex flex-column'>
        <BackgroundImage
          fluid={fluid}
          className='weather-img py-5'
        >
          {/* <Fade spy={currentData} appear> */}
          <div className='d-flex justify-content-evenly align-items-center mb-3'>
            {currentData.weather.map((weather, index) => (
              <div
                key={index}
                className={`d-flex flex-column
                        ${index > 0 && `mb-2`} p-1 opaque`}
                // style={{ width: '5rem' }}
              >
                {/* TODO try to make use of weather-icons instead of ow */}
                <i className={`owf owf-${weather.id} owf-4x text-center text-on-background`}></i>
                {/* <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} /> */}
                <div className='description text-center text-on-background'>
                  {weather.description}
                </div>
              </div>
            ))}
            <CurrentTemperature
              current={currentData.temp}
              min={dayData.temp.min}
              max={dayData.temp.max}
            />
          </div>
          <div className='text-center'>
            <Daytime
              sunrise={currentData.sunrise}
              sunset={currentData.sunset}
              timezone={timezone}
              className='fs-4 opaque px-2 text-on-background'
            />
          </div>
          {/* </Fade> */}
        </BackgroundImage>

        <div className='text-center py-2'>
          {/* <Fade spy={currentData} appear delay={400}> */}
            <h3 className='fw-light mt-5'>Currently</h3>
            <Pressure data={currentData.pressure} />
            <Wind
              data={{
                wind_speed: currentData.wind_speed,
                wind_deg: currentData.wind_deg,
              }}
            />
            <Humidity data={currentData.humidity} />
            <UVI data={currentData.uvi} />
          {/* </Fade> */}
        </div>
      </article>
    </>
  )
}

export default CurrentWeather
