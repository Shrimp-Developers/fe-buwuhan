import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import CardDashboard from '../components/CardDashboard.jsx';
import { getUserProfile } from '../services/authService.js';
import { getDashboardBuwuhan } from '../services/buwuhanService.js';

export default function BuwuhanDashboard() {
    const [data, setData] = useState({
        total: 0,
        barang: { lunas: 0, belum: 0 },
        beras: { lunas: 0, belum: 0 },
        uang: { lunas: 0, belum: 0 },
        lainnya: { lunas: 0, belum: 0 }
    });
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                const body = await response.json();

                if (response.ok && body.data) {
                    setUserProfile(body.data);
                } else {
                    console.error('Failed to fetch profile:', body.message);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getDashboardBuwuhan();
                const body = await response.json();

                if (response.ok && body.data) {
                    const apiData = body.data;

                    setData({
                        total: (apiData.totalBata?.paid || 0) + (apiData.totalBata?.unpaid || 0) +
                            (apiData.man?.paid || 0) + (apiData.man?.unpaid || 0) +
                            (apiData.woman?.paid || 0) + (apiData.woman?.unpaid || 0) +
                            (apiData.total?.paid || 0) + (apiData.total?.unpaid || 0),
                        barang: {
                            lunas: apiData.totalBata?.paid || 0,
                            belum: apiData.totalBata?.unpaid || 0
                        },
                        beras: {
                            lunas: apiData.man?.paid || 0,
                            belum: apiData.man?.unpaid || 0
                        },
                        uang: {
                            lunas: apiData.woman?.paid || 0,
                            belum: apiData.woman?.unpaid || 0
                        },
                        lainnya: {
                            lunas: apiData.total?.paid || 0,
                            belum: apiData.total?.unpaid || 0
                        }
                    });
                } else {
                    setError(body.message || 'Gagal memuat data dashboard');
                }
            } catch (err) {
                console.error('Error fetching dashboard:', err);
                setError('Terjadi kesalahan saat memuat data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const categories = [
        { title: '(Barang)', data: data.barang, bgColor: 'bg-[#F9CD19]' },
        { title: '(Beras)', data: data.beras, bgColor: 'bg-[#FF8BE4]' },
        { title: '(Uang)', data: data.uang, bgColor: 'bg-[#B0CE88]' },
        { title: '(Lainnya)', data: data.lainnya, bgColor: 'bg-[#FFB167]' }
    ];

    return (
        <div className="w-full mx-auto px-2 sm:px-4 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-base sm:text-lg font-bold text-[#000000] mb-3 sm:mb-4 md:hidden">
                Ringkasan
            </h1>
            <CardDashboard
                className="bg-[#C2BFF8]"
                height="h-auto"
            >
                <div className="text-left m-2.5 sm:mx-4 sm:my-6">
                    <h2 className="font-bold text-sm sm:text-base lg:text-base mb-1">
                        {userProfile ? (`Halo, ${userProfile.fullName}`) : ('Halo! FullName Not Found')}
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-sm text-gray-800 mb-3">
                        Mau edit apa hari ini?
                    </p>
                    <Link to="/buwuhan" className="bg-[#000000] text-white text-[10px] sm:text-xs px-3 py-3 sm:px-4 sm:py-3 rounded-full hover:bg-gray-800 transition">
                        Lihat semua data
                    </Link>
                </div>

                <div className="flex items-center justify-center mt-2 sm:mt-3 lg:mt-0">
                    <img
                        src="/icon-book.png"
                        alt="deskripsi icon-book"
                        className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] object-contain"
                    />
                </div>
            </CardDashboard>


            {/* Data Section Title */}
            <h4 className="font-bold text-base sm:text-lg m-2 sm:m-2.5 lg:m-3">Data</h4>

            {loading && (
                <div className="text-center py-10 text-sm text-gray-500">Memuat data dashboard...</div>
            )}

            {error && (
                <div className="text-center py-10 text-sm text-red-600">
                    Terjadi kesalahan: {error}
                </div>
            )}

            {/* Desktop/Tablet Layout - 2 cols on tablet, 3 cols on desktop */}
            {!loading && !error && (
                <>
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
                        {/* Total Data Card */}
                        <Card className="bg-[#C2BFF8] flex flex-col items-center justify-center px-3 py-5 md:py-6" height="h-auto">
                            <p className="text-sm md:text-base font-semibold mb-1">Total Data</p>
                            <p className="text-2xl md:text-3xl font-bold">{data.total}</p>
                        </Card>

                        {/* Category Cards */}
                        {categories.map((category, index) => (
                            <Card
                                key={index}
                                className={`${category.bgColor}`}
                                height="h-auto"
                            >
                                <p className="text-sm md:text-base font-semibold text-center mb-2.5 md:mb-3">
                                    Total data<br />{category.title}
                                </p>
                                <div className="flex gap-2.5 md:gap-3 justify-center">
                                    <div className="bg-white rounded-xl p-2.5 md:p-3 flex-1 text-center border border-black">
                                        <p className="text-xs md:text-sm text-gray-600 mb-1">Lunas</p>
                                        <p className="text-lg md:text-xl font-bold">{category.data.lunas}</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-2.5 md:p-3 flex-1 text-center border border-black">
                                        <p className="text-xs md:text-sm text-gray-600 mb-1">Belum</p>
                                        <p className="text-lg md:text-xl font-bold">{category.data.belum}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Mobile Layout (1 column) */}
                    <div className="md:hidden space-y-2">
                        {/* Total Data Card */}
                        <Card className="bg-[#C2BFF8] flex flex-col items-center justify-center" height="h-40 sm:h-48">
                            <p className="text-sm sm:text-base font-bold mb-1">Total data</p>
                            <p className="text-2xl sm:text-3xl font-bold">{data.total}</p>
                        </Card>

                        {/* Category Cards */}
                        {categories.map((category, index) => (
                            <Card
                                key={index}
                                className={`${category.bgColor}`}
                                height="h-auto"
                            >
                                <p className="text-sm sm:text-base font-bold text-center mb-2">
                                    Total data<br />{category.title}
                                </p>
                                <div className="flex gap-2 sm:gap-2.5">
                                    <div className="bg-white rounded-lg px-2 sm:px-3 py-5 sm:py-6 flex-1 text-center border border-black">
                                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Lunas</p>
                                        <p className="text-lg sm:text-xl font-bold">{category.data.lunas}</p>
                                    </div>
                                    <div className="bg-white rounded-lg px-2 sm:px-3 py-5 sm:py-6 flex-1 text-center border border-black">
                                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Belum</p>
                                        <p className="text-lg sm:text-xl font-bold">{category.data.belum}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
