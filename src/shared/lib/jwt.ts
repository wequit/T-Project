/**
 * Декодирует JWT токен и возвращает payload
 */
export function decodeJWT(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Проверяет, истек ли токен или истечет в ближайшее время
 * @param token - JWT токен для проверки
 * @param bufferSeconds - количество секунд до истечения, при котором токен считается истекшим (по умолчанию 60)
 * @returns true если токен истек или истекает скоро
 */
export function isTokenExpired(token: string, bufferSeconds: number = 60): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  // Добавляем буфер в 60 секунд (по умолчанию), чтобы обновить токен заранее
  return decoded.exp < (currentTime + bufferSeconds);
}

/**
 * Получает username из токена
 */
export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem("auth-token");
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  return decoded?.sub || decoded?.username || null;
}

