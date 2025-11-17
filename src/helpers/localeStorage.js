export const saveSearchHistory = (city, weatherData) => {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const newEntry = {
    city,
    weather: weatherData,
    timestamp: new Date().toISOString(),
  };

  const updated = [newEntry, ...history];

  localStorage.setItem("searchHistory", JSON.stringify(updated));
};

export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem("searchHistory")) || [];
};
