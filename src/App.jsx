import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import PublicRoute from "./context/PublicRoute.jsx";
import "./index.css";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Activation from "./pages/Activation.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import BuwuhanDashboard from "./pages/BuwuhanDashboard.jsx";
import BuwuhanCreate from "./pages/BuwuhanCreate.jsx";
import BuwuhanList from "./pages/BuwuhanList.jsx";
import BuwuhanEditData from "./pages/BuwuhanEditData.jsx"
import BuwuhanUpdatePassword from "./pages/BuwuhanUpdatePassword.jsx";
import BuwuhanSettings from "./pages/BuwuhanSettings.jsx";
import BuwuhanForgotPassword from "./pages/BuwuhanForgotPassword.jsx";
import BuwuhanResetPassword from "./pages/BuwuhanResetPassword.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><BuwuhanForgotPassword /></PublicRoute>} />
            <Route path="/activate/:token" element={<Activation />} />
            <Route path="/reset-password/:token" element={<BuwuhanResetPassword />} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<BuwuhanDashboard />} />
                <Route path="create" element={<BuwuhanCreate />} />
                <Route path="list" element={<BuwuhanList />} />
                <Route path="edit/:buwuhanId" element={<BuwuhanEditData />} />
                <Route path="settings" element={<BuwuhanSettings />} />
                <Route path="settings/update-password" element={<BuwuhanUpdatePassword />} />
            </Route>
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