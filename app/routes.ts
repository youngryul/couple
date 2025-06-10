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
    index("pages/daily/list.tsx"),
    route("/:id", "pages/daily/item.tsx"),
  ]),
  route("/diary", "pages/diary/Diary.tsx"),
  route("/mypage", "pages/mypage/MyPage.tsx"),
  route("/avatar", "pages/avatarSelect/AvatarSelect.tsx"),
] satisfies RouteConfig;
