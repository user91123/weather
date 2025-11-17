import React, { useRef } from "react";
import styles from "../SearchInput/styles.module.css";
import searchIcon from "../../assets/icons/search-input-icon.svg";
import searchClearIcon from "../../assets/icons/search-input-clear-icon.svg";

import {
  weatherSelector,
  setSearchValue,
} from "../../redux/slices/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchInput() {
  const [localValue, setLocalValue] = React.useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { searchValue } = useSelector(weatherSelector);

  const onChangeInput = (e) => {
    setLocalValue(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchValue(localValue));
    }
  };

  const clearInput = () => {
    setLocalValue("");
    dispatch(setSearchValue(""));
    inputRef.current.focus();
  };

  return (
    <div className={styles.warpper}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search icon" />

      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Search location..."
        value={localValue}
        spellCheck="false"
        onChange={onChangeInput}
        onKeyDown={onKeyDown} // ← добавили
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
