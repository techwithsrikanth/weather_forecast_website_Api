import React, { useState } from 'react'
import './App.css'

const apiKey = process.env.REACT_APP_API_KEY;


const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const getWeather = () => {
    // Check if the city is not empty before making the API request
    if (city.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    // Fetch weather data based on the city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          setWeatherData(data);
          setError(null);
        } else {
          setError(`City not found: ${data.message}`);
          setWeatherData({});
        }
      })
      .catch(error => {
        setError('An error occurred while fetching weather data');
        setWeatherData({});
      });
  }

  return (
    <div className='container'>
      <h1>Weather App</h1>
      <div className='input'>
        <input
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {error && <p className='error'>{error}</p>}
      {weatherData.main && (
        <div className='weather'>
          <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}&deg;F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}

export default App
