import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { MyTasksPage } from "@/pages/my-tasks";
import { CompanyPage } from "@/pages/company";
import { ProjectPage } from "@/pages/project";
import { AuthPage } from "@/pages/auth";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MyTasksPage />} />
        <Route path="company" element={<CompanyPage />} />
        <Route path="project/:projectId" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
};


