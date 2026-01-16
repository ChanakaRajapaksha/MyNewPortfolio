import { useState, useEffect } from "react";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotation angles
  // Hour hand: 30 degrees per hour + 0.5 degrees per minute
  const hourAngle = (hours * 30) + (minutes * 0.5);
  // Minute hand: 6 degrees per minute + 0.1 degrees per second
  const minuteAngle = (minutes * 6) + (seconds * 0.1);
  // Second hand: 6 degrees per second
  const secondAngle = seconds * 6;

  return (
    <div className="clock-widget-desktop">
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        className="clock-face"
      >
        {/* Clock face circle with subtle fill */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="rgba(255, 255, 255, 0.1)"
          stroke="currentColor"
          strokeWidth="1.2"
          className="clock-border"
        />
        
        {/* Hour markers - all 12 hours */}
        {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
          const angle = (hour * 30 - 90) * (Math.PI / 180);
          const isMajor = hour % 3 === 0; // 12, 3, 6, 9 are major markers
          const innerRadius = isMajor ? 7.5 : 8.5;
          const outerRadius = isMajor ? 9.5 : 10;
          const x1 = 12 + innerRadius * Math.cos(angle);
          const y1 = 12 + innerRadius * Math.sin(angle);
          const x2 = 12 + outerRadius * Math.cos(angle);
          const y2 = 12 + outerRadius * Math.sin(angle);
          return (
            <line
              key={hour}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={isMajor ? "1.8" : "1.2"}
              strokeLinecap="round"
              opacity={isMajor ? "0.7" : "0.5"}
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="7.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 12 12)`}
          className="hour-hand"
        />

        {/* Minute hand */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 12 12)`}
          className="minute-hand"
        />

        {/* Second hand */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="4.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 12 12)`}
          className="second-hand"
        />

        {/* Center dot */}
        <circle
          cx="12"
          cy="12"
          r="1.8"
          fill="currentColor"
          className="clock-center"
        />
      </svg>
    </div>
  );
};

export default ClockWidget;
