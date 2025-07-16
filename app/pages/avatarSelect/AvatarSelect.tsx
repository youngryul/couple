import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  type PanInfo,
} from "framer-motion";
import { AvatarCard } from "./components/AvatarCard";
import { MoveLeft, MoveRight } from "lucide-react";

const characters = [
  { id: "cat", name: "고양이", image: "/app/assets/cat/cat_4.png" },
  { id: "bear", name: "곰돌이", image: "/app/assets/bear/bear_4.png" },
  { id: "dog", name: "강아지", image: "/app/assets/dog/dog_4.png" },
];

const CARD_WIDTH = 240;
const GAP = 16;
const FALLBACK_WIDTH = CARD_WIDTH + GAP;

export default function AvatarSelect() {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const scrollToIndex = (index: number) => {
    const wrapperWidth = wrapperRef.current?.offsetWidth ?? 0;
    const targetX =
      wrapperWidth / 2 - CARD_WIDTH / 2 - index * (CARD_WIDTH + GAP);
    animate(x, targetX, { duration: 0.5, ease: "easeInOut" });
    setSelectedIndex(index);
  };

  const scrollNext = () => {
    if (selectedIndex < characters.length - 1) {
      scrollToIndex(selectedIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (selectedIndex > 0) {
      scrollToIndex(selectedIndex - 1);
    }
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    const dragOffset = info.offset.x;
    if (dragOffset < -50 && selectedIndex < characters.length - 1) {
      scrollNext();
    } else if (dragOffset > 50 && selectedIndex > 0) {
      scrollPrev();
    } else {
      scrollToIndex(selectedIndex);
    }
  };

  useEffect(() => {
    scrollToIndex(selectedIndex);
  }, [wrapperRef.current]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#cfc7eb] relative overflow-hidden">
      <h1 className="text-2xl font-bold text-center mb-6">
        친구를 골라볼까요? ❤️
      </h1>
      <div
        className="relative w-full max-w-[480px] overflow-hidden"
        ref={wrapperRef}
      >
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
        >
          <MoveLeft className="w-6 h-6" />
        </button>
        <motion.div
          className="flex gap-4 w-fit px-4"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          style={{ x: springX }}
        >
          {characters.map((char, i) => (
            <AvatarCard
              key={char.id}
              ref={(el) => (cardRefs.current[i] = el)}
              char={char}
              isActive={i === selectedIndex}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </motion.div>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
        >
          <MoveRight className="w-6 h-6" />
        </button>
      </div>
      <button className="mt-10 px-6 py-3 bg-green-500 text-white rounded-full text-lg shadow-lg">
        {characters[selectedIndex].name} 선택 완료 🎉
      </button>
    </div>
  );
}
