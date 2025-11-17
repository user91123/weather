import styles from "../NotFoundBlock/styles.module.css";

export default function NotFoundBlock() {
  return (
    <div className={styles.card}>
      <p className={styles.title}>Такой город не найден...</p>
    </div>
  );
}
