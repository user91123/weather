import { configureStore } from "@reduxjs/toolkit";
import weather from "./slices/weatherSlice";
import { saveSearchHistory } from "../helpers/localeStorage";

export const store = configureStore({
  reducer: {
    weather,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveSearchHistory(state.weather.historyItems);
});
