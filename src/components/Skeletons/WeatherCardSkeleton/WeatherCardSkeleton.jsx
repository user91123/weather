import React from "react";
import styles from "../WeatherCardSkeleton/styles.module.css";

export function WeatherCardSkeleton() {
  return (
    <div className={styles.largeCard}>
      <div className={styles.cityBlock}></div>
      <div className={styles.mainInfo}></div>
      <div className={styles.date}></div>
      <div className={styles.addInfo}>
        <div className={styles.addInfoItem}></div>
        <div className={styles.addInfoItem}></div>
        <div className={styles.addInfoItem}></div>
        <div className={styles.addInfoItem}></div>
      </div>
    </div>
  );
}
