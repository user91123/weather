// components/SearchHistory.jsx
import React from "react";
import styles from "./styles.module.css";
import searchIcon from "../../assets/icons/search-input-icon.svg";
import searchClearIcon from "../../assets/icons/search-input-clear-icon.svg";

export default function SearchHistory({ searchTerm, setSearchTerm }) {
  const inputRef = React.useRef();

  const onChangeInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search icon" />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Search history..."
        value={searchTerm}
        spellCheck="false"
        onChange={onChangeInput}
      />
      <img
        onClick={clearInput}
        className={styles.searchClearIcon}
        src={searchClearIcon}
        alt="Clear search"
      />
    </div>
  );
}
