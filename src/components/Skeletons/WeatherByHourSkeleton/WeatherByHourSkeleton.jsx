import React from "react";
import styles from "../WeatherByHourSkeleton/styles.module.css";

export default function WeaherByHourSkeleton() {
  return (
    <div className={styles.hourlyContainer}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className={styles.hourCard}></div>
      ))}
    </div>
  );
}
