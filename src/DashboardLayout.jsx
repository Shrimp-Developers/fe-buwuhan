import { useState, useEffect } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../src/context/useAuth.js";
import Navbar from "../src/components/Navbar.jsx";
import Sidebar from "../src/components/Sidebar.jsx";

export default function DashboardLayout() {
    const { user, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    // Kalau belum login → tendang ke login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Auto close sidebar saat resize ke desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-screen bg-[#F5F6FA]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
