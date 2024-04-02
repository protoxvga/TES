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
    midnight.setHours(10, 30, 0, 0);

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
    <div className="h-[80vh] w-screen flex items-center justify-center">
      <div className="text-center p-10">
        <p className="text-base font-semibold leading-7 text-orange-600 ">
          Les votes ouvrent dans...
        </p>
        <h2 className="mt-4 text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl md:text-7xl lg:text-8xl">
          {`${time.hours}:${time.minutes}:${time.seconds}`}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
          A plus tard ! 🍔
        </p>
      </div>
    </div>
  );
};

export default Countdown;
