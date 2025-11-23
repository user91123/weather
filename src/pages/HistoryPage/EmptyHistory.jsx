import React from "react";
import styles from "./styles.module.css";

export default function EmptyHistory({ onGoHome }) {
  return (
    <div className={styles.header}>
      <button className={styles.headerLeft} onClick={onGoHome}>
        Home Page
      </button>
      <p className={styles.noHistoryTitle}>No search history yet</p>
    </div>
  );
}
