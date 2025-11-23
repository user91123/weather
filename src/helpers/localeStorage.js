export const saveSearchHistory = (historyArray) => {
  localStorage.setItem("searchHistory", JSON.stringify(historyArray));
};

export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem("searchHistory")) || [];
};
