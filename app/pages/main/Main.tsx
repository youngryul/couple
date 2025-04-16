import { Button } from "~/components/Button";
import { Link } from "react-router";

export default function Main() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      <div className="">
        <img src="app/assets/title.png" />
        <img className="w-[330px]" src="app/assets/mainImg.png" />
      </div>
      <Button variant="default" size="s" className="w-1/2" asChild>
        <Link to="/login">시작</Link>
      </Button>
    </div>
  );
}
