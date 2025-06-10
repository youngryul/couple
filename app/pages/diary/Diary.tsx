import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "~/components/Button";

export default function Diary() {
  const [text, setText] = useState("");

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: undefined,
  });

  return (
    <div className="h-full text-white flex flex-col px-4 py-6 relative gap-4">
      {/* 날짜 */}
      <div className="text-center mt-4" items-center>
        <div className="text-lg font-semibold">{today}</div>
        <div className="text-xl mt-2">🌞 🌧 😴 🌈 💗</div>
      </div>

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
