import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { MyTasksPage } from './pages/MyTasksPage'
import { CompanyPage } from './pages/CompanyPage'
import { ProjectPage } from './pages/ProjectPage'
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MyTasksPage />} />
        <Route path="company" element={<CompanyPage />} />
        <Route path="project/:projectId" element={<ProjectPage />} />
      </Route>
    </Routes>
  )
}
