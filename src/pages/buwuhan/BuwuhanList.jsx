import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function BuwuhanList() {
    const [kategori, setKategori] = useState("Kategori");
    const [status, setStatus] = useState("Status");
    const [showKategori, setShowKategori] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const kategoriRef = useRef(null);
    const statusRef = useRef(null);

    // Data dummy
    const dummyData = [
        { namaLaki: "Andi Saputra", namaPerempuan: "Rina Amelia", kategori: "Uang", status: "Lunas" },
        { namaLaki: "Budi Santoso", namaPerempuan: "Sari Lestari", kategori: "Barang", status: "Belum Lunas" },
        { namaLaki: "Rizky Pratama", namaPerempuan: "Dewi Kartika", kategori: "Beras", status: "Lunas" },
    ];

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (kategoriRef.current && !kategoriRef.current.contains(e.target)) setShowKategori(false);
            if (statusRef.current && !statusRef.current.contains(e.target)) setShowStatus(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Simulasi ambil data
    useEffect(() => {
        setTimeout(() => {
            try {
                setData(dummyData);
            } catch (err) {
                setError("Gagal memuat data");
            } finally {
                setLoading(false);
            }
        }, 800);
    }, []);

    // Opsi dropdown
    const kategoriOptions = ["Uang", "Beras", "Barang", "Lainnya"];
    const statusOptions = ["Lunas", "Belum Lunas"];

    return (
        <div className="w-full mx-auto p-6 sm:p-6 relative">
            {/* Judul (mobile only) */}
            <h1 className="text-lg font-semibold text-[#000000] mb-6 md:hidden">
                Lihat Semua Data
            </h1>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 mb-6 relative">
                {/* Dropdown Kategori */}
                <div className="relative" ref={kategoriRef}>
                    <button
                        onClick={() => {
                            setShowKategori(!showKategori);
                            setShowStatus(false);
                        }}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full shadow-lg"
                    >
                        {kategori} <ChevronDown size={16} />
                    </button>

                    {showKategori && (
                        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                            {kategoriOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setKategori(opt);
                                        setShowKategori(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dropdown Status */}
                <div className="relative" ref={statusRef}>
                    <button
                        onClick={() => {
                            setShowStatus(!showStatus);
                            setShowKategori(false);
                        }}
                        className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-full shadow-lg"
                    >
                        {status} <ChevronDown size={16} />
                    </button>

                    {showStatus && (
                        <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                            {statusOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setStatus(opt);
                                        setShowStatus(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-10 text-gray-500">Memuat data...</div>
            )}

            {/* Error */}
            {error && (
                <div className="text-center py-10 text-red-600">
                    Terjadi kesalahan: {error}
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block border border-[#000000] rounded-3xl overflow-hidden">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-[#F9F9FF] text-left">
                            <tr>
                                <th className="p-4 border-b">Nama Laki - laki</th>
                                <th className="p-4 border-b">Nama Perempuan</th>
                                <th className="p-4 border-b">Kategori</th>
                                <th className="p-4 border-b">Status</th>
                                <th className="p-4 border-b text-center">Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{row.namaLaki}</td>
                                    <td className="p-4">{row.namaPerempuan}</td>
                                    <td className="p-4">{row.kategori}</td>
                                    <td className="p-4 text-gray-700">{row.status}</td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button className="px-5 py-2 text-xs border border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] transition">
                                            Edit
                                        </button>
                                        <button className="px-3 py-2 text-xs border border-[#8A86D5] bg-[#8A86D5] text-white rounded-full hover:bg-[#6D67C4] transition">
                                            Detail
                                        </button>
                                        <button className="px-3 py-2 text-xs border border-[#AB1111] bg-[#AB1111] text-white rounded-full hover:bg-red-600 transition">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card */}
                    <div className="block md:hidden space-y-3">
                        {data.map((row, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-2xl p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {row.namaLaki}
                                    </p>
                                    <p className="text-sm text-gray-600">{row.namaPerempuan}</p>
                                    <p className="text-sm text-gray-700 mt-1">{row.status}</p>
                                </div>
                                <button className="px-4 py-2 text-xs border border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF]">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
