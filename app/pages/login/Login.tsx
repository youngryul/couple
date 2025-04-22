import { Button } from "~/components/Button";

export default function Login() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-8">
      <img src="app/assets/loginImg.png" />
      <div className="flex flex-col gap-4 w-full px-8">
        <Button className="relative bg-[#02C759]">
          <img
            className="absolute left-4 w-10 h-10"
            src="app/assets/naver.png"
          />
          네이버로 로그인
        </Button>
        <Button className="relative bg-[#FEE500] text-[#000000]">
          <img
            className="w-10 h-10 absolute left-4"
            src="app/assets/kakao.png"
          />
          카카오톡으로 로그인
        </Button>
        <Button>하루밍으로 로그인</Button>
      </div>
    </div>
  );
}
