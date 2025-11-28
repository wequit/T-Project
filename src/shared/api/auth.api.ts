import axios from "axios";
import { z } from "zod";
import { parseOrThrow } from "@/shared/lib";
import { API_URL } from "@/shared/config";

// === Schemas ===
const LoginRequestSchema = z.object({
  username: z.string().min(1, "Имя пользователя обязательно"),
  password: z.string().min(1, "Пароль обязателен"),
});

const LoginResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

const RefreshTokenResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

// === Types ===
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;

// === API ===
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const validatedCredentials = parseOrThrow(
      LoginRequestSchema,
      credentials,
      "Login request"
    );
    const response = await axios.post(`${API_URL}/auth/login`, validatedCredentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return parseOrThrow(LoginResponseSchema, response.data, "Login response");
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const validatedRequest = parseOrThrow(
      RefreshTokenRequestSchema,
      { refreshToken },
      "Refresh token request"
    );
    const response = await axios.post(`${API_URL}/auth/refresh`, validatedRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return parseOrThrow(RefreshTokenResponseSchema, response.data, "Refresh token response");
  },
};
