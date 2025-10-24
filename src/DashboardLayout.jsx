import { Outlet } from "react-router";
import Navbar from "../src/components/Navbar.jsx";
import Sidebar from "../src/components/Sidebar.jsx";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar di kiri */}
            <Sidebar />

            {/* Konten utama di kanan */}
            <div className="flex flex-col flex-1">
                {/* Navbar di atas */}
                <Navbar title="Overview" />

                {/* Isi halaman (Outlet) */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
