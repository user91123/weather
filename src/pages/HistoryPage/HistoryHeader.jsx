import React from "react";
import styles from "./styles.module.css";

export default function HistoryHeader({
  onGoHome,
  onClear,
  title = "Search History",
}) {
  return (
    <div className={styles.header}>
      <button onClick={onGoHome} className={styles.headerLeft}>
        Home Page
      </button>
      <div className={styles.headerRight}>
        <h1 className={styles.title}>{title}</h1>
        <button onClick={onClear} className={styles.clearButton}>
          Clear History
        </button>
      </div>
    </div>
  );
}
