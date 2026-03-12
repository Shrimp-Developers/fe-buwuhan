import { createContext, useContext, useState, useEffect } from "react";
import { userLogin } from "../services/authService";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = Cookies.get("userData");

    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await userLogin({ email, password });
      const data = response.data;

      Cookies.set("accessToken", data.data.accessToken, { expires: 7 });

      const safeUserData = {
        id: data.data.id,
        fullName: data.data.fullName,
        email: data.data.email,
        avatar: data.data.avatar,
      };
      Cookies.set("userData", JSON.stringify(safeUserData), { expires: 7 });

      setIsAuthenticated(true);
      setUser(safeUserData);

      return { success: true, data: data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Email atau password salah",
      };
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userData");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
