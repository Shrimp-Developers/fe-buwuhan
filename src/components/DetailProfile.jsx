import { X } from 'lucide-react';

export default function DetailProfile({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end lg:items-start lg:end lg:px-20 lg:py-24 px-5 py-6 sm:items-center">
            <div className="relative w-full max-w-[300px] lg:max-w-[350px] bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
                >
                    <X className="w-6 h-6 text-black" />
                </button>

                {/* Form */}
                <form className="space-y-3">
                    {/* Profile Image with Choose File */}
                    <div className="flex flex-col items-center mb-2 relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C2BFF8] mb-2 relative">
                            <img
                                src="/image-dino.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Choose File */}
                            <label className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-xs cursor-pointer opacity-0 hover:opacity-100 transition rounded-full">
                                Choose File
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div>
                        <label className="text-[10px] text-gray-600 mb-1 block">Nama lengkap</label>
                        <input
                            type="text"
                            placeholder="Haris Gunawan Romadhon"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] text-gray-600 mb-1 block">Nama pengguna</label>
                        <input
                            type="text"
                            placeholder="harismoon23"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] text-gray-600 mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="harisg@gmail.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-gray-50"
                        />
                    </div>

                    {/* Update Button */}
                    <button
                        type="button"
                        className="mt-2 py-3 px-3 bg-[#8A86D5] hover:bg-blue-400 text-white rounded-full text-xs font-medium mx-auto lg:px-5 flex items-center transition"
                    >
                        Ubah profile
                    </button>
                </form>
            </div>
        </div>
    );
}
