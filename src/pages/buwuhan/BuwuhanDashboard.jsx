import { useState } from 'react';
import Card from '../../components/Card.jsx';
import CardProfile from '../../components/CardProfile.jsx';

export default function BuwuhanDashboard() {
    const [data] = useState({
        total: 139,
        barang: { lunas: 10, belum: 70 },
        beras: { lunas: 10, belum: 70 },
        uang: { lunas: 10, belum: 70 },
        lainnya: { lunas: 10, belum: 70 }
    });

    const categories = [
        { title: '(Barang)', data: data.barang, bgColor: 'bg-[#F9CD19]' },
        { title: '(Beras)', data: data.beras, bgColor: 'bg-[#FF8BE4]' },
        { title: '(Uang)', data: data.uang, bgColor: 'bg-[#B0CE88]' },
        { title: '(Lainnya)', data: data.lainnya, bgColor: 'bg-[#FFB167]' }
    ];

    return (
            <div className="w-full mx-auto px-6 md:px-5">
                {/* Judul untuk mobile */}
                <h1 className="text-lg font-bold text-[#000000] mb-6 md:hidden" >
                    Ringkasan
                </h1>
                {/*  Card Profile */}
                <Card className="bg-[#C2BFF8] mb-4 lg:mb-6 flex flex-col-reverse lg:flex-row items-center justify-between p-5 lg:p-10" height="h-auto">
                    <div className="text-center lg:text-left mt-4 lg:mt-0">
                        <h2 className="font-bold text-base lg:text-lg mb-1">Halo, Haris Gunawan Romadhon</h2>
                        <p className="text-sm lg:text-sm text-gray-700 mb-2 lg:mb-3">Mau edit apa hari ini?</p>
                        <button className="bg-gray-900 text-white text-xs px-3 py-3 lg:px-4 lg:py-3 rounded-full hover:bg-gray-800 transition">
                            Lihat semua data
                        </button>
                    </div>

                    <div className="flex items-center justify-center mt-4 lg:mt-0">
                        <img
                            src="/icon-book.png"
                            alt="deskripsi icon-book"
                            className="w-[120px] h-[120px] sm:w-[120px] sm:h-[120px] lg:w-[120px] lg:h-[120px] object-contain"
                        />
                    </div>
                </Card>

                {/* Data Section Title */}
                <h4 className="font-bold text-base lg:text-lg mb-3 lg:mb-4">Data</h4>

                {/* Desktop Layout (3 columns) */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                    {/* Total Data Card */}
                    <Card className="bg-[#C2BFF8] flex flex-col items-center justify-center" height="h-auto">
                        <p className="text-lg font-semibold mb-2">Total Data</p>
                        <p className="text-5xl font-bold">{data.total}</p>
                    </Card>

                    {/* Category Cards */}
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            className={`${category.bgColor}`}
                            height="h-auto"
                        >
                            <p className="text-lg font-semibold text-center mb-4">
                                Total data<br />{category.title}
                            </p>
                            <div className="flex gap-4 justify-center">
                                <div className="bg-white rounded-xl p-4 flex-1 text-center border-2 border-black">
                                    <p className="text-xs text-gray-600 mb-2">Lunas</p>
                                    <p className="text-3xl font-bold">{category.data.lunas}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 flex-1 text-center border-2 border-black">
                                    <p className="text-xs text-gray-600 mb-2">Belum</p>
                                    <p className="text-3xl font-bold">{category.data.belum}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Mobile/Tablet Layout (1 column) */}
                <div className="lg:hidden space-y-3">
                    {/* Total Data Card */}
                    <Card className="bg-purple-200 flex flex-col items-center justify-center" height="h-auto">
                        <p className="text-xs font-medium mb-2">Total data</p>
                        <p className="text-4xl font-bold">{data.total}</p>
                    </Card>

                    {/* Category Cards */}
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            className={`${category.bgColor}`}
                            height="h-auto"
                        >
                            <p className="text-xs font-bold text-center mb-3">
                                Total data<br />{category.title}
                            </p>
                            <div className="flex gap-2">
                                <div className="bg-white rounded-lg p-3 flex-1 text-center border-1 border-black">
                                    <p className="text-sm text-gray-600 mb-1">Lunas</p>
                                    <p className="text-2xl font-bold">{category.data.lunas}</p>
                                </div>
                                <div className="bg-white rounded-lg p-3 flex-1 text-center border-1 border-black">
                                    <p className="text-sm text-gray-600 mb-1">Belum</p>
                                    <p className="text-2xl font-bold">{category.data.belum}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
    );
}