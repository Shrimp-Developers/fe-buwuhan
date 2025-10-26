import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// Auth Pages
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";

// Buwuhan Pages

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/*Auth*/}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/*Buwuhan Pages*/}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    {/* Halaman di dalam dashboard */}
                    <Route index element={<BuwuhanDashboard />} />
                </Route>




                {/* Fallback jika route tidak ditemukan */}
                <Route
                    path="*"
                    element={
                        <div className="min-h-screen flex items-center justify-center bg-white">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-gray-600 mb-2">404</h1>
                                <p className="text-black mb-6">Page Not Found</p>
                                <a href="/"
                                   className="bg-gray-600 text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 inline-block"
                                >
                                    Go Back Home
                                </a>
                            </div>
                        </div>
                    }
                />

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
