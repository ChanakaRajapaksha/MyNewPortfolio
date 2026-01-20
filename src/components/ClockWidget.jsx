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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const monthLabel = monthNames[time.getMonth()];
  const year = time.getFullYear();
  const today = time.getDate();
  const firstDayOfMonth = new Date(year, time.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, time.getMonth() + 1, 0).getDate();

  const calendarCells = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, i) => {
    if (i < firstDayOfMonth) return null;
    return i - firstDayOfMonth + 1;
  });

  return (
    <div className="clock-widget-desktop">
      <div className="calendar-widget">
        <div className="calendar-header">
          <p className="month">{monthLabel}</p>
        </div>
        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {calendarCells.map((day, index) => (
            <span
              key={`${day ?? "empty"}-${index}`}
              className={day === today ? "day active" : "day"}
            >
              {day ?? ""}
            </span>
          ))}
        </div>
      </div>

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        className="clock-face"
      >
        {/* Dark charcoal grey clock face circle */}
        <circle
          cx="70"
          cy="70"
          r="65"
          fill="#2C2C2E"
          className="clock-face-circle"
        />
        
        {/* 60 minute/second markers */}
        {Array.from({ length: 60 }, (_, i) => {
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const isHourMarker = i % 5 === 0; // Every 5 minutes (hour markers)
          const innerRadius = isHourMarker ? 55 : 58;
          const outerRadius = 63;
          const x1 = 70 + innerRadius * Math.cos(angle);
          const y1 = 70 + innerRadius * Math.sin(angle);
          const x2 = 70 + outerRadius * Math.cos(angle);
          const y2 = 70 + outerRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFFFFF"
              strokeWidth={isHourMarker ? "1.5" : "1"}
              strokeLinecap="round"
              opacity={isHourMarker ? "0.9" : "0.6"}
            />
          );
        })}

        {/* Hour numbers (1-12) */}
        {Array.from({ length: 12 }, (_, i) => {
          const hour = i === 0 ? 12 : i;
          const angle = (hour * 30 - 90) * (Math.PI / 180);
          const radius = 50;
          const x = 70 + radius * Math.cos(angle);
          const y = 70 + radius * Math.sin(angle);
          return (
            <text
              key={hour}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="500"
              fontFamily="-apple-system, system-ui, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              className="hour-number"
            >
              {hour}
            </text>
          );
        })}

        {/* Text labels: "KIE" and "+7" */}
        <text
          x="70"
          y="50"
          textAnchor="middle"
          fill="#B0B0B0"
          fontSize="10"
          fontWeight="400"
          fontFamily="-apple-system, system-ui, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
          className="clock-label"
        >
          KIE
        </text>
        <text
          x="70"
          y="90"
          textAnchor="middle"
          fill="#B0B0B0"
          fontSize="10"
          fontWeight="400"
          fontFamily="-apple-system, system-ui, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
          className="clock-label"
        >
          +7
        </text>

        {/* Hour hand - white, short, thick */}
        <line
          x1="70"
          y1="70"
          x2="70"
          y2="50"
          stroke="#F5F5F7"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          opacity="1"
          transform={`rotate(${hourAngle} 70 70)`}
          className="hour-hand"
        />

        {/* Minute hand - white, longer, thinner */}
        <line
          x1="70"
          y1="70"
          x2="70"
          y2="38"
          stroke="#F5F5F7"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="1"
          transform={`rotate(${minuteAngle} 70 70)`}
          className="minute-hand"
        />

        {/* Second hand - orange, thin */}
        <line
          x1="70"
          y1="70"
          x2="70"
          y2="32"
          stroke="#FF9500"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          transform={`rotate(${secondAngle} 70 70)`}
          className="second-hand"
        />

        {/* Orange center pin */}
        <circle
          cx="70"
          cy="70"
          r="3"
          fill="#FF9500"
          className="clock-center"
        />
      </svg>
    </div>
  );
};

export default ClockWidget;
