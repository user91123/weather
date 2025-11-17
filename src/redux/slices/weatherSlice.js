import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  timeout: 10000,
});

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ q, lat, lon }, thunkAPI) => {
    try {
      const { data } = await api.get("", {
        params: {
          q,
          lat,
          lon,
          units: "metric",
          lang: "ru",
          appid: API_KEY,
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return thunkAPI.rejectWithValue({
          type: "not_found",
          message: "City not found",
        });
      }
      return thunkAPI.rejectWithValue({
        type: "other",
        message: error.message,
      });
    }
  }
);

export const fetchHourlyWeather = createAsyncThunk(
  "weather/fetchHourlyWeather",
  async ({ q, lat, lon }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q,
            lat,
            lon,
            units: "metric",
            lang: "ru",
            appid: API_KEY,
          },
        }
      );
      return data.list;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchValue: "",
  day: "today",
  weather: {},
  hourlyWeather: [],
  weatherStatus: "loading",
  hourlyWeatherStatus: "loading",
  weatherError: null,
  hourlyWeatherError: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setDay(state, action) {
      state.day = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.weatherStatus = "loading";
        state.weatherError = null;
        state.weather = {};
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherStatus = "success";
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weatherStatus = "error";
        state.weatherError = action.payload;
        state.weather = {};
      })
      .addCase(fetchHourlyWeather.pending, (state) => {
        state.hourlyWeatherStatus = "loading";
        state.hourlyWeatherError = null;
        state.hourlyWeather = [];
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
export const { setSearchValue, setDay } = weatherSlice.actions;
export default weatherSlice.reducer;
