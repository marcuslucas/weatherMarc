import React from "react";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import classes from "../styles/card.module.css";

const apiKey = "1e653fef7422076284e27d55e5562e53";

// const lat = "51.5073219";
// const lon = "-0.1276474";

const WeatherApp = (props) => {
  const [weather, setWeather] = useState();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const fetchLocation = async (city) => {
    const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    try {
      const weather = await fetch(locationUrl)
        .then((res) => res.json())
        .then((data) => {
          const coordinates = [data[0].lat, data[0].lon];
          return fetchWeather(coordinates);
        });
      return weather;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWeather = async (cords) => {
    const lat = cords[0];
    const lon = cords[1];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    try {
      const weather = await fetch(weatherUrl)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      return weather;
    } catch (err) {
      console.log("Error");
    }
  };

  const handleSubmit = async (city) => {
    const weather = await fetchLocation(city);
    setWeather(weather);
  };
  return (
    <div className={classes.mainContainer}>
      <h1 className={classes.title}>WeatherMarc</h1>
      <div className={classes.inputCity}>
        <input type="text" onChange={handleChange} />
        <button
          onClick={() => {
            handleSubmit(input);
          }}
        >
          Search
        </button>
      </div>
      <WeatherCard weather={weather} />
    </div>
  );
};

export default WeatherApp;
