import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getListBuwuhan, deleteBuwuhan } from "../services/buwuhanService.js";
import { alertError, alertSuccess, alertConfirm } from "../alert.js";

export default function BuwuhanList() {
    const navigate = useNavigate();
    const [kategori, setKategori] = useState("Kategori");
    const [status, setStatus] = useState("Status");
    const [showKategori, setShowKategori] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        limit: 11,
        totalPages: 1,
        totalItems: 0
    });
    const kategoriRef = useRef(null);
    const statusRef = useRef(null);

    // Fetch data dari API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Map kategori untuk API
                const categoryParam = kategori !== "Kategori" ? kategori : '';

                // Map status untuk API
                let statusParam = '';
                if (status === "Lunas") statusParam = 'true';
                else if (status === "Belum Lunas") statusParam = 'false';

                const response = await getListBuwuhan({
                    category: categoryParam,
                    status: statusParam,
                    page: pagination.currentPage,
                    limit: pagination.limit
                });

                const body = await response.json();

                if (response.ok && body.data) {
                    // Map categoryId ke nama kategori
                    const categoryMap = {
                        1: 'Barang',
                        2: 'Beras',
                        3: 'Uang',
                        4: 'Lainnya'
                    };

                    const mappedData = body.data.map(item => ({
                        ...item,
                        kategori: categoryMap[item.categoryId] || 'Lainnya',
                        statusText: item.status ? 'Lunas' : 'Belum Lunas'
                    }));

                    setData(mappedData);

                    // Update pagination
                    if (body.pagination) {
                        setPagination(prev => ({
                            ...prev,
                            totalPages: body.pagination.totalPages || 1,
                            totalItems: body.pagination.totalItems || mappedData.length
                        }));
                    } else {
                        setPagination(prev => ({
                            ...prev,
                            totalItems: mappedData.length
                        }));
                    }
                } else {
                    setError(body.message || 'Gagal memuat data');
                    setData([]);
                }
            } catch (err) {
                console.error('Error fetching buwuhan list:', err);
                setError('Terjadi kesalahan saat memuat data');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [kategori, status, pagination.currentPage, pagination.limit]);

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
    const kategoriOptions = ["Barang", "Beras", "Uang", "Lainnya"];
    const statusOptions = ["Lunas", "Belum Lunas"];

    // Handle filter reset
    const handleKategoriChange = (opt) => {
        setKategori(opt);
        setShowKategori(false);
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to page 1
    };

    const handleStatusChange = (opt) => {
        setStatus(opt);
        setShowStatus(false);
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to page 1
    };

    // Pagination handlers
    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
        }
    };

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
        }
    };

    // Delete handler dengan konfirmasi
    const handleDelete = async (id, nameMan, nameWoman) => {
        const result = await alertConfirm('Hapus Data Buwuhan?', `Apakah Kamu yakin ingin menghapus data:<br/><strong>${nameMan} & ${nameWoman}</strong>?`, '/icon-alert-confirm.png');

        if (result.isConfirmed) {
            try {
                const response = await deleteBuwuhan(id);
                if (response.ok) {
                    await alertSuccess('Data berhasil dihapus', 'Berhasil!', '/icon-alert-delete.png');

                    // Refresh data by resetting to page 1
                    setPagination(prev => ({ ...prev, currentPage: 1 }));
                } else {
                    await alertError('Gagal menghapus data', 'Gagal!', '/icon-alert-error.png');
                }
            } catch (error) {
                console.error('Error deleting buwuhan:', error);
                await alertError('Terjadi kesalahan saat menghapus data', 'Error', '/icon-alert-error.png');
            }
        }
    };

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
                            <button
                                onClick={() => handleKategoriChange("Kategori")}
                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700 first:rounded-t-xl"
                            >
                                Semua Kategori
                            </button>
                            {kategoriOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleKategoriChange(opt)}
                                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700 last:rounded-b-xl"
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
                            <button
                                onClick={() => handleStatusChange("Status")}
                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700 first:rounded-t-xl"
                            >
                                Semua Status
                            </button>
                            {statusOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleStatusChange(opt)}
                                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700 last:rounded-b-xl"
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
                    {data.length === 0 ? (
                        <div className="text-center py-10 text-xs text-gray-500">
                            Tidak ada data yang ditemukan
                        </div>
                    ) : (
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
                                            <tr key={row.id || index} className="border-b border-black last:border-b-0">
                                                <td className="p-1.5">{row.nameMan}</td>
                                                <td className="p-1.5">{row.nameWoman}</td>
                                                <td className="p-1.5">{row.kategori}</td>
                                                <td className="p-1.5">{row.statusText}</td>
                                                <td className="p-1.5">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => navigate(`/buwuhan/edit/${row.id}`)}
                                                            className="px-3 py-1 text-xs border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] transition font-medium"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button className="px-3 py-1 text-xs bg-[#8A86D5] text-white rounded-full hover:bg-[#6D67C4] transition font-medium">
                                                            Detail
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(row.id, row.nameMan, row.nameWoman)}
                                                            className="px-3 py-1 text-xs bg-[#AB1111] text-white rounded-full hover:bg-red-600 transition font-medium"
                                                        >
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
                                    <div className="font-semibold text-xs">Nama<br />Laki-laki</div>
                                    <div className="font-semibold text-xs">Nama<br />Perempuan</div>
                                    <div className="font-semibold text-xs">Status</div>
                                    <div></div>
                                </div>

                                {/* Rows */}
                                {data.map((row, index) => (
                                    <div
                                        key={row.id || index}
                                        className="grid grid-cols-4 gap-2 p-3 border-b border-gray-200 last:border-b-0 items-center"
                                    >
                                        <div className="text-xs">{row.nameMan}</div>
                                        <div className="text-xs">{row.nameWoman}</div>
                                        <div className="text-xs text-gray-700">{row.statusText}</div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => navigate(`/buwuhan/edit/${row.id}`)}
                                                className="px-3 py-1 text-[10px] border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] font-medium"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}

            {/* Pagination */}
            {!loading && !error && data.length > 0 && (
                <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-700">Baris per halaman</span>
                        <span className="px-2.5 py-1 border-2 border-gray-300 rounded-full text-xs">
                            {pagination.limit}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrevPage}
                            disabled={pagination.currentPage === 1}
                            className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sebelumnya
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-[#8A86D5] text-white rounded-lg font-medium text-xs">
                            {pagination.currentPage}
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Selanjutnya
                        </button>
                    </div>

                    <div className="text-xs font-semibold">
                        Total: <span className="text-black">{pagination.totalItems}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
