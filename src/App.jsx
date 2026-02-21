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
import BuwuhanUpdatePassword from "./pages/BuwuhanUpdatePassword.jsx";
import SettingsUser from "./pages/SettingsUser.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

// ✅ Redirect ke dashboard kalau sudah login
function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    return isAuthenticated ? <Navigate to="/buwuhan/dashboard" replace /> : children;
}

// ✅ Redirect ke login kalau belum login
function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
    return (
        <Routes>
            {/* Public - kalau sudah login langsung ke dashboard */}
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard - harus login dulu */}
            <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route index element={<Navigate to="/buwuhan/dashboard" replace />} />
                <Route path="/buwuhan/dashboard" element={<BuwuhanDashboard />} />
                <Route path="/buwuhan/list" element={<BuwuhanList />} />
                <Route path="/buwuhan/create" element={<BuwuhanCreate />} />
                <Route path="/buwuhan/settings" element={<SettingsUser />} />
                <Route path="/buwuhan/settings/update-password" element={<BuwuhanUpdatePassword />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
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