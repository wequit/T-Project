import { Sidebar } from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import '../index.css'

export default function MainLayout() {
  return (
    <div className="flex h-screen text-gray-900 ">
      <Sidebar />
      <main className="flex-1  overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}