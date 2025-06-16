import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { LayoutGrid, Users } from 'lucide-react'

export function Sidebar() {
  const navItems = [
    { label: 'Мои задачи', to: '/', icon: <LayoutGrid size={18} /> },
    { label: 'Моя компания', to: '/company', icon: <Users size={18} /> },
  ]

  return (
    <aside className="w-64 h-screen  border-r border-gray-200 flex flex-col shadow-md">
      {/* Заголовок / логотип */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <div className="text-blue-600 text-xl font-bold">Yougile</div>
      </div>

      {/* Навигация */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              )
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Подвал */}
      <div className="text-xs text-gray-400 px-6 py-4 border-t border-gray-100">
        © 2025 Yougile Clone
      </div>
    </aside>
  )
}
