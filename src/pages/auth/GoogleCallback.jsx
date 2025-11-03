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

                // Tunggu sebentar untuk cookie di-set
                await new Promise(resolve => setTimeout(resolve, 500));

                // Ambil user data menggunakan getCurrentUser
                const userData = await getCurrentUser();

                if (userData) {
                    setStatus('Login berhasil! Mengalihkan...');

                    // Generate dummy token untuk localStorage
                    const dummyToken = `google_auth_${Date.now()}`;

                    // Simpan ke context & localStorage
                    login(userData, dummyToken);

                    // Redirect ke dashboard
                    setTimeout(() => {
                        navigate('/dashboard', { replace: true });
                    }, 1000);
                } else {
                    throw new Error('User data tidak ditemukan');
                }
            } catch (error) {
                console.error('Google auth error:', error);
                setStatus('Login gagal. Mengalihkan ke halaman login...');

                setTimeout(() => {
                    navigate('/login?error=auth_failed', { replace: true });
                }, 2000);
            }
        };

        verifyGoogleAuth();
    }, [login, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#8A86D5]">
            <img
                src="/logo.png"
                alt="Logo"
                className="w-32 h-32 object-contain mb-6 animate-pulse"
            />
            <h2 className="text-3xl font-bold text-white mb-2">
                Login dengan Google
            </h2>
            <p className="text-white text-lg mb-6">{status}</p>
            <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
        </div>
    );
}