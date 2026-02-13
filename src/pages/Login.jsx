import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin, loginWithGoogle } from "../services/authService.js";
import { alertError, alertSuccess } from "../alert.js";
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
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

        // Cek password minimal 8 karakter
        if (password.length < 8 || password.length > 100) {
            await alertError("Kata sandi harus minimal 8 karakter", "Gagal Masuk!", "/icon-alert-error.png");
            setIsLoading(false);
            return;
        }

        try {
            const response = await userLogin({ email, password });
            const body = await response.json().catch(() => ({}));

            if (response.ok) {
                const token = body?.data?.accessToken;
                const user = body?.data?.user;

                //cek penyimpanan token apakah sudah registrasi atau data sudah ada
                if (token) {
                    localStorage.setItem('accessToken', token);
                }

                // cek penyimpanan user apakah sudah registrasi atau data sudah ada
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
                await alertSuccess("Login berhasil!", "Selamat Datang!", "/icon-alert-success.png");
                // kalo data akun sudah ada bisa langsung ke dashboard
                navigate("/dashboard/")

            } else if (response.status === 400) {
                // cek email sesuai format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailRegex.test(email)) {
                    await alertError("Format email tidak valid", "Gagal Masuk!", "/icon-alert-error.png");
                } else {
                    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
                        await alertError("Kata sandi harus mengandung setidaknya satu huruf besar dan satu angka", "Gagal Masuk!", "/icon-alert-error.png");
                        setIsLoading(false);
                    }
                }

            } else if (response.status === 401) {
                // mengatasi ketika error status 401
                const message = body?.message;
                // akun belum aktif/ belum diverifikasi
                if (message.toLowerCase().includes('inactive')) {
                    await alertError(
                        "Akun Anda tidak aktif. Silakan hubungi dukungan atau periksa email Anda untuk petunjuk aktivasi.",
                        "Gagal Masuk!",
                        "/icon-alert-error.png"
                    );
                } else if (message.toLowerCase().includes('google')) {
                    await alertError(
                        "Email ini terdaftar di Google. Silakan gunakan fitur masuk Google.",
                        "Gagal Masuk!",
                        "/icon-alert-error.png"
                    );
                } else {
                    // Invalid credentials
                    await alertError("Email atau kata sandi salah", "Gagal Masuk!", "/icon-alert-error.png");
                }
            }
            // Kalo server error
        } catch (err) {
            console.error("Login error:", err);
            await alertError("Terjadi kesalahan jaringan. Silakan coba lagi.", "Gagal Masuk!", "/icon-alert-error.png");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#8A86D5]">
            {/* Left Side - Image Section */}
            <div className="flex items-center justify-center bg-[#8A86D5] w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-auto">
                <img
                    src="/logo.png"
                    alt="Deskripsi icon-buwuhan"
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[350px] lg:h-[350px] object-contain"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center flex-1 px-5 sm:px-6 py-8 sm:py-10 lg:px-12 lg:py-12 bg-white rounded-t-[40px] sm:rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">Masuk</h1>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        {/* Email Input */}
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    disabled={isLoading}
                                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A86D5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Kata Sandi"
                                    disabled={isLoading}
                                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A86D5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                                    disabled={isLoading}
                                >
                                    {!showPassword ? (
                                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                                    ) : (
                                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-[#000000] disabled:opacity-50 underline"
                                onClick={(e) => isLoading && e.preventDefault()}
                            >
                                Lupa kata sandi?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#000000] text-white py-3 rounded-full font-semibold hover:bg-[#8A86D5] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
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
                                'Masuk'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#000000]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-[#000000]">Atau masuk dengan</span>
                        </div>
                    </div>

                    {/* Login Google */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-auto px-6 py-3 bg-gray-200 font-medium sm:text-sm text-sm rounded-full gap-3 hover:bg-gray-300 transition flex items-center justify-center disabled:opacity-50 cursor-pointer"
                            aria-label="Login with Google"
                            disabled={isLoading}
                        >
                            <img
                                src="/icon-google.png"
                                alt="Google"
                                className="w-6 h-6 object-contain"
                            />
                       Masuk dengan Google </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Belum punya akun{' '}
                            <Link
                                to="/register"
                                className="text-[#8A86D5] font-semibold hover:underline"
                                onClick={(e) => isLoading && e.preventDefault()}
                            >
                                Buat Akun
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}