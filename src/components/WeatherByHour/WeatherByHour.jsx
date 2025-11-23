import React from "react";
import styles from "./styles.module.css";
import HourCard from "./HourCard";
import WeatherByHourSkeleton from "../Skeletons/WeatherByHourSkeleton/WeatherByHourSkeleton";
import useLoadWeather from "../../hooks/useLoadWeather";

export default function WeatherByHour() {
  const { hourlyWeather, hourlyWeatherStatus, weatherStatus, weatherError } =
    useLoadWeather();

  if (hourlyWeatherStatus === "loading") return <WeatherByHourSkeleton />;
  if (weatherStatus === "error" && weatherError?.type === "not_found")
    return null;
  if (weatherStatus === "error") return <p>Error: {weatherError.message}</p>;

  return (
    <div className={styles.container}>
      {hourlyWeather.slice(0, 9).map((item, index) => (
        <HourCard key={index} item={item} />
      ))}
    </div>
  );
}
