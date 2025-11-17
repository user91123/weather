import "./index.css";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
