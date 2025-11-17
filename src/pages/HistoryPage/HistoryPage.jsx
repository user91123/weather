import React from "react";
import { getSearchHistory } from "../../helpers/localeStorage";
import styles from "../HistoryPage/styles.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/weatherSlice";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const onGoHome = () => {
    dispatch(setSearchValue(""));
    navigate("/");
  };

  if (history.length === 0)
    return (
      <div className={styles.header}>
        <Link
          onClick={() => onClearSearchValue()}
          className={styles.headerLeft}
          to="/"
        >
          Home Page
        </Link>
        <p className={styles.noHistoryTitle}>No search history yet</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onGoHome} className={styles.headerLeft}>
          Home Page
        </button>
        <div className={styles.headerRight}>
          <h1 className={styles.title}>Search History</h1>
          <button
            className={styles.clearButton}
            onClick={() => {
              localStorage.removeItem("searchHistory");
              setHistory([]);
            }}
          >
            Clear History
          </button>
        </div>
      </div>

      {history.map((entry, index) => (
        <div key={index} className={styles.card}>
          <h2>{entry.city}</h2>
          <p>
            {Math.round(entry.weather.main?.temp)}°C,{" "}
            {entry.weather.weather?.[0]?.description}
          </p>
          <p>{new Date(entry.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
