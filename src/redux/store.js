import { configureStore } from "@reduxjs/toolkit";
import weather from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    weather,
  },
});
