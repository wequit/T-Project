import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useLogin } from "../api";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    login(
      { username, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error.message || "Ошибка авторизации"}</span>
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
            disabled={isPending}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Пароль
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={isPending}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            disabled={isPending}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
          />
          <span className="ml-2 text-sm text-gray-600">Запомнить меня</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            Войти
          </>
        )}
      </button>
    </form>
  );
};

