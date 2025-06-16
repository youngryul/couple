import calendarTop from "/app/assets/calendarUp.png";
import Calendar from "~/pages/calendar/components/Calendar";
import { Button } from "~/components/Button";
import { Link } from "react-router";

export default function CalendarView() {
  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center px-4">
      <div className="relative w-full max-w-[420px] sm:max-w-[500px] md:max-w-[600px] border-2 border-solid rounded-xl border-[#9f96d2]">
        <img
          src={calendarTop}
          alt="고양이"
          className="absolute -top-16 -right-6 w-[160px] object-contain"
        />
        <Calendar />
      </div>
    </div>
  );
}
