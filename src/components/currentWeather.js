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
  margin-top: 100px;
  margin-left: -16px;
  margin-right: -16px;
`
const GradientCover = styled.div`
  --line: 150px;
  width: 100%;
  height: 488px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 3rem;
  // https://css-tricks.com/easing-linear-gradients/
  background: linear-gradient(
    rgba(245, 245, 245, 1) 0%,
    rgba(245, 245, 245, 1) var(--line),
    rgba(245, 245, 245, 0.738) calc(var(--line) + 19%),
    rgba(245, 245, 245, 0.541) calc(var(--line) + 34%),
    rgba(245, 245, 245, 0.382) calc(var(--line) + 47%),
    rgba(245, 245, 245, 0.278) calc(var(--line) + 56.5%),
    rgba(245, 245, 245, 0.194) calc(var(--line) + 65%),
    rgba(245, 245, 245, 0.126) calc(var(--line) + 73%),
    rgba(245, 245, 245, 0.075) calc(var(--line) + 80.2%),
    rgba(245, 245, 245, 0.042) calc(var(--line) + 86.1%),
    rgba(245, 245, 245, 0.021) calc(var(--line) + 91%),
    rgba(245, 245, 245, 0.008) calc(var(--line) + 95.2%),
    rgba(245, 245, 245, 0.002) calc(var(--line) + 98.2%),
    rgba(245, 245, 245, 0) calc(var(--line) + 100%)
  );
`

const SunTime = styled(Daytime)`
  mix-blend-mode: hard-light;
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
            <div className='d-flex justify-content-evenly align-items-center mb-1'>
              <CurrentTemperature
                current={currentData.temp}
                min={dayData.temp.min}
                max={dayData.temp.max}
                description={currentData.weather}
              />
            </div>
            <div className='text-center'>
              <SunTime
                sunrise={currentData.sunrise}
                sunset={currentData.sunset}
                timezone={timezone}
              />
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
