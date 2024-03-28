import { useState, useEffect } from "react";

const Countdown = () => {
  const [time, setTime] = useState(calculateTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(11, 0, 0, 0);

    let difference = midnight.getTime() - now.getTime();
    if (difference < 0) {
      midnight.setDate(midnight.getDate() + 1);
      difference = midnight.getTime() - now.getTime();
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  return (
    <>
      {Number(time.hours) <= 24 && Number(time.hours) >= 23 ? (
        <h2 className="mt-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">
          Votes en cours...
        </h2>
      ) : (
        <>
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Les votes ouvrent dans...
          </p>
          <h2 className="mt-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">
            {`${time.hours}:${time.minutes}:${time.seconds}`}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
            A plus tard ! 🍔
          </p>
        </>
      )}
    </>
  );
};

export default Countdown;
