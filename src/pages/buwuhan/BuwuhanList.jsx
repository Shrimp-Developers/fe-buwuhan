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
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
        { namaLaki: "Rachman", namaPerempuan: "Yasmine", kategori: "Uang", status: "Belum lunas" },
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
        <div className="w-full mx-auto p-4 md:p-6">
            {/* Judul (mobile only) */}
            <h1 className="text-lg font-semibold text-[#000000] mb-6 md:hidden">
                Lihat Semua Data
            </h1>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 mb-6">
                {/* Dropdown Kategori */}
                <div className="relative" ref={kategoriRef}>
                    <button
                        onClick={() => {
                            setShowKategori(!showKategori);
                            setShowStatus(false);
                        }}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium"
                    >
                        {kategori} <ChevronDown size={18} />
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
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 first:rounded-t-xl last:rounded-b-xl shadow-lg"
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
                        className="flex items-center gap-2 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg"
                    >
                        {status} <ChevronDown size={18} />
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
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 first:rounded-t-xl last:rounded-b-xl"
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
                    <div className="hidden md:block border-2 border-black rounded-3xl overflow-hidden px-8 py-3">
                        <table className="w-full text-sm">
                            <thead className="">
                            <tr className="">
                                <th className="p-1.5 text-left font-semibold">Nama Laki - laki</th>
                                <th className="p-1.5 text-left font-semibold">Nama Perempuan</th>
                                <th className="p-1.5 text-left font-semibold">Kategori</th>
                                <th className="p-1.5 text-left font-semibold">Status</th>
                                <th className="p-1.5 text-center font-semibold">Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-b border-black last:border-b-0">
                                    <td className="p-1.5">{row.namaLaki}</td>
                                    <td className="p-1.5">{row.namaPerempuan}</td>
                                    <td className="p-1.5">{row.kategori}</td>
                                    <td className="p-1.5">{row.status}</td>
                                    <td className="p-1.5">
                                        <div className="flex justify-center gap-3">
                                            <button className="px-4 py-1 text-sm border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] transition font-medium">
                                                Edit
                                            </button>
                                            <button className="px-4 py-1 text-sm bg-[#8A86D5] text-white rounded-full hover:bg-[#6D67C4] transition font-medium">
                                                Detail
                                            </button>
                                            <button className="px-4 py-1 text-sm bg-[#AB1111] text-white rounded-full hover:bg-red-600 transition font-medium">
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card */}
                    <div className="block md:hidden border-2 border-black rounded-3xl overflow-hidden bg-white">
                        {/* Header */}
                        <div className="grid grid-cols-4 gap-2 p-2 bg-white border-b-2 border-gray-200">
                            <div className="font-semibold text-sm">Nama<br/>Laki-laki</div>
                            <div className="font-semibold text-sm">Nama<br/>Perempuan</div>
                            <div className="font-semibold text-sm">Status</div>
                            <div></div>
                        </div>

                        {/* Rows */}
                        {data.map((row, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-2 p-4 border-b border-gray-200 last:border-b-0 items-center"
                            >
                                <div className="text-sm">{row.namaLaki}</div>
                                <div className="text-sm">{row.namaPerempuan}</div>
                                <div className="text-sm text-gray-700">{row.status}</div>
                                <div className="flex justify-end">
                                    <button className="px-4 py-1.5 text-xs border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] font-medium">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Pagination */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Baris per halaman</span>
                    <button className="px-3 py-1 border-2 border-gray-300 rounded-full text-sm flex items-center gap-1">
                        11 <ChevronDown size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Sebelumnya</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-[#8A86D5] text-white rounded-lg font-medium">
                        1
                    </button>
                    <span className="text-sm text-gray-500">Selanjutnya</span>
                </div>

                <div className="text-sm font-semibold">
                    Total: <span className="text-black">139</span>
                </div>
            </div>
        </div>
    );
}