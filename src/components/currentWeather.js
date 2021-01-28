import React from 'react'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import { UVI } from './itemsWeather'
import { Humidity } from './itemsWeather'
import { Pressure } from './itemsWeather'
import { Wind } from './itemsWeather'
import { CurrentTemperature } from './itemsWeather'
import { Daytime } from './itemsWeather'

const WeatherImage = styled(BackgroundImage)`
  height: 338px;
  margin-top: 60px;
  margin-left: -16px;
  margin-right: -16px;
`
const GradientCover = styled.div`
  width: 100%;
  height: 398px;
  // opacity: 1;
  position: absolute;
  top: -60px;
  left: 0;
  padding: 3rem;
  background: linear-gradient(
    // to bottom right,
    rgba(245, 245, 245, 1) 0%,
    rgba(245, 245, 245, 1) 60px,
    // rgba(245, 245, 245, 0.3) 100px,
    rgba(245, 245, 245, 0) 100%
  );
`

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
        <WeatherImage fluid={fluid}>
          {/* <WeatherImage fluid={fluid}> */}
          {/* <Fade spy={currentData} appear> */}
          <GradientCover>
            <div className='d-flex justify-content-evenly align-items-center mb-3'>
              <CurrentTemperature
                current={currentData.temp}
                min={dayData.temp.min}
                max={dayData.temp.max}
                description={currentData.weather}
              />
            </div>
            <div className='text-center'>
              {/* <Daytime
                sunrise={currentData.sunrise}
                sunset={currentData.sunset}
                timezone={timezone}
                className='fs-4 opaque px-2 text-on-background'
              /> */}
            </div>
          </GradientCover>
          {/* </Fade> */}
        </WeatherImage>

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
