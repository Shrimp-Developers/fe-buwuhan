import { createContext, useContext, useState, useEffect } from 'react';
import { userLogin } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);

            const response = await userLogin({ email, password });
            const body = await response.json();

            if (!response.ok) {
                throw new Error(body?.message || "Login gagal");
            }

            const token = body?.data?.accessToken;
            const user = body?.data?.user;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return { success: true };

        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};