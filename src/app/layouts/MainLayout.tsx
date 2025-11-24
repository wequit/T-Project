import { Sidebar } from "@/widgets/sidebar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="flex h-screen text-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}


