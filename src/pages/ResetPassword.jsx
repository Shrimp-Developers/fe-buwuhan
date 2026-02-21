import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { resetPassword } from '../services/authService.js';
import { alertSuccess, alertError } from '../alert.js';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (newPassword.length < 8) {
            await alertError('Password minimal 8 karakter', 'Gagal!', '/icon-alert-error.png');
            return;
        }

        if (newPassword !== confirmPassword) {
            await alertError('Konfirmasi password tidak cocok', 'Gagal!', '/icon-alert-error.png');
            return;
        }

        if (!token) {
            await alertError('Token reset password tidak ditemukan', 'Gagal!', '/icon-alert-error.png');
            return;
        }

        setIsLoading(true);

        try {
            const response = await resetPassword({ newPassword, token });
            const data = await response.json();
            if (response.ok) {
                await alertSuccess(data.message || 'Password berhasil direset', 'Berhasil!', '/icon-alert-success.png');
            } else {
                const errorMsg = data.errors?.[0]?.message || data.message || 'Gagal mereset password';
                await alertError(errorMsg, 'Gagal!', '/icon-alert-error.png');
            }
        } catch (error) {
            console.error('Error:', error);
            await alertError('Terjadi kesalahan saat mereset password', 'Gagal!', '/icon-alert-error.png');
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

            {/* Right Side - Reset-Password Form */}
            <div className="flex items-center justify-center flex-1 px-6 py-12 lg:px-12 bg-white rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Reset Kata Sandi</h1>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Kata Sandi Baru"
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-[#ACA0A0]" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Konfirmasi Kata Sandi"
                                    className="w-full pl-12 pr-12 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-[#ACA0A0]" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-[#ACA0A0]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Konfirmasi Button */}
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
                                'Konfirmasi'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}