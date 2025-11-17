import React from "react";
import styles from "../WeatherCard/styles.module.css";
import { WeatherCardSkeleton } from "../Skeletons/WeatherCardSkeleton/WeatherCardSkeleton";
import thermometerIcon from "../../assets/icons/thermometer-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import formatDate from "../../helpers/formatDate";
import { saveSearchHistory } from "../../helpers/localeStorage";
import { weatherSelector } from "../../redux/slices/weatherSlice";
import { fetchWeather } from "../../redux/slices/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import NotFoundBlock from "../NotFoundBlock/NotFoundBlock";

export default function WeatherCard() {
  const dispatch = useDispatch();
  const {
    searchValue,
    weather,
    hourlyWeather,
    weatherStatus,
    weatherError,
    day,
  } = useSelector(weatherSelector);
  const [date, setDate] = React.useState(formatDate(new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(formatDate(new Date()));
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  // 1️⃣ Пользовательский поиск
  React.useEffect(() => {
    if (searchValue) {
      dispatch(fetchWeather({ q: searchValue }));
    }
  }, [searchValue, dispatch]);

  // 2️⃣ Автоматический fetch (геолокация / дефолт)
  React.useEffect(() => {
    if (!searchValue) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(
            fetchWeather({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            })
          );
        },
        () => {
          dispatch(fetchWeather({ q: "Krasnodar" }));
        }
      );
    }
  }, [dispatch, searchValue]);

  React.useEffect(() => {
    if (
      weatherStatus === "success" &&
      searchValue &&
      weather?.name?.toLowerCase() === searchValue.toLowerCase()
    ) {
      const timer = setTimeout(() => {
        saveSearchHistory(weather.name, weather);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [weatherStatus, searchValue, weather]);

  if (weatherStatus === "loading") return <WeatherCardSkeleton />;
  if (weatherStatus === "error" && weatherError?.type === "not_found") {
    return <NotFoundBlock />;
  }
  if (weatherStatus === "error") return <p>Error: {weatherError?.message}</p>;

  let displayData = weather;

  if (day === "tomorrow" && hourlyWeather.length > 0) {
    const today = new Date();
    const tomorrowData = hourlyWeather.find((item) => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate.getDate() === today.getDate() + 1;
    });

    if (tomorrowData) {
      displayData = {
        name: weather.name,
        main: tomorrowData.main,
        weather: tomorrowData.weather,
        wind: tomorrowData.wind,
        visibility: tomorrowData.visibility ?? weather.visibility,
      };
    }
  }

  const iconUrl = displayData.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${displayData.weather[0].icon}@2x.png`
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.cityBlock}>
        <h2 className={styles.cityName}>{displayData?.name}</h2>
        <img
          className={styles.locationIcon}
          src={locationIcon}
          alt="Location icon"
        />
      </div>
      <div className={styles.mainInfo}>
        <img
          className={styles.thermometerIcon}
          src={thermometerIcon}
          alt="Thermometer icon"
        />
        <span className={styles.degrees}>
          {Math.round(displayData.main?.temp)}°C
        </span>
        <img className={styles.weatherIcon} src={iconUrl} alt="Weather icon" />
      </div>
      <time className={styles.date}>
        {day === "today" ? formatDate(new Date()) : "Tomorrow"}
      </time>
      <div className={styles.addInfo}>
        <div className={styles.addInfoItem}>
          <span className={styles.label}>HUMIDITY</span>
          <span className={styles.value}>{displayData.main?.humidity} %</span>
        </div>
        <div className={styles.addInfoItem}>
          <span className={styles.label}>VISIBILITY</span>
          <span className={styles.value}>
            {(displayData.visibility / 1000)?.toFixed(1)} km
          </span>
        </div>
        <div className={styles.addInfoItem}>
          <span className={styles.label}>AIR PRESSURE</span>
          <span className={styles.value}>{displayData.main?.pressure} hPa</span>
        </div>
        <div className={styles.addInfoItem}>
          <span className={styles.label}>WIND</span>
          <span className={styles.value}>{displayData.wind?.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}
