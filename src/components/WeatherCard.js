import React from "react";
import classes from "../styles/card.module.css";

const WeatherCard = ({ weather }) => {
  //   console.log(weather);
  return (
    <div className={classes.weatherCard}>
      <div className={classes.cardHeader}>
        <div>
          <p className={classes.weatherCity}>
            {weather ? weather.name + " " + weather.sys.country : "-"}
          </p>
          <p className={classes.weatherDesc}>
            {weather ? weather.weather[0].description : "-"}
          </p>
        </div>
        <img
          alt={"weather"}
          className={classes.weatherIcon}
          src={`icons/${weather ? weather.weather[0].icon : "unknown"}.png`}
        />
      </div>
      <div className={classes.cardBody}>
        <h2 className={classes.weatherTemp}>
          {weather ? Math.round(weather.main.temp) : "-"}°F
        </h2>
        <div className={classes.weatherDetails}>
          <div className={classes.parameters}>
            <span className={classes.paramLabel}>Details</span>
          </div>
          <div className={classes.parameters}>
            <span className={classes.paramLabel}>Feels Like</span>
            <span className={classes.paramVal}>
              {weather ? weather.main.feels_like : "-"}°F
            </span>
          </div>
          <div className={classes.parameters}>
            <span className={classes.paramLabel}>Humidity</span>
            <span className={classes.paramVal}>
              {weather ? weather.main.humidity : "-"}%
            </span>
          </div>
          <div className={classes.parameters}>
            <span className={classes.paramLabel}>Pressure</span>
            <span className={classes.paramVal}>
              {weather ? weather.main.pressure : "-"}hPs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
