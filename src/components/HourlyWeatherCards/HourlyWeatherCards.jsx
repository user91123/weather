import styles from "./styles.module.css";
import React from "react";
import { HourlyWeatherCardSkeleton } from "../Skeletons/HourlyWeatherCardSkeleton/HourlyWeatherSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  weatherSelector,
  fetchHourlyWeather,
} from "../../redux/slices/weatherSlice";

export default function HourlyWeatherCards() {
  const dispatch = useDispatch();
  const {
    searchValue,
    hourlyWeather,
    hourlyWeatherStatus,
    weatherStatus,
    weatherError,
    hourlyWeatherError,
  } = useSelector(weatherSelector);

  React.useEffect(() => {
    if (searchValue) {
      dispatch(fetchHourlyWeather({ q: searchValue }));
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          dispatch(fetchHourlyWeather({ lat: latitude, lon: longitude }));
        },
        () => dispatch(fetchHourlyWeather({ q: "Krasnodar" }))
      );
    }
  }, [dispatch, searchValue]);

  if (hourlyWeatherStatus === "loading") return <HourlyWeatherCardSkeleton />;
  if (weatherStatus === "error" && weatherError?.type === "not_found") {
    return;
  }

  if (weatherStatus === "error") return <p>Error: {weatherError?.message}</p>;

  return (
    <div className={styles.container}>
      {hourlyWeather.slice(0, 9).map((item, index) => {
        const iconUrl = item.weather?.[0]?.icon
          ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
          : null;

        return (
          <div key={index} className={styles.hourCard}>
            <span className={styles.time}>
              {new Date(item.dt * 1000).getHours()}:00
            </span>
            <img
              className={styles.weatherIcon}
              src={iconUrl}
              alt={item.weather[0]?.description || "Weather icon"}
            />
            <span className={styles.degrees}>
              {Math.round(item.main.temp)}°C
            </span>
          </div>
        );
      })}
    </div>
  );
}
