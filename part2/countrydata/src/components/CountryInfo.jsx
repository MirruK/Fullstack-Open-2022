import {useEffect, useState} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryInfo = ({ info }) => {
  const [weather, setWeather] = useState({})
  const displayLangs = () => {
    return Object.values(info.languages).map((elem) => <li>{elem}</li>)
  }

  useEffect(()=>{
    const weatherInfo = async () => {
        const geo_loc_url =`https://api.openweathermap.org/geo/1.0/direct?q=${info.capital}&appid=${api_key}` 
        const res1 = await axios.get(geo_loc_url)
        const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${res1.data[0].lat}&lon=${res1.data[0].lon}&appid=${api_key}`
        const res2 = await axios.get(api_url)
        setWeather({
            temperature : res2.data.main.temp-273,
            wind : res2.data.wind.speed,
            icon : `https://openweathermap.org/img/wn/${res2.data.weather[0].icon}@2x.png`})
    }
       if(Object.values(weather) < 2){
        weatherInfo()
       } 
    }, [])

    return (
        <div>
        <h2>{info.name.common}</h2>
        {info.capital}
        <br />
        {info.area}
        <br />
        <h3>Languages:</h3>
        <ul>{displayLangs()}</ul>
        <img src={info.flags.svg} width={128} />
        <h2>Weather in {info.capital}</h2>
        <p>Temperature: {weather.temperature}</p>
        <img src={weather.icon}/>
        <p>Wind Speed: {weather.wind}</p>
        </div>
    )
}

export default CountryInfo
