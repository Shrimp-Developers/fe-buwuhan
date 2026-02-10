import { useState, useEffect } from 'react';
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
        <div className="w-full mx-auto px-4 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-base font-bold text-[#000000] mb-4 md:hidden">
                Ringkasan
            </h1>
            <CardDashboard
                className="bg-[#C2BFF8]"
                height="h-auto"
            >
                <div className="text-left lg:text-left m-3">
                    <h2 className="font-bold text-sm lg:text-base mb-1">
                        {userProfile ? (`Halo, ${userProfile.fullName}`) : ('Halo! FullName Not Found')}
                    </h2>
                    <p className="text-xs lg:text-sm text-gray-700 mb-2">
                        Mau edit apa hari ini?
                    </p>
                    <button className="bg-[#000000] text-white text-[10px] px-3 py-1.5 lg:px-4 lg:py-2 rounded-full hover:bg-gray-800 transition">
                        Lihat semua data
                    </button>
                </div>

                <div className="flex items-center justify-center mt-3 lg:mt-0">
                    <img
                        src="/icon-book.png"
                        alt="deskripsi icon-book"
                        className="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] lg:w-[100px] lg:h-[100px] object-contain"
                    />
                </div>
            </CardDashboard>


            {/* Data Section Title */}
            <h4 className="font-bold text-base lg:text-lg m-2 lg:m-3">Data</h4>

            {/* Loading */}
            {loading && (
                <div className="text-center py-10 text-sm text-gray-500">Memuat data dashboard...</div>
            )}

            {/* Error */}
            {error && (
                <div className="text-center py-10 text-sm text-red-600">
                    Terjadi kesalahan: {error}
                </div>
            )}

            {/* Desktop Layout (3 columns) */}
            {!loading && !error && (
                <>
                    <div className="hidden lg:grid lg:grid-cols-3 gap-3">
                        {/* Total Data Card */}
                        <Card className="bg-[#C2BFF8] flex flex-col items-center justify-center px-3 py-6" height="h-auto">
                            <p className="text-sm font-semibold mb-1">Total Data</p>
                            <p className="text-2xl font-bold">{data.total}</p>
                        </Card>

                        {/* Category Cards */}
                        {categories.map((category, index) => (
                            <Card
                                key={index}
                                className={`${category.bgColor}`}
                                height="h-auto"
                            >
                                <p className="text-sm font-semibold text-center mb-3">
                                    Total data<br />{category.title}
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <div className="bg-white rounded-xl p-3 flex-1 text-center border border-black">
                                        <p className="text-xs text-gray-600 mb-1">Lunas</p>
                                        <p className="text-xl font-bold">{category.data.lunas}</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-3 flex-1 text-center border border-black">
                                        <p className="text-xs text-gray-600 mb-1">Belum</p>
                                        <p className="text-xl font-bold">{category.data.belum}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Mobile/Tablet Layout (1 column) */}
                    <div className="lg:hidden space-y-2">
                        {/* Total Data Card */}
                        <Card className="bg-purple-200 flex flex-col items-center justify-center" height="h-48">
                            <p className="text-sm font-bold mb-1">Total data</p>
                            <p className="text-3xl font-bold">{data.total}</p>
                        </Card>

                        {/* Category Cards */}
                        {categories.map((category, index) => (
                            <Card
                                key={index}
                                className={`${category.bgColor}`}
                                height="h-auto"
                            >
                                <p className="text-sm font-bold text-center mb-2">
                                    Total data<br />{category.title}
                                </p>
                                <div className="flex gap-2">
                                    <div className="bg-white rounded-lg px-2 py-6 flex-1 text-center border border-black">
                                        <p className="text-xs text-gray-600 mb-1">Lunas</p>
                                        <p className="text-xl font-bold">{category.data.lunas}</p>
                                    </div>
                                    <div className="bg-white rounded-lg px-2 py-6 flex-1 text-center border border-black">
                                        <p className="text-xs text-gray-600 mb-1">Belum</p>
                                        <p className="text-xl font-bold">{category.data.belum}</p>
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
