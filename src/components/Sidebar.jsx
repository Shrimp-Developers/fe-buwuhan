import { PlusCircle, LogOut, X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function Sidebar({ isOpen, onClose }) {

    const { pathname } = useLocation();
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        logout();
        onClose();
    };

    const menuClasses = (path) =>
        `w-full flex items-center gap-6 px-4 py-3 mb-2 rounded-lg text-sm font-medium transition-all duration-200
        ${pathname === path
            ? "bg-[#F5F6FA] text-[#000000]"
            : "text-[#000000] hover:bg-gray-300"
        }`;

    return (
        <>
            {/* Mobile  */}
            {isOpen && (
                <div
                    className="fixed z-40 md:hidden h-screen"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static
                top-0 left-0
                w-[300px] md:w-[300px]
                bg-[#FFFFFF]
                flex flex-col 
                h-screen 
                z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Profile */}
                <div className="py-5 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                            <img
                                src="/logo.png"
                                alt="Deskripsi icon-logo"
                                className="w-14 h-14"
                            />
                        </div>
                        <span className="font-semibold text-lg ">BUWUHAN</span>
                    </div>

                    {/* Close Button - Mobile Only */}
                    <button
                        onClick={onClose}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-7 py-1 overflow-y-auto">

                    <Link to="/dashboard" className={menuClasses("/dashboard")}>
                        <img alt="icon-dashboard" src="/icon-dashboard.png" className="w-7 h-7" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/dashboard/create" className={menuClasses("/dashboard/create")}>
                        <PlusCircle className="w-7 h-7" />
                        <span>Tambah Data</span>
                    </Link>

                    <Link to="/dashboard/list" className={menuClasses("/dashboard/list")}>
                        <img alt="icon-list" src="/icon-list-data.png" className="w-7 h-7" />
                        <span>Lihat Semua Data</span>
                    </Link>

                    <Link to="/setting" className={menuClasses("/setting")}>
                        <img alt="icon-setting" src="/icon-settings.png" className="w-7 h-7" />
                        <span>Pengaturan</span>
                    </Link>
                </nav>

                {/* Logout */}
                <div className="p-6 border-gray-300">
                    <button onClick={handleLogout} className="w-full flex items-center gap-6 px-4 py-3 text-[#000000] hover:bg-gray-300 rounded-lg text-sm transition-all duration-200">
                        <LogOut className="w-7 h-7" />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>
        </>
    );
}