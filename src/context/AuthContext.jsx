import { createContext, useContext, useState, useEffect } from "react";
import { userLogin } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // cek token 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("userData");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (token) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await userLogin({ email, password });
      const data = response.data;

      // save token and user data to localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.data));

      // update state
      setIsAuthenticated(true);
      setUser(data.data);

      return {
        success: true,
        data: data.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Email atau password salah",
      };
    }
  };

  // Logout function to clear token and user data
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};