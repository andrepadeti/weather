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
  margin-top: 150px;
  margin-left: -12px;
  margin-right: -12px;
`
const GradientCover = styled.div`
  width: 100%;
  height: 538px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 3rem;
  // https://css-tricks.com/easing-linear-gradients/
  background: linear-gradient(
    rgba(245, 245, 245, 1) 0px,
    rgba(245, 245, 245, 1) ${props => props.startingLine}px,
    rgba(245, 245, 245, 0.738)
      ${props => props.startingLine + props.length * 0.19}px,
    rgba(245, 245, 245, 0.541)
      ${props => props.startingLine + props.length * 0.34}px,
    rgba(245, 245, 245, 0.382)
      ${props => props.startingLine + props.length * 0.47}px,
    rgba(245, 245, 245, 0.278)
      ${props => props.startingLine + props.length * 0.565}px,
    rgba(245, 245, 245, 0.194)
      ${props => props.startingLine + props.length * 0.65}px,
    rgba(245, 245, 245, 0.126)
      ${props => props.startingLine + props.length * 0.73}px,
    rgba(245, 245, 245, 0.075)
      ${props => props.startingLine + props.length * 0.802}px,
    rgba(245, 245, 245, 0.042)
      ${props => props.startingLine + props.length * 0.861}px,
    rgba(245, 245, 245, 0.021)
      ${props => props.startingLine + props.length * 0.91}px,
    rgba(245, 245, 245, 0.008)
      ${props => props.startingLine + props.length * 0.952}px,
    rgba(245, 245, 245, 0.002)
      ${props => props.startingLine + props.length * 0.982}px,
    rgba(245, 245, 245, 0) ${props => props.startingLine + props.length * 1}px
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
      <article className='d-flex flex-column mb-4'>
        <Fade delay={300}>
          <WeatherImage fluid={fluid}>
            <GradientCover startingLine={202} length={250}>
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
          </WeatherImage>

          <div className='text-center py-2'>
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
          </div>
        </Fade>
      </article>
    </>
  )
}

export default CurrentWeather
