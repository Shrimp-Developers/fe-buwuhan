import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  AuthProvider  from "../src/context/AuthContext.jsx";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { PublicRoute } from "./context/PublicRoute";
import "./index.css";

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
                    {/*PUBLIC ROUTES - Hanya bisa diakses jika belum login */}
                    <Route path="/login" element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }/>

                    <Route path="/register" element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }/>

                    {/*  PROTECTED ROUTES - Harus login dulu Semua route di bawah ini menggunakan DashboardLayout */}
                    <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                    }>
                        {/* Nested Routes - Render di dalam DashboardLayout */}
                        <Route index element={<BuwuhanDashboard />} />
                        <Route path="create" element={<BuwuhanCreate />} />
                        <Route path="list" element={<BuwuhanList />} />
                    </Route>

                    {/* Settings Routes */}
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<SettingsUser />} />
                        <Route path="edit-password" element={<EditPassword />} />
                    </Route>

                    {/*  REDIRECT & 404 */}

                    {/* Default Route - Redirect ke login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* 404 Not Found */}
                    <Route path="*" element={
                            <div className="min-h-screen flex items-center justify-center bg-white">
                                <div className="text-center">
                                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                                    <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                                    <a
                                        href="/login"
                                        className="bg-[#8A86D5] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#7a76c5] transition-all duration-200 inline-block">
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