import { createAsyncThunk } from "@reduxjs/toolkit";
import { weatherAPI } from "../../api/weatherAPI";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ q, lat, lon }, thunkAPI) => {
    try {
      const { data } = await weatherAPI.fetchCurrent({ q, lat, lon });
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
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
      const { data } = await weatherAPI.fetchHourly({ q, lat, lon });
      return data.list;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
