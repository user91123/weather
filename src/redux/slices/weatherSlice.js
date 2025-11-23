import { createSlice } from "@reduxjs/toolkit";
import { getSearchHistory } from "../../helpers/localeStorage";
import { fetchWeather, fetchHourlyWeather } from "./weatherThunks";

const initialState = {
  searchValue: "",
  day: "today",

  weather: {},
  hourlyWeather: [],

  weatherStatus: "loading",
  hourlyWeatherStatus: "loading",

  weatherError: null,
  hourlyWeatherError: null,

  historyItems: getSearchHistory(),
  fromHistory: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload.city ?? action.payload;
      state.fromHistory = action.payload.fromHistory || false;
    },
    setDay(state, action) {
      state.day = action.payload;
    },
    clearHistory(state) {
      state.historyItems = [];
      state.searchValue = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.weatherStatus = "loading";
        state.weatherError = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherStatus = "success";
        state.weather = action.payload;

        if (state.searchValue && !state.fromHistory) {
          state.historyItems.unshift({
            city: action.payload.name,
            weather: action.payload,
            timestamp: new Date().toISOString(),
          });
        }

        state.fromHistory = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weatherStatus = "error";
        state.weatherError = action.payload;
        state.weather = {};
      })

      .addCase(fetchHourlyWeather.pending, (state) => {
        state.hourlyWeatherStatus = "loading";
        state.hourlyWeatherError = null;
      })
      .addCase(fetchHourlyWeather.fulfilled, (state, action) => {
        state.hourlyWeatherStatus = "success";
        state.hourlyWeather = action.payload;
      })
      .addCase(fetchHourlyWeather.rejected, (state, action) => {
        state.hourlyWeatherStatus = "error";
        state.hourlyWeatherError = action.payload;
        state.hourlyWeather = [];
      });
  },
});

export const weatherSelector = (state) => state.weather;

export const { setSearchValue, setDay, clearHistory } = weatherSlice.actions;

export default weatherSlice.reducer;
