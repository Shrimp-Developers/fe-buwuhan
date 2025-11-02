import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "../src/context/AuthContext.jsx";
import "./index.css";
import GoogleCallback from "./pages/auth/GoogleCallback.jsx";

// Auth Pages
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";

// Buwuhan Layout
import DashboardLayout from "./DashboardLayout.jsx";

// Buwuhan Pages
import BuwuhanDashboard from "./pages/buwuhan/BuwuhanDashboard.jsx";
import BuwuhanCreate from "./pages/buwuhan/BuwuhanCreate.jsx";
import BuwuhanList from "./pages/buwuhan/BuwuhanList.jsx";

// Settings Pages
import EditPassword from "./pages/user/EditPassword.jsx";
import SettingsUser from "./pages/user/SettingsUser.jsx";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* AUTH ROUTES - Tanpa middleware */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/auth/google/callback" element={<GoogleCallback />} />

                    {/* DASHBOARD ROUTES - Tanpa middleware */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<BuwuhanDashboard />} />
                        <Route path="create" element={<BuwuhanCreate />} />
                        <Route path="list" element={<BuwuhanList />} />
                    </Route>

                    {/* SETTINGS ROUTES - Tanpa middleware */}
                    <Route path="/settings" element={<DashboardLayout />}>
                        <Route index element={<SettingsUser />} />
                        <Route path="edit-password" element={<EditPassword />} />
                    </Route>

                    {/* REDIRECT & 404 */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    <Route
                        path="*"
                        element={
                            <div className="min-h-screen flex items-center justify-center bg-white">
                                <div className="text-center">
                                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                                    <p className="text-xl text-gray-600 mb-8">Page Not Found</p>

                                <a  href="/login"
                                    className="bg-[#8A86D5] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#7a76c5] transition-all duration-200 inline-block"
                                    >
                                    Kembali Ke Halaman
                                </a>
                            </div>
                            </div>
                        }
                        />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);