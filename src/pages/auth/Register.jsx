import { Eye, Mail, Lock } from 'lucide-react';

export default function Register() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#8A86D5]">
            {/* Left Side - Image Section */}
            <div className="flex items-center justify-center bg-[#8A86D5] w-full lg:w-1/2 h-72 lg:h-auto">
                <img
                    src="../public/logo.png"
                    alt="Deskripsi icon-buwuhan"
                    className="w-56 h-56 lg:w-[350px] lg:h-[350px] object-contain"
                />
            </div>

            {/* Right Side - Form Section */}
            <div className="flex items-center justify-center flex-1 px-6 py-12 lg:px-12 bg-white rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">
                        Daftar
                    </h1>

                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                                    <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                                    <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button className="w-full bg-[#000000] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg">
                            Sign Up
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button className="text-[#8A86D5] font-semibold hover:underline">
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}