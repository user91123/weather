import React from "react";
import styles from "../MainWeatherCard/styles.module.css";
import { MainWeatherSkeleton } from "../Skeletons/MainWeatherSkeleton/MainWeatherSkeleton";
import NotFoundBlock from "../NotFoundBlock/NotFoundBlock";
import thermometerIcon from "../../assets/icons/thermometer-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";

import AddInfoItem from "./AddInfoItem";
import useCurrentDate from "../../hooks/useCurrentDate";
import useLoadWeather from "../../hooks/useLoadWeather";

import getDisplayData from "../../helpers/getDisplayData";
import getIconUrl from "../../helpers/getIconUrl";

export default function MainWeatherCard() {
  const currentDate = useCurrentDate();
  const { weather, hourlyWeather, weatherStatus, weatherError, day } =
    useLoadWeather();

  const displayData = getDisplayData(weather, hourlyWeather, day);
  const iconUrl = getIconUrl(displayData?.weather?.[0]?.icon);

  if (weatherStatus === "loading") return <MainWeatherSkeleton />;
  if (weatherStatus === "error" && weatherError?.type === "not_found")
    return <NotFoundBlock />;
  if (weatherStatus === "error") return <p>Error: {weatherError.message}</p>;

  return (
    <div className={styles.card}>
      <div className={styles.cityBlock}>
        <h2 className={styles.cityName}>{displayData.name}</h2>
        <img
          className={styles.locationIcon}
          src={locationIcon}
          alt="Location"
        />
      </div>

      <div className={styles.mainInfo}>
        <img
          src={thermometerIcon}
          className={styles.thermometerIcon}
          alt="Thermometer"
        />
        <span className={styles.degrees}>
          {Math.round(displayData.main?.temp)}°C
        </span>
        <img className={styles.weatherIcon} src={iconUrl} alt="Weather" />
      </div>

      <time className={styles.date}>
        {day === "today" ? currentDate : "Tomorrow"}
      </time>

      <div className={styles.addInfo}>
        <AddInfoItem
          label="HUMIDITY"
          value={`${displayData.main?.humidity} %`}
        />
        <AddInfoItem
          label="VISIBILITY"
          value={`${(displayData.visibility / 1000)?.toFixed(1)} km`}
        />
        <AddInfoItem
          label="AIR PRESSURE"
          value={`${displayData.main?.pressure} hPa`}
        />
        <AddInfoItem label="WIND" value={`${displayData.wind?.speed} m/s`} />
      </div>
    </div>
  );
}
