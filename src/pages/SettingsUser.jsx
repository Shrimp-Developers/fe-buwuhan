import { Link } from "react-router-dom";

export default function SettingsUser() {
    return (
        <div className="w-full mx-auto px-3 sm:px-4 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 md:hidden">
                Pengaturan
            </h1>

            <div className="space-y-2.5 sm:space-y-3">
                {/* Item 1 */}
                <button className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#000000] rounded-full bg-white hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <img
                            src="/icon-language.png"
                            alt="Deskripsi icon-list-data"
                            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-xs sm:text-sm">Bahasa</span>
                    </div>
                    <img
                        src="/icon-right.png"
                        alt="Deskripsi icon-right"
                        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                    />
                </button>

                {/* Item 2 */}
                <button className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#000000] rounded-full bg-white hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <img
                            src="/icon-teks.png"
                            alt="Deskripsi icon-teks"
                            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-xs sm:text-sm">Ukuran Huruf</span>
                    </div>
                    <img
                        src="/icon-right.png"
                        alt="Deskripsi icon-right"
                        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                    />
                </button>

                {/* Item 3 */}
                <Link to="/buwuhan/settings/update-password" className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#000000] rounded-full bg-white hover:bg-gray-50 transition">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <img
                            src="/icon-key.png"
                            alt="Deskripsi icon-key"
                            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-xs sm:text-sm">Kata Sandi</span>
                    </div>
                    <img
                        src="/icon-right.png"
                        alt="Deskripsi icon-key"
                        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                    />
                </Link>
            </div>

        </div>
    );
}