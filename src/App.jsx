import "./index.css";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HomePage from "./pages/HomePage/HomePage";
import WeatherLoader from "./components/WeatherLoader";

function App() {
  return (
    <div className="appContainer">
      <WeatherLoader>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </WeatherLoader>
    </div>
  );
}

export default App;
