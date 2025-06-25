import { Button } from "~/components/Button";
import { Link } from "react-router";
import { getDiaryList } from "~/pages/diary/queries";
import type { Route } from "../../../.react-router/types/app/pages/diary/+types/DiaryList";

export const loader = async () => {
  const diaries = await getDiaryList();

  return { diaries };
};

export default function DiaryList({ loaderData }: Route.ComponentProps) {
  return (
    <div className="absolute top-2 left-4">
      <Button variant="default" size="s" className="w-24" asChild>
        <Link
          to="/diary"
          className="block w-full h-full flex items-center justify-center"
        >
          일기 작성
        </Link>
      </Button>

      <h2 className="text-xl font-bold mb-4">일기 목록</h2>
      <ul className="space-y-4">
        {loaderData.diaries.map((d) => (
          <li key={d.diaryId} className="p-4 border rounded-xl shadow-sm">
            <p>
              <strong>작성자:</strong> {d.inputId}
            </p>
            <p>
              <strong>작성일시:</strong>{" "}
              {new Date(d.inputDate).toLocaleString()}
            </p>
            <p>
              <strong>기분:</strong> {d.moodType}
            </p>
            <p>
              <strong>내용:</strong> {d.content}
            </p>
            {d.fileId && (
              <p>
                <strong>첨부 이미지:</strong> {d.fileId}
              </p>
            )}
            <p>
              <strong>커플 공개 여부:</strong>{" "}
              {d.coupleYn === "Y" ? "공개" : "비공개"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
