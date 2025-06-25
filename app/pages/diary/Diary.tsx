"use client";

import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "~/components/Button";
import { Calendar } from "~/components/ui/calendar";

export default function Diary() {
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // todo 작성완료에 db insert 시 routes link가 먹지 않는 현상이 발생 (ssr 문제?)
  return (
    <div className="h-full flex flex-col px-4 py-6 relative gap-4">
      {/* 날짜 텍스트 */}
      <div
        className="text-lg font-semibold cursor-pointer inline-block text-center"
        onClick={() => setShowModal(true)}
      >
        {date?.toLocaleDateString()}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl p-4 w-auto"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setShowModal(false); // 날짜 선택 시 모달 닫기
              }}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>
        </div>
      )}
      <div className="text-xl mt-2">🌞 🌧 😴 🌈 💗</div>

      {/* 텍스트 입력 영역 */}
      <div className="relative w-full mt-4 h-2/3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="오늘 무슨 일이 있었나요?"
          className="w-full p-4 h-full rounded-xl bg-white text-black placeholder-gray-500 resize-none"
        />
        <button className="absolute bottom-4 right-4 text-gray-700">
          <Camera size={20} />
        </button>
      </div>
      <div className="flex flex-row-reverse">
        <Button size="s" width="fit" asChild>
          작성완료
        </Button>
      </div>
    </div>
  );
}
