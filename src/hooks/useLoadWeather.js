import { useSelector } from "react-redux";
import { weatherSelector } from "../redux/slices/weatherSlice";

export default function useLoadWeather() {
  const {
    searchValue,
    weather,
    hourlyWeather,
    weatherStatus,
    hourlyWeatherStatus,
    weatherError,
    hourlyWeatherError,
    day,
  } = useSelector(weatherSelector);

  return {
    searchValue,
    weather,
    hourlyWeather,
    weatherStatus,
    hourlyWeatherStatus,
    weatherError,
    hourlyWeatherError,
    day,
  };
}
