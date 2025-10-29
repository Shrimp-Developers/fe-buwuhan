import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../services/authService.js";
import { alertError, alertSuccess } from "../../services/alert.js";
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        // Cek email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            await alertError("Invalid email format", "Validation Error", "imageUrl");
            setIsLoading(false);
            return;
        }

        // Validasi password minimal satu huruf besar dan satu angka
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            await alertError("Password must contain at least one uppercase letter and one number", "Validation Error");
            setIsLoading(false);
            return;
        }

        try {
            const res = await userLogin({ email, password });
            const body = await res.json().catch(() => ({}));

            if (res.ok) {
                const token = body?.data?.accessToken;
                const user = body?.data?.user;

                await alertSuccess("User logged in succesfully", "Login Succes", "imageUrl");
                navigate("/dashboard/", {
                    state: {
                        token,
                        user
                    }
                });

            } else if (res.status === 400) {
                //  error validasi dari backend
                const errors = body?.errors;
                if (errors && Array.isArray(errors)) {
                    for (const err of errors) {
                        await alertError(err.messages, `Error pada ${err.field}`, "imageUrl");
                    }
                } else {
                    await alertError(body?.message || "Account not found", "Validation Error", "imageUrl");
                }

            } else if (res.status === 401) {
                // Email atau password salah
                await alertError(body?.message || "Invalid email or password", "Unauthorized", "imageUrl");

            } else {
                await alertError(body?.message || `Login failed (status ${res.status})`, "Unauthorized", "imageUrl");
            }
        } catch (err) {
            console.error("Login error:", err);
            await alertError("A network error occurred. Please try again", "Login Failed", "imageUrl");
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

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center flex-1 px-6 py-12 lg:px-12 bg-white rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Masuk</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
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

                        {/* Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
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

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button
                                type="button"
                                className="text-sm text-[#000000] hover:underline disabled:opacity-50"
                                disabled={isLoading}
                            >
                                Lupa kata sandi?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#000000] text-white py-3 rounded-xl font-semibold hover:bg-blue-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

                    {/* Social Login Buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center disabled:opacity-50"
                            aria-label="Login with Google"
                            disabled={isLoading}
                        >
                            <img
                                src="/icon-google.png"
                                alt="deskripsi icon-google"
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

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Tidak punya akun?{' '}
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