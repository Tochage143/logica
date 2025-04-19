"use client";

import { useState } from "react";
import { Home, File, Folder, Settings, User } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [width, setWidth] = useState(80);

  const topItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Notes", icon: Folder, link: "/Editor" },
  ];

  const bottomItems = [
    { name: "Profile", icon: User, link: "/Profile" },
    { name: "Settings", icon: Settings, link: "/settings" },
    { name: "Logout", icon: User, link: "/logout" },
  ];

  return (
    <div className="bg-gray-900 text-white h-screen p-3 flex flex-col w-[70px] overflow-hidden transition-all">
      {/* Top items (Home, Notes) */}
      <div className="flex flex-col space-y-4">
        {topItems.map((item, index) => (
          <SidebarItem
            key={index}
            name={item.name}
            Icon={item.icon}
            link={item.link}
            expanded={width > 120}
          />
        ))}
      </div>

      {/* Bottom items (Profile, Settings, Logout) */}
      <div className="mt-auto flex flex-col space-y-4">
        {bottomItems.map((item, index) => (
          <SidebarItem
            key={index}
            name={item.name}
            Icon={item.icon}
            link={item.link}
            expanded={width > 120}
          />
        ))}
      </div>
    </div>
  );
}
