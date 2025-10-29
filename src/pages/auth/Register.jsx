import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRegister } from "../../services/authService.js";
import { alertError, alertSuccess } from "../../services/alert.js";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        // Client-side validation
        // Cek fullName kosong
        if (!fullName || fullName.trim() === "") {
            await alertError("Full name is required", "Validation Error");
            setIsLoading(false);
            return;
        }

        // Cek email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            await alertError("Invalid email format", "Validation Error");
            setIsLoading(false);
            return;
        }

        // Cek password tidak kosong
        if (!password || password.trim() === "") {
            await alertError("Password is required", "Validation Error");
            setIsLoading(false);
            return;
        }

        // Cek password minimal 8 karakter dan ada huruf besar + angka
        if (password.length < 8) {
            await alertError("Password must be at least 8 characters", "Validation Error");
            setIsLoading(false);
            return;
        }

        // Cek password minimal ada huruf besar + angka
        if (!/[A-Z]/.test(password) && !/[0-9]/.test(password)) {
            await alertError("Password must contain at least one uppercase letter and one number", "Validation Error");
            setIsLoading(false);
            return;
        }

        // Cek password dan confirm password sama
        if (password !== confirmPassword) {
            await alertError("Password and confirm password do not match", "Validation Error");
            setIsLoading(false);
            return;
        }

        try {
            const res = await userRegister({ fullName, email, password });
            const body = await res.json().catch(() => ({}));

            if (res.ok) {
                await alertSuccess(
                    "Registrasi berhasil",
                    "Silakan login.",
                    "imageUrl"
                );
                navigate("/login");
            } else if (res.status === 400) {
                // Handle validation errors dari server
                const errors = body?.errors;
                if (errors && Array.isArray(errors)) {
                    // Tampilkan alert untuk setiap error field dari server
                    for (const err of errors) {
                        await alertError(err.messages, "Validasi Gagal");
                    }
                } else {
                    await alertError(body?.message || "Data tidak valid", "Validasi Gagal");
                }
            } else if (res.status === 409) {
                // Handle conflict (email already registered)
                const errorMsg = body?.message || body?.error || "Email already registered";
                await alertError(errorMsg, "Registrasi Gagal");
            } else {
                const msg = body?.message || `Registrasi gagal (status ${res.status})`;
                await alertError(msg, "Registrasi Gagal");
            }
        } catch (err) {
            console.error("Registration error:", err);
            await alertError(
                err?.message || "Terjadi masalah jaringan. Silakan coba lagi.",
                "Registrasi Gagal"
            );
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
                                        <EyeOff className="h-5 w-5 text-[#ACA0A0]" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Konfirmasi Kata Sandi"
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8A86D5] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-[#ACA0A0]" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#000000] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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