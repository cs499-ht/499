import fetch from "node-fetch";
import './loadEnv.js'

let longitude = -73.96;
let latitude = 40.76;
let API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
export const fetchWeather = async () => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely, hourly&appid=${API_KEY}`)
  const data = await res.json();
  const weather = data['current']['weather']
  return weather[0]['description']
}