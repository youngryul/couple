import calendarTop from "/app/assets/calendarUp.png";
import Calendar from "~/pages/calendar/components/Calendar";

export default function CalendarView() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4">
      {/* 달력 감싸는 박스 - 상대 위치 기준 */}
      <div className="relative w-full max-w-[420px] sm:max-w-[500px] md:max-w-[600px] border-2 border-solid rounded-xl border-[#9f96d2]">
        {/* 🐱 고양이 이미지 - 달력 박스의 우측 상단에 배치 */}
        <img
          src={calendarTop}
          alt="고양이"
          className="absolute -top-16 -right-6 w-[160px] object-contain"
        />

        {/* 📅 달력 자체 */}
        <Calendar />
      </div>
    </div>
  );
}
