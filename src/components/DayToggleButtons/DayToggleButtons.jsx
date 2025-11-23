import styles from "../DayToggleButtons/styles.module.css";
import { weatherSelector } from "../../redux/slices/weatherSlice";
import { setDay } from "../../redux/slices/weatherSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DayToggleButtons() {
  const dispatch = useDispatch();
  const { day } = useSelector(weatherSelector);

  const onChangeToday = () => {
    dispatch(setDay("today"));
  };

  const onChangeTomorrow = () => {
    dispatch(setDay("tomorrow"));
  };

  return (
    <>
      <button
        onClick={onChangeToday}
        className={`${styles.navButton} ${
          day === "today" ? styles.active : ""
        }`}
      >
        Today
      </button>
      <button
        onClick={onChangeTomorrow}
        className={`${styles.navButton} ${
          day === "tomorrow" ? styles.active : ""
        }`}
      >
        Tomorrow
      </button>
    </>
  );
}
