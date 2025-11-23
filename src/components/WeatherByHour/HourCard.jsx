import styles from "./styles.module.css";
import getIconUrl from "../../helpers/getIconUrl";

export default function HourCard({ item }) {
  const iconCode = item.weather?.[0]?.icon;
  const iconUrl = getIconUrl(iconCode);

  const time = new Date(item.dt * 1000).getHours() + ":00";
  const temp = Math.round(item.main.temp) + "°C";

  return (
    <div className={styles.hourCard}>
      <span className={styles.time}>{time}</span>

      <img
        className={styles.weatherIcon}
        src={iconUrl}
        alt={item.weather?.[0]?.description || "Weather icon"}
      />

      <span className={styles.degrees}>{temp}</span>
    </div>
  );
}
