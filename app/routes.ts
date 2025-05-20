import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/main/Main.tsx"),
  route("/login", "pages/login/LoginView.tsx"),
  route("/story", "pages/story/Story.tsx"),
  route("/home", "pages/home/Home.tsx"),
  route("/calendar", "pages/calendar/CalendarView.tsx"),
  route("/login/haru", "pages/login/components/Login.tsx"),
] satisfies RouteConfig;
