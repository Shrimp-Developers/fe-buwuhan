import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    getListBuwuhan,
    deleteBuwuhan,
    CATEGORY_OPTIONS,
    STATUS_OPTIONS,
    CATEGORY_NAME_TO_LABEL,
    STATUS_TO_LABEL,
} from "../services/buwuhanService.js";
import { alertError, alertSuccess, alertConfirm } from "../alert.js";
import DetailBuwuhan from "../components/DetailBuwuhan.jsx";

export default function BuwuhanList() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [showCategory, setShowCategory] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        currentSize: 10,
        totalPage: 1,
        totalData: 0
    });
    const categoryRef = useRef(null);
    const statusRef = useRef(null);
    const [detailModal, setDetailModal] = useState({ isOpen: false, buwuhanId: null });
    const [refreshKey, setRefreshKey] = useState(0);

    // Helper
    const getCategoryLabel = (val) => CATEGORY_OPTIONS.find(o => o.value === val)?.label || val;
    const getStatusLabel = (val) => STATUS_OPTIONS.find(o => o.value === val)?.label || val;

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = {
                    category: category || undefined,
                    status: status || undefined,
                };

                // Hanya kirim pagination params saat bukan halaman pertama
                if (pagination.currentPage > 1) {
                    params.page = pagination.currentPage;
                    params.size = pagination.currentSize;
                }

                const body = await getListBuwuhan(params);

                // Filter client-side agar bisa cari di nameMan dan nameWoman
                let results = body.data || [];
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    results = results.filter(item =>
                        (item.nameMan && item.nameMan.toLowerCase().includes(query)) ||
                        (item.nameWoman && item.nameWoman.toLowerCase().includes(query))
                    );
                }

                setData(results);

                // Update pagination
                if (body.paging) {
                    setPagination(prev => ({
                        ...prev,
                        totalPage: body.paging.totalPage || 1,
                        totalData: body.paging.totalData
                    }));
                } else {
                    setPagination(prev => ({
                        ...prev,
                        totalData: (body.data || []).length
                    }));
                }
            } catch (err) {
                console.error('Error fetching buwuhan list:', err);
                if (err.body) console.error('API error details:', JSON.stringify(err.body));
                setError(err.message || 'Terjadi kesalahan saat memuat data');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery, category, status, pagination.currentPage, refreshKey]);

    // Tutup dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (categoryRef.current && !categoryRef.current.contains(e.target)) setShowCategory(false);
            if (statusRef.current && !statusRef.current.contains(e.target)) setShowStatus(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle filter reset
    const handleCategoryChange = (opt) => {
        setCategory(opt);
        setShowCategory(false);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleStatusChange = (opt) => {
        setStatus(opt);
        setShowStatus(false);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    // Pagination handlers
    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
        }
    };

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPage) {
            setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
        }
    };

    // Delete handler
    const handleDelete = async (id, nameMan, nameWoman) => {
        const result = await alertConfirm('Hapus Data Buwuhan?', `Apakah Kamu yakin ingin menghapus data ini?`, '/icon-alert-confirm.png');

        if (result.isConfirmed) {
            try {
                await deleteBuwuhan(id);
                await alertSuccess('Data berhasil dihapus', 'Berhasil!', '/icon-alert-delete.png');

                // Refresh data
                setRefreshKey(prev => prev + 1);
                setPagination(prev => ({ ...prev, currentPage: 1 }));
            } catch (error) {
                console.error('Error deleting buwuhan:', error);
                await alertError('Gagal menghapus data', 'Gagal!', '/icon-alert-error.png');
            }
        }
    };

    return (
        <div className="w-full mx-auto p-3 sm:p-4 md:px-5">
            {/* Judul (mobile only) */}
            <h1 className="text-base sm:text-lg font-semibold text-[#000000] mb-3 sm:mb-4 md:hidden">
                Lihat Semua Data
            </h1>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                {/* Dropdown Kategori */}
                <div className="relative" ref={categoryRef}>
                    <button
                        onClick={() => {
                            setShowCategory(!showCategory);
                            setShowStatus(false);
                        }}
                        className="flex items-center gap-1.5 sm:gap-2 bg-black text-white px-3 sm:px-3 py-2 sm:py-2.5 rounded-full text-xs sm:text-xs font-medium"
                    >
                        {category ? getCategoryLabel(category) : 'Kategori'} <ChevronDown size={16} className="w-4 h-4" />
                    </button>

                    {showCategory && (
                        <div className="absolute mt-2 w-36 sm:w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                            <button
                                onClick={() => handleCategoryChange("")}
                                className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-700 first:rounded-t-xl"
                            >
                                Semua Kategori
                            </button>
                            {CATEGORY_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleCategoryChange(opt.value)}
                                    className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-700 last:rounded-b-xl cursor-pointer"
                                >
                                    {opt.label}
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
                            setShowCategory(false);
                        }}
                        className="flex items-center gap-1.5 sm:gap-2 bg-white border-2 border-gray-300 px-3 sm:px-3 py-2 sm:py-2.5 rounded-full text-xs sm:text-xs font-medium shadow-lg cursor-pointer"
                    >
                        {status ? getStatusLabel(status) : 'Status'} <ChevronDown size={16} className="w-4 h-4" />
                    </button>

                    {showStatus && (
                        <div className="absolute mt-2 w-36 sm:w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                            <button
                                onClick={() => handleStatusChange("")}
                                className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-700 first:rounded-t-xl cursor-pointer"
                            >
                                Semua Status
                            </button>
                            {STATUS_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleStatusChange(opt.value)}
                                    className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 text-gray-700 last:rounded-b-xl cursor-pointer"
                                >
                                    {opt.label}
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
                            {/* Desktop/Tablet Table */}
                            <div className="hidden md:block border-2 border-black rounded-3xl overflow-hidden px-4 md:px-6 py-2">
                                <table className="w-full text-xs md:text-sm">
                                    <thead>
                                        <tr>
                                            <th className="p-1.5 md:p-2 text-left font-semibold">Nama Laki-laki</th>
                                            <th className="p-1.5 md:p-2 text-left font-semibold">Nama Perempuan</th>
                                            <th className="p-1.5 md:p-2 text-left font-semibold">Kategori</th>
                                            <th className="p-1.5 md:p-2 text-left font-semibold">Status</th>
                                            <th className="p-1.5 md:p-2 text-center font-semibold">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={row.id || index} className="border-b border-black last:border-b-0">
                                                <td className="p-1.5 md:p-2">{row.nameMan}</td>
                                                <td className="p-1.5 md:p-2">{row.nameWoman}</td>
                                                <td className="p-1.5 md:p-2">{CATEGORY_NAME_TO_LABEL[row.categoryName] || row.categoryName}</td>
                                                <td className="p-1.5 md:p-2">{STATUS_TO_LABEL[row.status] || row.status}</td>
                                                <td className="p-1.5 md:p-2">
                                                    <div className="flex justify-center gap-1.5 md:gap-2">
                                                        <button
                                                            onClick={() => navigate(`/buwuhan/edit/${row.id}`)}
                                                            className="px-2.5 md:px-3 py-1 text-[10px] md:text-xs border-2 border-[#8A86D5] text-[#8A86D5] rounded-full hover:bg-[#ECEBFF] transition font-medium cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setDetailModal({ isOpen: true, buwuhanId: row.id })}
                                                            className="px-3 py-1 text-xs bg-[#8A86D5] text-white rounded-full hover:bg-[#6D67C4] transition font-medium cursor-pointer"
                                                        >
                                                            Detail
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(row.id, row.nameMan, row.nameWoman)}
                                                            className="px-2.5 md:px-3 py-1 text-[10px] md:text-xs bg-[#AB1111] text-white rounded-full hover:bg-red-600 transition font-medium cursor-pointer"
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
                                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-white border-b-2 border-gray-200">
                                    <div className="font-semibold text-[10px] sm:text-xs">Nama<br />Laki-laki</div>
                                    <div className="font-semibold text-[10px] sm:text-xs">Nama<br />Perempuan</div>
                                    <div className="font-semibold text-[10px] sm:text-xs">Status</div>
                                    <div></div>
                                </div>

                                {/* Rows */}
                                {data.map((row, index) => (
                                    <div
                                        key={row.id || index}
                                        className="grid grid-cols-4 gap-1.5 sm:gap-2 p-2.5 sm:p-3 border-b border-gray-200 last:border-b-0 items-center"
                                    >
                                        <div className="text-[10px] sm:text-xs truncate">{row.nameMan}</div>
                                        <div className="text-[10px] sm:text-xs truncate">{row.nameWoman}</div>
                                        <div className="text-[10px] sm:text-xs text-gray-700">{STATUS_TO_LABEL[row.status] || row.status}</div>
                                        <div className="flex justify-end gap-1">
                                            <button
                                                onClick={() => setDetailModal({ isOpen: true, buwuhanId: row.id })}
                                                className="px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] bg-[#8A86D5] text-white rounded-full hover:bg-[#6D67C4] font-medium cursor-pointer"
                                            >
                                                Detail
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row.id, row.nameMan, row.nameWoman)}
                                                className="px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] bg-[#AB1111] text-white rounded-full hover:bg-red-600 font-medium cursor-pointer"
                                            >
                                                Hapus
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
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-700">Baris per halaman</span>
                        <span className="px-2 sm:px-2.5 py-1 border-2 border-gray-300 rounded-full text-[10px] sm:text-xs">
                            {pagination.currentSize}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={handlePrevPage}
                            disabled={pagination.currentPage === 1}
                            className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed px-2 cursor-pointer"
                        >
                            Sebelumnya
                        </button>
                        <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#8A86D5] text-white rounded-lg font-medium text-xs sm:text-sm">
                            {pagination.currentPage}
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={pagination.currentPage >= pagination.totalPage}
                            className="text-[10px] sm:text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed px-2 cursor-pointer"
                        >
                            Selanjutnya
                        </button>
                    </div>

                    <div className="text-[10px] sm:text-xs font-semibold">
                        Total: <span className="text-black">{pagination.totalData}</span>
                    </div>
                </div>
            )}

            {/* Buwuhan Detail Modal */}
            <DetailBuwuhan
                isOpen={detailModal.isOpen}
                onClose={() => setDetailModal({ isOpen: false, buwuhanId: null })}
                buwuhanId={detailModal.buwuhanId}
            />
        </div>
    );
}
