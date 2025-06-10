import React, { useState } from "react";
import { AvatarCard } from "~/pages/avatarSelect/components/AvatarCard";
// todo 컴포넌트로 따로 빼니까 오류 발생
const characters = [
  { id: "cat", name: "고양이", image: "/app/assets/cat/cat_4.png" },
  { id: "bear", name: "곰돌이", image: "/app/assets/bear/bear_4.png" },
  { id: "dog", name: "강아지", image: "/app/assets/dog/dog_4.png" },
];

export default function AvatarSelect() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        친구를 골라볼까요? 💕
      </h1>

      <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-4 pb-4 scroll-smooth">
        {characters.map((char) => (
          <AvatarCard
            key={char.id}
            char={char}
            isSelected={selected === char.id}
            onClick={() => setSelected(char.id)}
          />
        ))}
      </div>

      {selected && (
        <button className="mt-10 px-6 py-3 bg-green-500 text-white rounded-full text-lg shadow-lg">
          {characters.find((c) => c.id === selected)?.name} 선택 완료 🎉
        </button>
      )}
    </div>
  );
}
