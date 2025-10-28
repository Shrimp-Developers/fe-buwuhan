import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const location = useLocation();
    const title = (() => {
        const path = location.pathname.replace(/\/+$/, "");
        if (path === "/dashboard") return "Ringkasan";
        if (path === "/dashboard/create" || path.startsWith("/dashboard/create/")) return "Tambah Data";
        if (path === "/dashboard/list" || path.startsWith("/dashboard/list/")) return "Lihat Semua Data";
        if (path === "/dashboard/detail" || path.startsWith("/dashboard/detail/")) return "Detail Data";
        if (path === "/setting" || path.startsWith("/dashboard/setting/")) return "Pengaturan";
        return null;
    })();

    // Close profile popup when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isProfileOpen]);

    return (
        <header className="py-6 px-6 md:px-14 flex items-center justify-between sticky top-0 z-40 ">
            {/* Hamburger Menu - Mobile Only */}
            <button
                className="md:hidden w-10 h-10 flex items-center justify-center"
                onClick={onMenuClick}
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Judul kiri */}
            <h1 className="hidden md:block text-xl font-semibold text-[#000000]">
                {title}
            </h1>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Search bar - Hidden on mobile */}
                <div className="hidden md:block relative">
                    <input
                        type="text"
                        placeholder="Cari . . ."
                        className="pl-10 pr-4 py-2 w-[300px] lg:w-[420px] h-[42px] bg-gray-100 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition shadow-xl"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Search Icon - Mobile Only */}
                <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <Search className="w-6 h-6 text-gray-700" />
                </button>

                {/* Tombol Mode (Dark/Light) */}
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition border-1 border-[#757575]">
                    <img
                        src="/icon-thsirt.png"
                        alt="deskripsi icon-tshirt"
                        className="w-6 h-6 text-gray-700"
                    />
                </button>

                {/* Profil */}
                <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                    <img
                        src="/icon-user.png"
                        alt="deskripsi icon-user"
                        className="w-9 h-9 text-gray-700"
                    />
                </button>
            </div>
        </header>
    );
}
