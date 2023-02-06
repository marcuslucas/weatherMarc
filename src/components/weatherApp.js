import React, { useEffect } from "react";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import classes from "../styles/card.module.css";

const apiKey = "1e653fef7422076284e27d55e5562e53";

// const lat = "51.5073219";
// const lon = "-0.1276474";

const WeatherApp = (props) => {
  const [weather, setWeather] = useState();
  const [input, setInput] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const coordinates = [lat, lon];
        const weather = await fetchWeather(coordinates);
        setWeather(weather);
      });
    } else {
      console.log("not available");
    }
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const fetchLocation = async (city) => {
    const locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

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
    const today = new Date();

    const time =
      today.getMonth() +
      1 +
      "/" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();
    setTime(time);
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

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSubmit(input);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <h1 className={classes.title}>WeatherMarc</h1>
      {/* <Clock className={classes.time} format={"HH:mm:ss"} ticking={true} /> */}
      <div className={classes.time}>{time}</div>
      <div className={classes.inputCity}>
        <input onKeyDown={handleKey} type="text" onChange={handleChange} />
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
