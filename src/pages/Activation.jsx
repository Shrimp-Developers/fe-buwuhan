import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { activateAccount } from '../services/authService.js';
import { alertSuccess, alertError } from '../alert.js';

export default function Activation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        const code = searchParams.get('code');

        if (!code) {
            setStatus('error');
            setMessage('Kode aktivasi tidak ditemukan. Pastikan Anda menggunakan link yang benar dari email.');
            return;
        }

        const activate = async () => {
            try {
                const response = await activateAccount(code);
                const body = await response.json().catch(() => ({}));

                if (response.ok) {
                    setStatus('success');
                    setMessage(body.message || 'Akun Anda berhasil diaktivasi!');
                    await alertSuccess('Akun Anda berhasil diaktivasi! Silakan login.', 'Aktivasi Berhasil!');

                    // Redirect ke login setelah 2 detik
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    setStatus('error');
                    setMessage(body.message || 'Kode aktivasi tidak valid atau sudah kadaluarsa.');
                    await alertError(body.message || 'Gagal mengaktivasi akun', 'Aktivasi Gagal!');
                }
            } catch (err) {
                console.error('Activation error:', err);
                setStatus('error');
                setMessage('Terjadi kesalahan jaringan. Silakan coba lagi.');
                await alertError('Terjadi kesalahan jaringan', 'Aktivasi Gagal!');
            }
        };

        activate();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#8A86D5] px-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/logo.png"
                        alt="Buwuhan Logo"
                        className="w-24 h-24 object-contain"
                    />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-4">
                    {status === 'loading' && 'Mengaktivasi Akun...'}
                    {status === 'success' && 'Aktivasi Berhasil!'}
                    {status === 'error' && 'Aktivasi Gagal'}
                </h1>

                {/* Status Icon & Message */}
                <div className="mb-6">
                    {status === 'loading' && (
                        <div className="flex flex-col items-center">
                            <svg
                                className="animate-spin h-12 w-12 text-[#8A86D5] mb-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12" cy="12" r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <p className="text-gray-600">Mohon tunggu, sedang memproses aktivasi akun Anda...</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-gray-600">{message}</p>
                            <p className="text-sm text-gray-500 mt-2">Anda akan dialihkan ke halaman login...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-gray-600">{message}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    {status === 'error' && (
                        <>
                            <Link
                                to="/login"
                                className="block w-full bg-[#8A86D5] text-white py-3 rounded-xl font-semibold hover:bg-[#7975C9] transition"
                            >
                                Ke Halaman Login
                            </Link>
                            <Link
                                to="/register"
                                className="block w-full border-2 border-[#8A86D5] text-[#8A86D5] py-3 rounded-xl font-semibold hover:bg-[#F5F5FF] transition"
                            >
                                Daftar Ulang
                            </Link>
                        </>
                    )}

                    {status === 'success' && (
                        <Link
                            to="/login"
                            className="block w-full bg-[#8A86D5] text-white py-3 rounded-xl font-semibold hover:bg-[#7975C9] transition"
                        >
                            Login Sekarang
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
