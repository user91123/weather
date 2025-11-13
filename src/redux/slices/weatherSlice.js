import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  timeout: 10000,
});

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ q }, thunkAPI) => {
    try {
      const { data } = await api.get("", {
        params: {
          q,
          units: "metric",
          lang: "ru",
          appid: API_KEY,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchValue: "",
  weather: {},
  status: "loading",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.weather = {};
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "success";
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
        state.weather = {};
      });
  },
});

export const weatherSelector = (state) => state.weather;

export const { setSearchValue } = weatherSlice.actions;

export default weatherSlice.reducer;
