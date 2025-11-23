import React from "react";
import styles from "./styles.module.css";

export default function HistoryCard({ entry, onClick }) {
  const { city, weather, timestamp } = entry;

  return (
    <div className={styles.card} onClick={() => onClick(city)}>
      <h2>{city}</h2>
      <p>
        {Math.round(weather.main?.temp)}°C, {weather.weather?.[0]?.description}
      </p>
      <p>{new Date(timestamp).toLocaleString()}</p>
    </div>
  );
}
