import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Реактивно отслеживаем изменения аутентификации
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};


