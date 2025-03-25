"use client";

import { useState } from "react";
import { Home, User, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [width, setWidth] = useState(80);

  const items = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Profile", icon: User, link: "/profile" },
    { name: "Settings", icon: Settings, link: "/settings" },
  ];

  return (
    <div className="bg-gray-900 text-white h-screen p-3 flex flex-col w-[70px] overflow-hidden transition-all ">
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          name={item.name}
          Icon={item.icon}
          link={item.link}
          expanded={width > 120}
        />
      ))}
    </div>
  );
}

