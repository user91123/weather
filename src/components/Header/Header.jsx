import React from "react";
import styles from "../Header/styles.module.css";
import weatherIcon from "../../assets/icons/weather-icon.svg";
import DayToggleButtons from "../DayToggleButtons/DayToggleButtons";
import useClock from "../../hooks/useClock";
import { Link } from "react-router-dom";

export default function Header() {
  const time = useClock();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.icon} src={weatherIcon} alt="Wheather icon" />
          <h1 className={styles.title}>YeaWeather</h1>
          <p className={styles.time}>{time}</p>
        </div>
        <nav className={styles.nav}>
          <DayToggleButtons />
          <Link to="/history">Search history</Link>
        </nav>
      </div>
    </div>
  );
}
