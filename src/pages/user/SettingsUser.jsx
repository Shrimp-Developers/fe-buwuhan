import React from 'react';
import { Link } from "react-router-dom";

export default function SettingsUser() {
    return (
        <div className="w-full mx-auto px-6 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-lg font-semibold text-gray-900 mb-6 md:hidden" >
                Pengaturan
            </h1>

            <div className="space-y-4">
                {/* Item 1 */}
                <button className="w-full flex items-center justify-between px-8 py-3 border border-[#000000] rounded-full  bg-white hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                        <img
                            src="/icon-language.png"
                            alt="Deskripsi icon-list-data"
                            className="w-6 h-6 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-base">Bahasa</span>
                    </div>
                    <img
                        src="/icon-right.png"
                        alt="Deskripsi icon-right"
                        className="w-8 h-8 flex-shrink-0"
                    />
                </button>

                {/* Item 2 */}
                <button className="w-full flex items-center justify-between px-8 py-3 border border-[#000000] rounded-full bg-white hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                        <img
                            src="/icon-teks.png"
                            alt="Deskripsi icon-teks"
                            className="w-6 h-6 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-base">Ukuran Huruf</span>
                    </div>
                    <img
                        src="/icon-right.png"
                        alt="Deskripsi icon-right"
                        className="w-8 h-8 flex-shrink-0"
                    />
                </button>

                {/* Item 3 */}
                <Link to= "/setting/edit-password" className="w-full flex items-center justify-between px-8 py-3 border border-[#000000] rounded-full  bg-white hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                        <img
                            src="/icon-key.png"
                            alt="Deskripsi icon-key"
                            className="w-6 h-6 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-base">Kata Sandi</span>
                    </div>
                    <img
                        src="/icon-right.png"
                        alt="Deskripsi icon-key"
                        className="w-8 h-8 flex-shrink-0"
                    />
                </Link>
            </div>

        </div>
    );
}
