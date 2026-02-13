import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
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

function AppRoutes() {
    return (
        <Routes>

            {/* Public */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activation" element={<Activation />} />

            {/* Dashboard layout */}
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<BuwuhanDashboard />} />
                <Route path="buwuhan" element={<BuwuhanList />} />
                <Route path="buwuhan/create" element={<BuwuhanCreate />} />
                <Route path="settings" element={<SettingsUser />} />
                <Route path="change-password" element={<EditPassword />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
