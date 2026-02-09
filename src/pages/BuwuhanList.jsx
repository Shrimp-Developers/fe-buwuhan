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
    ];

    // Simulasi ambil data
    useEffect(() => {
        setTimeout(() => {
            try {
                setData(dummyData);
            } catch{
                setError("Gagal memuat data");
            } finally {
                setLoading(false);
            }
        }, 800);
    }, []);

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (kategoriRef.current && !kategoriRef.current.contains(e.target)) setShowKategori(false);
            if (statusRef.current && !statusRef.current.contains(e.target)) setShowStatus(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Opsi dropdown
    const kategoriOptions = ["Uang", "Beras", "Barang", "Lainnya"];
    const statusOptions = ["Lunas", "Belum Lunas"];

    return (
        <div className="w-full mx-auto p-4 md:px-5">
            {/* Judul (mobile only) */}
            <h1 className="text-base font-semibold text-[#000000] mb-4 md:hidden">
                Lihat Semua Data
            </h1>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 mb-4">
                {/* Dropdown Kategori */}
                <div className="relative" ref={kategoriRef}>
                    <button
                        onClick={() => {
                            setShowKategori(!showKategori);
                            setShowStatus(false);
                        }}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-medium"
                    >
                        {kategori} <ChevronDown size={16} />
                    </button>

                    {showKategori && (
                        <div className="absolute mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                            {kategoriOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setKategori(opt);
                                        setShowKategori(false);
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700 first:rounded-t-xl last:rounded-b-xl"
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
                        className="flex items-center gap-2 bg-white border-2 border-gray-300 px-4 py-2 rounded-full text-xs font-medium shadow-lg"
                    >
                        {status} <ChevronDown size={16} />
                    </button>

                    {showStatus && (
                        <div className="absolute mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                            {statusOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setStatus(opt);
                                        setShowStatus(false);
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700 first:rounded-t-xl last:rounded-b-xl"
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
                <div className="text-center py-10 text-xs text-gray-500">Memuat data...</div>
            )}

            {/* Error */}
            {error && (
                <div className="text-center py-10 text-xs text-red-600">
                    Terjadi kesalahan: {error}
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block border-2 border-black rounded-3xl overflow-hidden px-6 py-2">
                        <table className="w-full text-xs">
                            <thead>
                            <tr>
                                <th className="p-1.5 text-left font-semibold">Nama Laki-laki</th>
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
                                        <div className="flex justify-center gap-2">
                                            <button className="px-3 py-1 text-xs border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] transition font-medium">
                                                Edit
                                            </button>
                                            <button className="px-3 py-1 text-xs bg-[#8A86D5] text-white rounded-full hover:bg-[#6D67C4] transition font-medium">
                                                Detail
                                            </button>
                                            <button className="px-3 py-1 text-xs bg-[#AB1111] text-white rounded-full hover:bg-red-600 transition font-medium">
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
                            <div className="font-semibold text-xs">Nama<br/>Laki-laki</div>
                            <div className="font-semibold text-xs">Nama<br/>Perempuan</div>
                            <div className="font-semibold text-xs">Status</div>
                            <div></div>
                        </div>

                        {/* Rows */}
                        {data.map((row, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-2 p-3 border-b border-gray-200 last:border-b-0 items-center"
                            >
                                <div className="text-xs">{row.namaLaki}</div>
                                <div className="text-xs">{row.namaPerempuan}</div>
                                <div className="text-xs text-gray-700">{row.status}</div>
                                <div className="flex justify-end">
                                    <button className="px-3 py-1 text-[10px] border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] font-medium">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Pagination */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-700">Baris per halaman</span>
                    <button className="px-2.5 py-1 border-2 border-gray-300 rounded-full text-xs flex items-center gap-1">
                        11 <ChevronDown size={14} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">Sebelumnya</span>
                    <button className="w-7 h-7 flex items-center justify-center bg-[#8A86D5] text-white rounded-lg font-medium text-xs">
                        1
                    </button>
                    <span className="text-xs text-gray-500">Selanjutnya</span>
                </div>

                <div className="text-xs font-semibold">
                    Total: <span className="text-black">139</span>
                </div>
            </div>
        </div>
    );
}