import React from "react";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import MainWeatherCard from "../../components/MainWeatherCard/MainWeatherCard";
import WeatherByHour from "../../components/WeatherByHour/WeatherByHour";

export default function HomePage() {
  return (
    <>
      <Header />
      <SearchInput />
      <MainWeatherCard />
      <WeatherByHour />
    </>
  );
}
