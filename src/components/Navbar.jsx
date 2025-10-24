import { Search, Moon, User, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="pt-6 px-8 md:px-13 flex items-center justify-between">
            {/* Hamburger Menu - Mobile Only */}
            <button className="md:hidden w-10 h-10 flex items-center justify-center">
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Judul kiri - Hidden on mobile */}
            <h1 className="hidden md:block text-xl font-semibold text-[#000000]">Ringkasan</h1>

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
                    <Search className="w-5 h-5 text-gray-700" />
                </button>

                {/* Tombol Mode (Dark/Light) */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <Moon className="w-5 h-5 text-gray-700" />
                </button>

                {/* Profil */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <User className="w-5 h-5 text-gray-700" />
                </button>
            </div>
        </header>
    );
}