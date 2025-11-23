import React from "react";
import formatDate from "../helpers/formatDate";

export default function useCurrentDate() {
  const [currentDate, setCurrentDate] = React.useState(formatDate(new Date()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(formatDate(new Date()));
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  return currentDate;
}
