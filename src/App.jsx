import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import "./index.css";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Activation from "./pages/Activation.jsx";
import DashboardLayout from "./DashboardLayout.jsx";

import BuwuhanDashboard from "./pages/BuwuhanDashboard.jsx";
import BuwuhanCreate from "./pages/BuwuhanCreate.jsx";
import BuwuhanList from "./pages/BuwuhanList.jsx";
import EditPassword from "./pages/EditPassword.jsx";
import SettingsUser from "./pages/SettingsUser.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>

            {/* Public routes */}
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/activation" element={<Activation />} />

            {/* Protected routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<BuwuhanDashboard />} />
                <Route path="buwuhan" element={<BuwuhanList />} />
                <Route path="buwuhan/create" element={<BuwuhanCreate />} />
                <Route path="settings" element={<SettingsUser />} />
                <Route path="change-password" element={<EditPassword />} />
            </Route>

            <Route path="*" element={
                isAuthenticated
                    ? <Navigate to="/dashboard" replace />
                    : <Navigate to="/login" replace />
            }
            />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
