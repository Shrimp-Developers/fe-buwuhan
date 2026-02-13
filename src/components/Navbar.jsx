import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailUser from './DetailUser';
import DetailBuwuhan from './DetailBuwuhan';

export default function Navbar({ onMenuClick }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const location = useLocation();
    const title = (() => {
        const path = location.pathname.replace(/\/+$/, "");
        if (path === "/dashboard") return "Dashboard";
        if (path === "/buwuhan/create" || path.startsWith("/dashboard/create/")) return "Tambah Data";
        if (path === "/buwuhan" || path.startsWith("/dashboard/list/")) return "Lihat Semua Data";
        if (path === "/settings" || path.startsWith("/dashboard/setting/")) return "Pengaturan";
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
        <>
            {/* Mobile Search - Muncul menggantikan navbar */}
            {isSearchOpen ? (
                <div className="md:hidden px-4 sm:px-6 py-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari . . . ."
                            autoFocus
                            onBlur={() => setIsSearchOpen(false)}
                            className="pl-5 pr-10 py-2.5 w-full h-[40px] bg-white rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none shadow-lg border border-gray-200"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            ) : (
                /* Normal Navbar */
                <header className="py-4 sm:py-5 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between z-40 relative">
                    {/* Left Section - Hamburger on mobile, Title on desktop */}
                    <div className="flex items-center">
                        {/* Hamburger Menu - Mobile/Tablet Only */}
                        <button
                            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
                            onClick={onMenuClick}
                        >
                            <img
                                src="/icon-hamburger.png"
                                alt="deskripsi icon-hamburger"
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                        </button>

                        {/* Judul - Desktop Only */}
                        <h1 className="hidden md:block text-base lg:text-lg font-bold text-[#000000]">
                            {title}
                        </h1>
                    </div>

                    {/* Right Section - Icons */}
                    <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 relative">
                        {/* Search bar - Hidden on mobile/small tablet */}
                        <div className="hidden md:block relative">
                            <input
                                type="text"
                                placeholder="Cari . . . ."
                                className="pl-10 py-2 w-[200px] md:w-[250px] lg:w-[350px] h-[36px] md:h-[38px] bg-gray-100 rounded-full text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition shadow-lg"
                            />
                            <Search className="w-4 h-4 text-[#ACA0A0] absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Search Icon - Mobile/Tablet Only */}
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setIsSearchOpen(true);
                            }}
                            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] hover:bg-gray-200 transition border-2 border-[#000000]"
                        >
                            <img
                                src="/icon-search.png"
                                alt="deskripsi icon-search"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>

                        {/* Tombol Mode (Dark/Light) */}
                        <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] hover:bg-gray-200 transition border-2 border-[#000000]">
                            <img
                                src="/icon-moon.png"
                                alt="deskripsi icon-moon"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>

                        {/* Profile Popup */}
                        {/* Profile Image */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                            >
                                <img
                                    src="/icon-user.png"
                                    alt="deskripsi icon-user"
                                    className="w-8 h-8 sm:w-8 sm:h-8"
                                />
                            </button>

                            <DetailUser
                                isOpen={isProfileOpen}
                                onClose={() => setIsProfileOpen(false)}
                            />
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}