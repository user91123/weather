import styles from "../MainWeatherCard/styles.module.css";

export default function AddInfoItem({ label, value }) {
  return (
    <div className={styles.addInfoItem}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
