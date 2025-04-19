"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./Components/Navigation/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/Auth/Login", "/Auth/Register"];
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <SessionProvider>
      {shouldShowSidebar ? (
        <div className="flex gap-2 min-h-screen">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      ) : (
        <main className="min-h-screen">{children}</main>
      )}
    </SessionProvider>
  );
}
