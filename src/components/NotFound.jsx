import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F6FA] px-4">
            <h1 className="text-7xl sm:text-9xl font-bold text-[#8A86D5]">404</h1>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2 text-center max-w-md">
                Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
            </p>
            <button
                onClick={() => navigate('/login')}
                className="mt-6 px-6 py-2.5 bg-[#8A86D5] text-white text-sm font-medium rounded-full hover:bg-[#6D67C4] transition cursor-pointer"
            >
                Kembali
            </button>
        </div>
    );
}