import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "pages/Login/Login.tsx"),
] satisfies RouteConfig;
