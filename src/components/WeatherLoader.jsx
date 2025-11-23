import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeather,
  fetchHourlyWeather,
} from "../redux/slices/weatherThunks";
import { weatherSelector } from "../redux/slices/weatherSlice";

export default function WeatherLoader({ children }) {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(weatherSelector);

  useEffect(() => {
    const load = () => {
      if (searchValue) {
        dispatch(fetchWeather({ q: searchValue }));
        dispatch(fetchHourlyWeather({ q: searchValue }));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          dispatch(fetchWeather(coords));
          dispatch(fetchHourlyWeather(coords));
        },
        () => {
          dispatch(fetchWeather({ q: "Краснодар" }));
          dispatch(fetchHourlyWeather({ q: "Краснодар" }));
        }
      );
    };

    load();
  }, [dispatch, searchValue]);

  return children;
}
