import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherAPI = {
  fetchCurrent: (params) =>
    axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        units: "metric",
        lang: "ru",
        appid: API_KEY,
        ...params,
      },
    }),

  fetchHourly: (params) =>
    axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        units: "metric",
        lang: "ru",
        appid: API_KEY,
        ...params,
      },
    }),
};
