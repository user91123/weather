import React from "react";
import styles from "../WeatherCard/styles.module.css";
import thermometerIcon from "../../assets/icons/thermometer-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import formatDate from "../../helpers/formatDate";
import { weatherSelector } from "../../redux/slices/weatherSlice";
import { fetchWeather } from "../../redux/slices/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

export default function WeatherCard() {
  const dispatch = useDispatch();
  const { searchValue, weather, status, error } = useSelector(weatherSelector);
  const [date, setDate] = React.useState(formatDate(new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(formatDate(new Date()));
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (!searchValue) return;
    dispatch(fetchWeather({ q: searchValue }));
  }, [dispatch, searchValue]);

  return (
    <div className={styles.card}>
      <div className={styles.cityBlock}>
        <h2 className={styles.cityName}>Krasnodar</h2>
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
          alt="thermometer icon"
        />
        <span className={styles.degrees}>27°C</span>
        {/* <span className={styles.degrees}>IMG icon API</span> */}
      </div>
      <time className={styles.date}>{formatDate(new Date())}</time>
      <div className={styles.addInfo}>
        <p className={styles.addInfoItem}>HUMIDITY</p>
        <p className={styles.addInfoItem}>VISIBILITY</p>
        <p className={styles.addInfoItem}>AIR PRESSURE</p>
        <p className={styles.addInfoItem}>WIND</p>
      </div>
    </div>
  );
}
