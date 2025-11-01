import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function GoogleCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userStr = urlParams.get('user');

        // cek token jika ada ke dashboard / jika tidak ke login
        if (token && userStr) {
            try {
                const userData = JSON.parse(decodeURIComponent(userStr));
                login(userData, token);
                navigate('/dashboard', { replace: true });
            } catch (error) {
                console.error('Parse error:', error);
                navigate('/login', { replace: true });
            }
        } else {
            navigate('/login', { replace: true });
        }
    }, [login, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#8A86D5]">
            <div className="text-center text-white">
                <h2 className="text-2xl font-bold">Memproses...</h2>
            </div>
        </div>
    );
}