import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import HourlyWeatherCards from "../../components/HourlyWeatherCards/HourlyWeatherCards";

export default function HomePage() {
  return (
    <>
      <Header />
      <SearchInput />
      <WeatherCard />
      <HourlyWeatherCards />
    </>
  );
}
