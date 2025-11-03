import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getCurrentUser } from '../../services/authService';

export default function GoogleCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [status, setStatus] = useState('Memproses autentikasi...');

    useEffect(() => {
        const verifyGoogleAuth = async () => {
            try {
                setStatus('Memverifikasi akun Google...');

                // Tunggu sebentar untuk memastikan cookie sudah di-set oleh backend
                // Backend redirect ke sini setelah set cookie
                await new Promise(resolve => setTimeout(resolve, 800));

                // Ambil user data dari backend menggunakan cookie
                const userData = await getCurrentUser();

                if (userData) {
                    setStatus('Login berhasil! Mengalihkan ke dashboard...');

                    // Ekstrak token dari cookie jika perlu untuk localStorage
                    // Atau gunakan dummy token karena auth sebenarnya pakai cookie
                    const cookieToken = getCookieValue('access_token') || `google_auth_${Date.now()}`;

                    // Simpan user data ke context & localStorage
                    login(userData, cookieToken);

                    // Ambil URL sebelum login jika ada
                    const preAuthUrl = sessionStorage.getItem('preAuthUrl');
                    sessionStorage.removeItem('preAuthUrl');

                    // Redirect ke dashboard atau URL sebelumnya
                    setTimeout(() => {
                        navigate(preAuthUrl || '/dashboard', { replace: true });
                    }, 1000);
                } else {
                    throw new Error('Data pengguna tidak ditemukan');
                }
            } catch (error) {
                console.error('Google auth error:', error);
                setStatus('Login gagal. Mengalihkan ke halaman login...');

                // Redirect ke login dengan error message
                setTimeout(() => {
                    navigate('/login?error=google_auth_failed', { replace: true });
                }, 2000);
            }
        };

        verifyGoogleAuth();
    }, [login, navigate]);

    // Helper function untuk membaca cookie
    const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#8A86D5] to-[#7a76c5]">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
                <div className="flex flex-col items-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-24 h-24 object-contain mb-6 animate-pulse"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="animate-spin h-16 w-16 border-4 border-[#8A86D5] border-t-transparent rounded-full mb-6"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                        Login dengan Google
                    </h2>
                    <p className="text-gray-600 text-center">{status}</p>
                </div>
            </div>
        </div>
    );
}