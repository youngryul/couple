import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/main/Main.tsx"),
  route("/login", "pages/login/Login.tsx"),
] satisfies RouteConfig;
