import { PlusCircle, LogOut, X } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {

    const { pathname } = useLocation();

    const menuClasses = (path) =>
        `w-full flex items-center gap-6 px-4 py-3 mb-2 rounded-lg text-sm font-medium transition-all duration-200
        ${pathname === path
            ? "bg-[#F5F6FA] text-[#000000]"
            : "text-[#000000] hover:bg-gray-300"
        }`;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed z-40 md:hidden"
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
                <div className="py-5 px-6 flex items-center justify-start">
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
                <nav className="flex-1 px-4 py-2 overflow-y-auto">
                    <button className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm bg-white text-gray-900 font-medium shadow-sm transition-all duration-200">
                        <img
                            src="/icon-dashboard.png"
                            alt="Deskripsi icon-dashboard"
                            className="w-6 h-6 flex-shrink-0"
                        />
                        <span className="text-left">Dashboard</span>
                    </button>

                    <Link to="/dashboard/create" className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm text-gray-700 hover:bg-gray-300 transition-all duration-200">
                        <PlusCircle className="w-7 h-7 flex-shrink-0" />
                        <span className="text-left">Tambah Data</span>
                    </Link>

                    <Link to="/dashboard/list" className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm text-gray-700 hover:bg-gray-300 transition-all duration-200">
                        <img
                            src="/icon-list-data.png"
                            alt="Deskripsi icon-list-data"
                            className="w-6 h-6 flex-shrink-0"
                        />
                        <span className="text-left">Lihat Semua Data</span>
                    </Link>

                    <Link to="/settings" className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm text-gray-700 hover:bg-gray-300 transition-all duration-200">
                        <img
                            src="/icon-settings.png"
                            alt="Deskripsi icon-settings"
                            className="w-6 h-6 flex-shrink-0"
                        />
                        <span className="text-left">Pengaturan</span>
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="p-6 border-gray-300">
                    <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-300 rounded-lg text-sm transition-all duration-200">
                        <LogOut className="w-6 h-6 flex-shrink-0" />
                        <span>Log Out</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}