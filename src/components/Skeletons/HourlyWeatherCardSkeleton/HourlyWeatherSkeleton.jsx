import React from "react";
import styles from "../HourlyWeatherCardSkeleton/styles.module.css";

export function HourlyWeatherCardSkeleton() {
  return (
    <div className={styles.hourlyContainer}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className={styles.hourCard}></div>
      ))}
    </div>
  );
}
