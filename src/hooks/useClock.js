import React from "react";
import formatTime from "../helpers/formatTime";

export default function useClock() {
  const [time, setTime] = React.useState(formatTime(new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return time;
}
