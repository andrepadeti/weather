import React, { useEffect, useState } from "react"
import getWeather from "../utils/api"

// import icons
import imgDirection from "../images/direction.png"
import imgPressure from "../images/pressure.png"
import imgWind from "../images/wind.png"
import imgTemperature from "../images/temperature.png"

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
        <div>
          <p>
            {`${weather.name} `}
            <span className="rounded-pill bg-primary text-white px-2">
              {`${weather.sys.country}`}
            </span>
          </p>

          <div className="d-flex justify-content-start">
            {weather.weather.map((weather, index) => (
              <div
                key={index}
                className="text-center bg-info bg-gradient rounded ms-2 p-2"
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
          <p>
            <img
              src={imgTemperature}
              style={{ height: "1.2rem" }}
              alt="temperature icon"
            />
            {` ${weather.main.temp}°C`}
          </p>
          <p>
            <img
              src={imgPressure}
              style={{ height: "1.2rem" }}
              alt="pressure icon"
            />
            {` ${weather.main.pressure} hPa`}
          </p>
          <p>
            <img src={imgWind} style={{ height: "1.2rem" }} alt="wind icon" />
            {` ${weather.wind.speed} km/h  `}
            <img
              src={imgDirection}
              style={{
                transform: `rotate(${weather.wind.deg}deg)`,
                height: "1.2rem",
              }}
              alt="wind direction"
            />
          </p>
        </div>
      )}
    </>
  )
}

export default Weather
