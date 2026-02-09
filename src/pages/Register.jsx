import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRegister, loginWithGoogle } from "../services/authService.js";
import { alertError, alertSuccess } from "../alert.js";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle Google Login (redirect ke backend)
    const handleGoogleLogin = () => {
        if (isLoading) return;
        loginWithGoogle();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        // cek fullNqme minimal 3 maksimal 100
        if (fullName.length < 3 || fullName.length > 100) {
            await alertError("Full name must be at least 3 characters", "Validation Error", "imageUrl");
        }

        // Cek password minimal 8 karakter maksimal 100
        if (password.length < 8 || password.length > 100) {
            await alertError("Password must be at least 8 characters", "Validation Error", "imageUrl");
            setIsLoading(false);
            return;
        }

        try {
            const response = await userRegister({ fullName, email, password });
            // cek jika berhasil
            if (response.ok || response.status === 200) {
                await alertSuccess("Periksa email untuk aktivasi akun terlebih dahulu", "Daftar Berhasil!.", "imageUrl");
                navigate("/login");
            } else if (response.status === 400) {
                // cek full name harus diisi
                if (!fullName) {
                    await alertError("Nama lengkap tidak boleh kosong", "Gagal Daftar!", "imageUrl")
                }
                // cek email sesuai format atau tidak
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    await alertError("Format email tidak valid", "Gagal Daftar!", "imageUrl");
                }
                // Cek password minimal ada huruf besar + angka
                if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
                    await alertError("Kata sandi harus mengandung setidaknya satu huruf besar dan satu angka", "Gagal Daftar!", "imageUrl");
                }
            } else if (response.status === 409) {
                // mengatasi konflik
                await alertError("Email sudah terdaftar", "Gagal Daftar!", "imageUrl");
            }
        } catch (err) {
            // jika server error
            console.error("Registered error:", err);
            await alertError(err?.message || "Terjadi masalah jaringan. Silakan coba lagi.", "Gagal Daftar!", "imageUrl");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#8A86D5]">
            {/* Left Side - Image Section */}
            <div className="flex items-center justify-center bg-[#8A86D5] w-full lg:w-1/2 h-72 lg:h-auto">
                <img
                    src="/logo.png"
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
                                    type="text"
                                    name="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Nama Lengkap"
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A86D5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A86D5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Kata Sandi"
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A86D5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-[#ACA0A0]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#000000] text-white py-3 rounded-xl font-semibold hover:bg-[#8A86D5] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                'Daftar'
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#000000]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-[#000000]">Atau masuk dengan</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex justify-center gap-4">
                            {/* Google Sign-In Button */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                aria-label="Register with Google"
                                disabled={isLoading}
                            >
                                <img
                                    src="/icon-google.png"
                                    alt="Google"
                                    className="w-6 h-6 object-contain"
                                />
                            </button>
                            <button
                                type="button"
                                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center disabled:opacity-50"
                                aria-label="Login with Facebook"
                                disabled={isLoading}
                            >
                                <img
                                    src="/icon-facebook.png"
                                    alt="Deskripsi Icon-Buwuhan"
                                    className="w-7 h-7 object-contain"
                                />
                            </button>
                            <button
                                type="button"
                                className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center disabled:opacity-50"
                                aria-label="Login with apple"
                                disabled={isLoading}
                            >
                                <img
                                    src="/icon-apple.png"
                                    alt="Deskripsi icon-apple"
                                    className="w-6 h-6 object-contain"
                                />
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Sudah punya akun?{' '}
                                <Link
                                    to="/login"
                                    className="text-[#8A86D5] font-semibold hover:underline"
                                    onClick={(e) => isLoading && e.preventDefault()}
                                >
                                    Masuk
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}