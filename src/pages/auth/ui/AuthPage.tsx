import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/features/auth-login";
import { useAuthStore } from "@/entities/user";
import { APP_NAME } from "@/shared/config";

export const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">{APP_NAME[0]}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Добро пожаловать в {APP_NAME}
          </h1>
          <p className="text-gray-600">Войдите в свой аккаунт для продолжения</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

