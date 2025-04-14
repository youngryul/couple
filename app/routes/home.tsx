import type { Route } from "./+types/home";
import Main from "~/pages/main/Main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Haruming" },
    { name: "description", content: "Welcome to Haruming service" },
  ];
}

export default function Home() {
  return <Main/>;
}
