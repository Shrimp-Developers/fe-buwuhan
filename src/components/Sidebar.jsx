import { PlusCircle, LogOut, X, LayoutDashboard, Settings, List } from 'lucide-react';
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
        `w-full flex items-center gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 py-2.5 sm:py-3 mb-2 rounded-lg text-xs sm:text-sm md:text-xs font-medium transition-all duration-200
        ${pathname === path
            ? "bg-[#8A86D5] text-[#ffffff] hover:bg-[#8A86D5]"
            : "text-[#000000] hover:bg-[#8A86D533] hover:text-[#000000]"
        }`;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static
                top-0 left-0
                w-[280px] sm:w-[300px] md:w-[250px] lg:w-[270px]
                bg-[#FFFFFF]
                flex flex-col 
                h-screen 
                z-50
                transform transition-transform duration-300 ease-in-out
                shadow-2xl md:shadow-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Profile */}
                <div className="py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                            <img
                                src="/logo.png"
                                alt="Deskripsi icon-logo"
                                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                            />
                        </div>
                        <span className="font-semibold text-base sm:text-lg">BUWUHAN</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-4 sm:px-6 md:px-5 lg:px-7 py-3 sm:py-4 md:py-2 overflow-y-auto">

                    <Link to="/dashboard" className={menuClasses("/dashboard")}>
                        <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/buwuhan/create" className={menuClasses("/buwuhan/create")}>
                        <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Tambah Data</span>
                    </Link>

                    <Link to="/buwuhan" className={menuClasses("/buwuhan")}>
                        <List className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Lihat Semua Data</span>
                    </Link>

                    <Link to="/settings" className={menuClasses("/settings")}>
                        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Pengaturan</span>
                    </Link>

                    <button className="w-full flex items-center gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 py-3 sm:py-4 text-[#000000] hover:bg-[#8A86D533] rounded-lg text-xs sm:text-sm md:text-xs transition-all duration-200 mt-2" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Keluar</span>
                    </button>
                </nav>
            </aside>
        </>
    );
}