import Header from "./components/Header/Header";
import SearchInput from "./components/SearchInput/SearchInput";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import "./index.css";

function App() {
  return (
    <div className="appContainer">
      <Header />
      <SearchInput />
      <WeatherCard />
    </div>
  );
}

export default App;
