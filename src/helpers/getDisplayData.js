export default function getDisplayData(weather, hourlyWeather, day) {
  if (!weather) return null;

  if (day === "today") {
    return weather;
  }

  if (day === "tomorrow" && hourlyWeather.length > 0) {
    const today = new Date();

    const tomorrowData = hourlyWeather.find((item) => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate.getDate() === today.getDate() + 1;
    });

    if (!tomorrowData) return weather;

    return {
      name: weather.name,
      main: tomorrowData.main,
      weather: tomorrowData.weather,
      wind: tomorrowData.wind,
      visibility: tomorrowData.visibility ?? weather.visibility,
    };
  }

  return weather;
}
