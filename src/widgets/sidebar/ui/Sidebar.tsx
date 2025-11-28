import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { LayoutGrid, Users, LogOut } from "lucide-react";
import { APP_NAME } from "@/shared/config";
import { useAuthStore } from "@/entities/user";

export function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navItems = [
    { label: "Мои задачи", to: "/", icon: <LayoutGrid size={18} /> },
    { label: "Мои проекты", to: "/company", icon: <Users size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <aside className="w-64 h-screen border-r border-gray-200 flex flex-col shadow-md">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <div className="text-blue-600 text-xl font-bold">{APP_NAME}</div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              )
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100 space-y-3">
        {user && (
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-semibold">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
              {user.email && (
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Кнопка выхода */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={18} />
          Выход
        </button>

      
      </div>
    </aside>
  );
}


