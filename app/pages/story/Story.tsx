import { Button } from "~/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const TOTAL_PAGES = 3;

const pages = [
  "첫 번째 온보딩 내용이에요 💖",
  "두 번째 소개 화면입니다 😍",
  "세 번째! 이제 시작해볼까요? 🎉",
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function Story() {
  const [[page, direction], setPage] = useState([0, 0]);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();

  const paginate = (newDirection: number) => {
    if (
      (newDirection === 1 && page < TOTAL_PAGES - 1) ||
      (newDirection === -1 && page > 0)
    ) {
      setPage([page + newDirection, newDirection]);
    }
  };

  const handleStart = () => {
    navigate("/home"); // ✅ 원하는 경로로 이동
  };

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-8"
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0].clientX; // ✅ 기록
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;

        if (diff > 50) paginate(-1); // 오른쪽으로 스와이프 → 이전
        if (diff < -50) paginate(1); // 왼쪽으로 스와이프 → 다음

        touchStartX.current = null; // 초기화
      }}
    >
      <div className="flex items-center justify-center w-full relative">
        <AnimatePresence custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full px-6 text-center text-xl text-[#4B3F72]"
          >
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mb-2">
        {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
          <span
            key={index}
            className={`text-2xl transition-colors ${
              index === page ? "text-[#7D65C6]" : "text-[#E1DDF0]"
            }`}
          >
            ♥
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full px-8">
        {page === TOTAL_PAGES - 1 ? (
          <Button
            onClick={handleStart}
            className="bg-[#A18BD1] text-white text-base font-medium px-8 py-3 rounded-2xl"
          >
            시작하기
          </Button>
        ) : (
          <Button
            onClick={() => paginate(1)}
            className="bg-[#A18BD1] text-white text-base font-medium px-8 py-3 rounded-2xl"
          >
            다음으로
          </Button>
        )}
      </div>
    </div>
  );
}
