import React from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearHistory,
  setSearchValue,
  weatherSelector,
} from "../../redux/slices/weatherSlice";
import HistoryHeader from "./HistoryHeader.jsx";
import HistoryCard from "./HistoryCard.jsx";
import EmptyHistory from "./EmptyHistory.jsx";
import SearchHistory from "./SeacrhHistory.jsx";

export default function HistoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { historyItems } = useSelector(weatherSelector);

  const [searchTerm, setSearchTerm] = React.useState("");

  const onGoHome = () => {
    dispatch(setSearchValue(""));
    navigate("/");
  };

  const onCityClick = (city) => {
    dispatch(setSearchValue({ city, fromHistory: true }));
    navigate("/");
  };

  if (!historyItems || historyItems.length === 0)
    return <EmptyHistory onGoHome={onGoHome} />;

  const filteredHistory = historyItems.filter((entry) =>
    entry.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <HistoryHeader
        onGoHome={onGoHome}
        onClear={() => dispatch(clearHistory())}
      />

      <SearchHistory searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredHistory.map((entry, index) => (
        <HistoryCard key={index} entry={entry} onClick={onCityClick} />
      ))}
    </div>
  );
}
