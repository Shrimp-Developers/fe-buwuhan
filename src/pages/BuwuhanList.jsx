import { useState, useRef } from "react";
import { ChevronDown, Search, MoreVertical, Download } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useBuwuhanList from "../hooks/buwuhan/useBuwuhanList";
import useDropdownOutside from "../hooks/buwuhan/useDropdownOutside";
import DetailBuwuhan from "../components/DetailBuwuhan";
import useBuwuhanExportData from "../hooks/buwuhan/useBuwuhanExportData";
import {
  getCategoryLabelByName,
  getStatusLabel,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/buwuhanOptions";

export default function BuwuhanList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search");
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  const [searchValue, setSearchValue] = useState(searchQuery);
  const [showCategory, setShowCategory] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    buwuhanId: null,
  });

  const categoryRef = useRef(null);
  const statusRef = useRef(null);

  useDropdownOutside(categoryRef, setShowCategory);
  useDropdownOutside(statusRef, setShowStatus);

  const { handleExportDataBuwuhan, isExporting } = useBuwuhanExportData();

  const {
    data,
    loading,
    error,
    pagination,
    handlePrevPage,
    handleNextPage,
    handleChangeSize,
    handleChangePage,
    handleDeleteData,
  } = useBuwuhanList({ searchQuery, category, status });

  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    navigate(`/dashboard/list?${params.toString()}`);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      updateURL({ search: searchValue, page: null });
    }
  };

  const handleCategoryChange = (val) => {
    updateURL({ category: val, page: null });
    setShowCategory(false);
  };

  const handleChangeStatus = (val) => {
    updateURL({ status: val, page: null });
    setShowStatus(false);
  };

  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-5">
      <h1 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 md:hidden dark:text-[#ffffff]">
        Lihat Semua Data
      </h1>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {/* Category */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => {
                setShowCategory(!showCategory);
                setShowStatus(false);
              }}
              className="flex items-center gap-2 bg-[#000000] border dark:border-white text-white px-3 py-2 rounded-full text-xs cursor-pointer"
            >
              {category ? getCategoryLabelByName(category) : "Kategori"}
              <ChevronDown size={16} />
            </button>

            {showCategory && (
              <div className="absolute mt-2 w-40 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg z-20">
                <button
                  onClick={() => handleCategoryChange("")}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                >
                  Semua Kategori
                </button>
                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleCategoryChange(opt.value)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => {
                setShowStatus(!showStatus);
                setShowCategory(false);
              }}
              className="flex items-center gap-2 border dark:border-white bg-[#ffffff] dark:bg-[#000000] dark:text-white px-3 py-2 rounded-full text-xs cursor-pointer"
            >
              {status ? getStatusLabel(status) : "Status"}
              <ChevronDown size={16} />
            </button>

            {showStatus && (
              <div className="absolute mt-2 w-40 bg-white dark:text-white dark:bg-[#1a1a1a] rounded-xl shadow-lg z-20">
                <button
                  onClick={() => handleChangeStatus("")}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                >
                  Semua Status
                </button>
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleChangeStatus(opt.value)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Data */}
          <button
            className="flex items-center gap-2 border px-3 py-2 rounded-full text-xs bg-[#628141] text-[#FFFFFF] hover:bg-[#40513B] transition cursor-pointer"
            disabled={isExporting}
            onClick={handleExportDataBuwuhan}
          >
            <Download size={16} />
            {isExporting ? "Mengexport Data..." : "Export Excel"}
          </button>
        </div>

        {/* Search */}
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Cari . . ."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className="pl-5 pr-10 py-2 w-full h-[40px] bg-white dark:bg-[#1a1a1a] rounded-full text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none shadow border border-gray-200 dark:border-gray-700"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      {!loading && !error && (
        <>
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <img
                src="/icon-not-data.png"
                alt="tidak ada data"
                className="w-40"
              />
              <h1 className="text-lg font-bold text-[#7D79C0]">
                Belum ada data disini
              </h1>
              <button
                onClick={() => navigate("/dashboard/create")}
                className="px-3 py-2 bg-[#8A86D5] w-[200px] font-semibold text-white text-sm rounded-full hover:bg-[#7a76c5] shadow-xl transition cursor-pointer"
              >
                Tambah Data
              </button>
            </div>
          ) : (
            <div className="border rounded-2xl bg-[#FFFFFF] dark:bg-[#1a1a1a] dark:border-gray-700">
              <div className="py-3 px-5">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-left dark:text-white">
                        Nama Laki-laki
                      </th>
                      <th className="p-2 text-left dark:text-white">
                        Nama Perempuan
                      </th>
                      <th className="p-2 text-left dark:text-white">
                        Kategori
                      </th>
                      <th className="p-2 text-left dark:text-white">Status</th>
                      <th className="p-2 text-left dark:text-white">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t dark:border-gray-700"
                      >
                        <td className="p-2 dark:text-white">{row.nameMan}</td>
                        <td className="p-2 dark:text-white">{row.nameWoman}</td>
                        <td className="p-2 dark:text-white">
                          {getCategoryLabelByName(row.categoryName)}
                        </td>
                        <td className="p-2 dark:text-white">
                          {getStatusLabel(row.status)}
                        </td>
                        <td className="p-2 dark:text-white text-center relative">
                          {/* Desktop */}
                          <div className="hidden sm:flex justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(`/dashboard/edit/${row.id}`)
                              }
                              className="px-3 py-1 border dark:border-gray-500 dark:text-white rounded-full text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setDetailModal({
                                  isOpen: true,
                                  buwuhanId: row.id,
                                })
                              }
                              className="px-3 py-1 bg-[#8A86D5] text-white rounded-full text-xs cursor-pointer"
                            >
                              Detail
                            </button>
                            <button
                              onClick={() => handleDeleteData(row.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded-full text-xs cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>

                          {/* Mobile */}
                          <div className="sm:hidden flex justify-center">
                            <button
                              onClick={() =>
                                setOpenAction(
                                  openAction === row.id ? null : row.id,
                                )
                              }
                              className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                            >
                              <MoreVertical size={18} />
                            </button>
                            {openAction === row.id && (
                              <div className="absolute right-2 mt-2 w-32 bg-white dark:bg-[#1a1a1a] dark:border dark:border-gray-700 rounded-lg shadow-lg z-30">
                                <button
                                  onClick={() =>
                                    navigate(`/dashboard/edit/${row.id}`)
                                  }
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    setDetailModal({
                                      isOpen: true,
                                      buwuhanId: row.id,
                                    })
                                  }
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                                >
                                  Detail
                                </button>
                                <button
                                  onClick={() => handleDeleteData(row.id)}
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white cursor-pointer"
                                >
                                  Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-[000000]">
          <span className="dark:text-[#8A86D5]">Baris per halaman</span>
          <div className="relative">
            <select
              value={pagination.currentSize}
              onChange={(e) => handleChangeSize(Number(e.target.value))}
              className="px-3 py-1 pr-6 border border-gray-300 dark:border-gray-600 rounded-full text-xs appearance-none bg-white dark:bg-[#1a1a1a] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 rounded-lg cursor-pointer
             text-gray-700 hover:bg-gray-100
             dark:text-[#8A86D5] dark:hover:bg-[#8A86D5] dark:hover:text-white
             disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPage }, (_, i) => i + 1).map(
              (pg) => (
                <button
                  key={pg}
                  onClick={() => handleChangePage(pg)}
                  className={`w-6 h-6 flex items-center justify-center rounded-lg font-medium transition cursor-pointer ${
                    pagination.currentPage === pg
                      ? "bg-[#8A86D5] text-white"
                      : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                  }`}
                >
                  {pg}
                </button>
              ),
            )}
          </div>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage >= pagination.totalPage}
            className="px-3 py-1 rounded-lg cursor-pointer
             text-gray-700 hover:bg-gray-100
             dark:text-[#8A86D5] dark:hover:bg-[#8A86D5] dark:hover:text-white
             disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>

        <div className="text-[#000000] dark:text-[#8A86D5]">
          Total: <span className="font-semibold">{pagination.totalData}</span>
        </div>
      </div>

      <DetailBuwuhan
        isOpen={detailModal.isOpen}
        buwuhanId={detailModal.buwuhanId}
        onClose={() => setDetailModal({ isOpen: false, buwuhanId: null })}
      />
    </div>
  );
}
