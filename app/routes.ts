import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/main/Main.tsx"),
  route("/login", "pages/login/LoginView.tsx"),
  route("/story", "pages/story/Story.tsx"),
  route("/home", "pages/home/Home.tsx"),
  route("/calendar", "pages/calendar/CalendarView.tsx"),
  route("/login/haru", "pages/login/components/Login.tsx"),
  ...prefix("/daily", [
    // 20250616 파일 삭제로 인한 오류 발생 수정 필요 *영률
    // index("pages/daily/list.tsx"),
    // route("/:id", "pages/daily/item.tsx"),
  ]),
  route("/diaryList", "pages/diary/DiaryList.tsx"),
  route("/diary", "pages/diary/Diary.tsx"),
  route("/mypage", "pages/mypage/MyPage.tsx"),
  route("/avatar", "pages/avatarSelect/AvatarSelect.tsx"),
] satisfies RouteConfig;
