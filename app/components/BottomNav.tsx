import { Home, Mail, Calendar, Handshake } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const tabs = [
  { name: "mail", path: "/daily", src: "/app/assets/mail.png" },
  { name: "diary", path: "/diaryList", src: "/app/assets/diary.png" },
  { name: "home", path: "/home", src: "/app/assets/home.png" },
  { name: "calendar", path: "/calendar", src: "/app/assets/calendar.png" },
  { name: "mypage", path: "/mypage", src: "/app/assets/mypage.png" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-[392px] mx-auto bg-white border-t flex justify-around py-2">
      {tabs.map(({ name, path, src }) => {
        const isActive = location.pathname === path;

        return (
          <Link to={path} key={name} className="flex flex-col items-center">
            <img
              src={src}
              alt={name}
              className={`w-6 h-6 transition-all duration-200 ${
                isActive
                  ? "opacity-100 grayscale-0 scale-110"
                  : "opacity-50 grayscale"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
