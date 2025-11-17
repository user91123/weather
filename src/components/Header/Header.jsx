import React from "react";
import styles from "../Header/styles.module.css";
import weatherIcon from "../../assets/icons/weather-icon.svg";
import formatTime from "../../helpers/formatTime";
import { weatherSelector } from "../../redux/slices/weatherSlice";
import { setDay } from "../../redux/slices/weatherSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const { day } = useSelector(weatherSelector);
  const [time, setTime] = React.useState(formatTime(new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const onChangeToday = () => {
    dispatch(setDay("today"));
  };

  const onChangeTomorrow = () => {
    dispatch(setDay("tomorrow"));
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.icon} src={weatherIcon} alt="Wheather icon" />
          <h1 className={styles.title}>YeaWeather</h1>
          <p className={styles.time}>{time}</p>
        </div>
        <nav className={styles.nav}>
          <button
            onClick={onChangeToday}
            className={`${styles.navButton} ${
              day === "today" ? styles.active : ""
            }`}
          >
            Today
          </button>
          <button
            onClick={onChangeTomorrow}
            className={`${styles.navButton} ${
              day === "tomorrow" ? styles.active : ""
            }`}
          >
            Tomorrow
          </button>
          <Link to="/history">Search history</Link>
        </nav>
      </div>
    </div>
  );
}
