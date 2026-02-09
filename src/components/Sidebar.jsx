import { PlusCircle, LogOut, X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar({ isOpen, onClose }) {

    const { pathname } = useLocation();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        onClose();
    };

    const menuClasses = (path) =>
        `w-full flex items-center gap-6 px-4 py-3 mb-2 rounded-lg text-xs font-medium transition-all duration-200
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
                w-[300px] md:w-[270px]
                bg-[#FFFFFF]
                flex flex-col 
                h-screen 
                z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Profile */}
                <div className="py-5 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                            <img
                                src="/logo.png"
                                alt="Deskripsi icon-logo"
                                className="w-14 h-14 object-contain"
                            />
                        </div>
                        <span className="font-semibold text-lg">BUWUHAN</span>
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
                        <img alt="icon-dashboard" src="/icon-dashboard.png" className="w-6 h-6" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/buwuhan/create" className={menuClasses("/buwuhan/create")}>
                        <PlusCircle className="w-6 h-6" />
                        <span>Tambah Data</span>
                    </Link>

                    <Link to="/buwuhan" className={menuClasses("/buwuhan")}>
                        <img alt="icon-list" src="/icon-list-data.png" className="w-6 h-6" />
                        <span>Lihat Semua Data</span>
                    </Link>

                    <Link to="/settings" className={menuClasses("/settings")}>
                        <img alt="icon-setting" src="/icon-settings.png" className="w-6 h-6" />
                        <span>Pengaturan</span>
                    </Link>

                    <button className="w-full flex items-center gap-6 px-4 py-4 text-[#000000] hover:bg-gray-300 rounded-lg text-xs transition-all duration-200" onClick={handleLogout}>
                        <LogOut className="w-6 h-6" />
                        <span>Keluar</span>
                    </button>
                </nav>
            </aside>
        </>
    );
}