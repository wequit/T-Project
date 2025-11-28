import { useMutation } from "@tanstack/react-query";
import { authApi, type LoginRequest, type LoginResponse } from "@/shared/api";
import { useAuthStore } from "@/entities/user";

export const useLogin = () => {
  const { setTokens } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setTokens(data.token, data.refreshToken);
    },
  });
};
