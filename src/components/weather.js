import React, { useEffect, useState } from "react"
import getWeather from "../utils/api"

// import icons
import imgDirection from "../images/direction.png"
import imgPressure from "../images/pressure.png"
import imgWind from "../images/wind.png"
import imgTemperature from "../images/temperature.png"

import Fade from "react-reveal/Fade"
import Bounce from "react-reveal/Bounce"

// import Fade from 'react-awesome-reveal'
// import Bounce from 'react-awesome-reveal'

const Weather = ({ searchData, method }) => {
  const [weather, setWeather] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeather(searchData, method)
      if (response.error) {
        alert("Couldn't fetch!")
      } else {
        setWeather(response.jsonData)
        setLoaded(true)
      }
    }
    fetchData()
  }, [searchData, method])

  return (
    <>
      {loaded && (
        <>
          <div>
            <Fade spy={searchData} left appear>
              <h3 className="text-center text-white fw-bold">
                {`${weather.name} `}
                <span className="badge bg-primary text-white px-2">
                  {`${weather.sys.country}`}
                </span>
              </h3>
            </Fade>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-md-evenly">
            <div>
              <Bounce spy={searchData} appear>
                <div className="d-flex justify-content-center my-5">
                  {weather.weather.map((weather, index) => (
                    <div
                      key={index}
                      className={`text-center text-white opaque bg-gradient shadow rounded 
                  ${index > 0 && `ms-2`} p-2`}
                      style={{ width: "150px" }}
                    >
                      <i className={`owf owf-${weather.id} owf-5x`}></i>
                      {/* <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="weather icon"
                  className="img-fluid"
                /> */}

                      <p className="description">{weather.description}</p>
                    </div>
                  ))}
                </div>
              </Bounce>
            </div>

            <div className="text-center text-white py-2 fs-2 ">
              <Fade spy={searchData} left appear delay={300}>
                <p>
                  <img
                    src={imgTemperature}
                    style={{
                      height: "1.2rem",
                      color: "white",
                      filter: "invert(100%)",
                    }}
                    alt="temperature icon"
                  />
                  {` ${weather.main.temp}°C`}
                </p>
              </Fade>
              <Fade spy={searchData} left appear delay={400}>
                <p>
                  <img
                    src={imgPressure}
                    style={{ height: "1.2rem", filter: "invert(100%)" }}
                    alt="pressure icon"
                  />
                  {` ${weather.main.pressure} hPa`}
                </p>
              </Fade>
              <Fade spy={searchData} left appear delay={500}>
                <p>
                  <img
                    src={imgWind}
                    style={{ height: "1.2rem", filter: "invert(100%)" }}
                    alt="wind icon"
                  />
                  {` ${weather.wind.speed} km/h  `}
                  <img
                    src={imgDirection}
                    style={{
                      transform: `rotate(${weather.wind.deg}deg)`,
                      height: "1.2rem",
                      filter: "invert(100%)",
                    }}
                    alt="wind direction"
                  />
                </p>
              </Fade>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Weather
