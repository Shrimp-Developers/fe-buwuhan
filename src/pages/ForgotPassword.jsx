import { useState } from 'react';
import { Mail } from 'lucide-react';
import { forgotPassword } from '../services/authService.js';
import { alertSuccess, alertError } from '../alert.js'

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await forgotPassword({ email });
            const data = await response.json();
            if (response.ok) {
                await alertSuccess(data.message || 'Permintaan reset password berhasil dikirim. Silakan cek email Anda', 'Berhasil!', '/icon-alert-success.png');
            } else {
                await alertError(data.message || 'Permintaan reset password gagal. Pastikan email yang Anda masukkan benar', 'Gagal!', '/icon-alert-error.png');
            }
        } catch (error) {
            console.error('Error:', error);
            await alertError('Terjadi kesalahan saat mengirim permintaan reset password', 'Gagal!', '/icon-alert-error.png');
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

            {/* Right Side - Forgot-Password Form */}
            <div className="flex items-center justify-center flex-1 px-6 py-12 lg:px-12 bg-white rounded-t-[50px] lg:rounded-l-[50px] lg:rounded-t-none shadow-lg">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">Lupa Kata Sandi</h1>
                    <div className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ACA0A0] w-5 h-5" />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl focus:outline-none focus:ring-2 transition"
                                />
                            </div>
                        </div>

                        {/* Konfirmasi Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
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
                    </div>
                </div>
            </div>
        </div>
    );
}