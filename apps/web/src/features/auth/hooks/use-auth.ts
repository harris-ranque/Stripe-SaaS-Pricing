import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const { accessToken, setAccessToken } = useAuthStore();

  return { accessToken, setAccessToken };
}