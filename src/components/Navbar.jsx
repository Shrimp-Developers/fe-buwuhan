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

                    {/* Right Section - Icons */}
                    <div className="flex items-center gap-2 md:gap-4 px-6 relative">
                        {/* Search bar - Hidden on mobile */}
                        <div className="hidden md:block relative">
                            <input
                                type="text"
                                placeholder="Cari . . . ."
                                className="pl-14 py-3 w-[300px] lg:w-[420px] h-[42px] bg-gray-100 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition shadow-xl"
                            />
                            <Search className="ml-2 w-5 h-5 text-[#ACA0A0] absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Search Icon - Mobile Only */}
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setIsSearchOpen(true);
                            }}
                            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-[#E8E9EE] hover:bg-gray-200 transition border-2 border-[#000000]"
                        >
                            <img
                                src="/icon-search.png"
                                alt="deskripsi icon-search"
                                className="w-6 h-6"
                            />
                        </button>

                        {/* Tombol Mode (Dark/Light) */}
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E8E9EE] hover:bg-gray-200 transition border-2 border-[#000000]">
                            <img
                                src="/icon-moon.png"
                                alt="deskripsi icon-moon"
                                className="w-6 h-6"
                            />
                        </button>

                        {/* Profil */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition bg-[#E8E9EE]"
                            >
                                <img
                                    src="/icon-user.png"
                                    alt="deskripsi icon-user"
                                    className="w-8 h-8"
                                />
                            </button>

                            {/* Profile Popup */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-4 w-[350px] bg-white rounded-2xl shadow-2xl p-6 z-50">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setIsProfileOpen(false)}
                                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
                                    >
                                        <X className="w-5 h-5 text-[#000000]" />
                                    </button>

                                    {/* Profile Image */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C2BFF8]">
                                            <img
                                                src="/image-dino.png"
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-xs text-gray-600 mb-1">Nama lengkap</div>
                                            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                                Haris gunawan romadhon
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-xs text-gray-600 mb-1">Nama pengguna</div>
                                            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                                harismoon23
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-xs text-gray-600 mb-1">Email</div>
                                            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                                harisg@gmail.com
                                            </div>
                                        </div>
                                    </div>

                                    {/* Update Button */}
                                    <button className="mt-4 py-2 bg-[#8A86D5] hover:bg-blue-400 text-white rounded-full text-sm font-medium transition flex justify-center items-center mx-auto px-8">
                                        Ubah profile
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}
