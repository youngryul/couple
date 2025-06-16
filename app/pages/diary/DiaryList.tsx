import { Button } from "~/components/Button";
import { Link } from "react-router";

export default function DiaryList() {
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
    </div>
  );
}
