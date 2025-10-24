import { Eye, Lock } from 'lucide-react';

export default function ResetPassword() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#8A86D5]">
            {/* Left Side - Image Section */}
            <div className="flex items-center justify-center bg-[#8A86D5] w-full lg:w-1/2 h-72 lg:h-auto">
                <img
                    src="public/logo.png"
                    alt="Deskripsi icon-buwuhan"
                    className="w-56 h-56 lg:w-[350px] lg:h-[350px] object-contain"
                />
            </div>

            {/* Right Side - Reset-Password Form */}
            <div className="flex items-center justify-center flex-1 px-6 py-12 lg:px-12 bg-white rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Lupa Kata Sandi</h1>
                    <div className="space-y-5">
                        {/* Reset-Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Kata Sandi Baru"
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                >
                                    <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                </button>
                            </div>
                        </div>

                        {/*Reset Password Confirm Input*/}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Konfirmasi Kata Sandi"
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                >
                                    <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                </button>
                            </div>
                        </div>

                        {/* Konfirmasi Button */}
                        <button className="w-full bg-[#000000] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg">
                            Konfirmasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}