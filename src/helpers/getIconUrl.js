export default function getIconUrl(iconCode) {
  if (!iconCode) return null;

  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
