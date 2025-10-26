// DashboardLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from "react-router";
import Navbar from "../src/components/Navbar.jsx";
import Sidebar from "../src/components/Sidebar.jsx";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Auto close sidebar saat resize ke desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Konten utama di kanan */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Navbar */}
                <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Isi halaman atau (Outlet) */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}