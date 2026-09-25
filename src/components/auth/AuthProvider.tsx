import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./authTypes";
import {
  getStoredUser,
  setStoredUser,
  getToken,
  setToken,
  clearAuth,
  getMeApi,
} from "../../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  useEffect(() => {
    const token = getToken();
    if (token) {
      getMeApi(token)
        .then((currentUser) => {
          setUser(currentUser);
          setStoredUser(currentUser);
        })
        .catch(() => {
          clearAuth();
          setUser(null);
        });
    }
  }, []);

  const login = (userData: User, token?: string) => {
    if (token) {
      setToken(token);
    }
    setStoredUser(userData);
    setUser(userData);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};