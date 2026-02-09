import React from "react";
import { Link } from "react-router-dom";

export default function EditPassword() {
    return (
        <div className="w-full px-6 md:px-10 space-y-4">
            {/* Header */}
            <div className="w-full max-w-sm">
                <Link to="/settings" className="flex items-center justify-center w-9 h-9 mb-4">
                    <img
                        src="/icon-left.png"
                        alt="Deskripsi icon-left"
                        className="w-9 h-9 flex-shrink-0"
                    />
                </Link>

                <h2 className="text-xl font-semibold mb-3">Ubah kata sandi</h2>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-base text-[#000000] mb-1">Kata sandi lama</label>
                        <input
                            type="password"
                            className="w-full border border-[#000000] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Masukkan kata sandi lama"
                        />
                    </div>

                    <div>
                        <label className="block text-base text-[#000000] mb-1">Kata sandi baru</label>
                        <input
                            type="password"
                            className="w-full border border-[#000000] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Masukkan kata sandi baru"
                        />
                    </div>

                    <div>
                        <label className="block text-base text-[#000000] mb-1">Konfirmasi kata sandi baru</label>
                        <input
                            type="password"
                            className="w-full border border-[#000000] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Masukkan kembali kata sandi baru"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white font-medium rounded-full px-4 py-2  hover:bg-gray-800 transition"
                    >
                        Ubah Sandi
                    </button>
                </form>
            </div>
        </div>
    );
}
