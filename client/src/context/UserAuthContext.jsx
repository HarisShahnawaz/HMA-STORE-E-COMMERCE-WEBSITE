import { createContext, useContext, useState } from "react";

const UserAuthContext = createContext();

export function UserAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userData");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (newToken, userData) => {
    localStorage.setItem("userToken", newToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
