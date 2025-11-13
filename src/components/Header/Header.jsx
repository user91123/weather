import React from "react";
import styles from "../Header/styles.module.css";
import weatherIcon from "../../assets/icons/weather-icon.svg";
import formatTime from "../../helpers/formatTime";

export default function Header() {
  const [time, setTime] = React.useState(formatTime(new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        {/* <Link to="/"> */}
        <div className={styles.logo}>
          <img className={styles.icon} src={weatherIcon} alt="Wheather icon" />
          <h1 className={styles.title}>YeaWeather</h1>
          <p className={styles.time}>{time}</p>
        </div>
        {/* </Link> */}
        <nav className={styles.nav}>
          <a className={styles.navButton} href="/today">
            Today
          </a>
          <a className={styles.navButton} href="/tomorrow">
            Tomorrow
          </a>
          <a className={styles.navButton} href="/monthly-forecast">
            Monthly Forecast
          </a>
        </nav>
      </div>
    </div>
  );
}
