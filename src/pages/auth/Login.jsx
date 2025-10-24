import {Link, useNavigate} from "react-router";
import { Eye, Mail, Lock } from 'lucide-react';

export default function Login() {
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

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center flex-1 px-6 py-12 lg:px-12 bg-white rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Masuk</h1>
                    <div className="space-y-5">
                        {/* Email Input */}
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

                        {/* Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
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

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button className="text-sm text-[#000000] hover:underline">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button className="w-full bg-[#000000] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg">
                            Login
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#000000]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-[#000000]">Or sign with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                                aria-label="Login with Google"
                            >
                                <img
                                    src="public/icon-google.png"
                                    alt="deskripsi icon-google"
                                    className="w-6 h-6 object-contain"
                                />
                            </button>
                            <button
                                type="button"
                                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                                aria-label="Login with Facebook"
                            >
                                <img
                                    src="public/icon-facebook.png"
                                    alt="Deskripsi Icon-Buwuhan"
                                    className="w-7 h-7 object-contain"
                                />
                            </button>
                            <button
                                type="button"
                                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                                aria-label="Login with apple"
                            >
                                <img
                                    src="public/icon-apple.png"
                                    alt="Deskripsi icon-apple"
                                    className="w-6 h-6 object-contain"
                                />
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Don't have account?{' '}
                                <button className="text-[#8A86D5] font-semibold hover:underline">
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}