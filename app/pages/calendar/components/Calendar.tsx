import { useState } from "react";
import dayjs from "dayjs";

const events: Record<string, string[]> = {
  "2025-05-21": ["💖", "🎂"],
  "2025-05-25": ["🌸"],
};
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const prevMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  const nextMonth = () => {
    const next = currentDate.clone().add(1, "month");
    setCurrentDate(next);
  };

  const generateDates = () => {
    const startDay = currentDate.startOf("month").day();
    const daysInMonth = currentDate.daysInMonth();

    const dates = [];
    for (let i = 0; i < startDay; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }
    return dates;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-xl">
          ◀
        </button>
        <h2 className="text-xl font-bold text-[#553D3C]">
          {currentDate.format("YYYY MMMM")}
        </h2>
        <button onClick={nextMonth} className="text-xl z-50">
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-[#705f5e]">
        {DAYS.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center text-[#3C3C3C] mt-4">
        {generateDates().map((date, idx) => {
          const fullDate = date
            ? currentDate.clone().date(date).format("YYYY-MM-DD")
            : null;
          const dailyEvents = fullDate && events[fullDate];

          return (
            <div
              key={idx}
              className="h-24 p-2 border rounded-xl flex flex-col items-start justify-start bg-white shadow-sm"
            >
              <div className="text-sm font-semibold">{date}</div>
              {dailyEvents &&
                dailyEvents.map((e, i) => (
                  <div key={i} className="text-xs text-gray-500 truncate">
                    {e}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
