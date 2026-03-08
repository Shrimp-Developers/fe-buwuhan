import { useState, useRef } from "react";
import { ChevronDown, Search, MoreVertical } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useBuwuhanList from "../hooks/buwuhan/useBuwuhanList";
import useDropdownOutside from "../hooks/buwuhan/useDropdownOutside";
import DetailBuwuhan from "../components/DetailBuwuhan";
import {
  getCategoryLabelByName,
  getStatusLabel,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/buwuhanOptions";

export default function BuwuhanList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(searchQuery);

  const {
    data,
    loading,
    error,
    category,
    status,
    handleCategoryChange,
    handleChangeStatus,
    pagination,
    handlePrevPage,
    handleNextPage,
    handleChangeSize,
    handleChangePage,
    handleDeleteData,
  } = useBuwuhanList(searchQuery);

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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/dashboard/list?search=${searchValue}`);
    }
  };

  return (
    <div className="w-full mx-auto p-3 sm:p-4 md:px-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {/* Category */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => {
                setShowCategory(!showCategory);
                setShowStatus(false);
              }}
              className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full text-xs"
            >
              {category ? getCategoryLabelByName(category) : "Kategori"}
              <ChevronDown size={16} />
            </button>

            {showCategory && (
              <div className="absolute mt-2 w-40 bg-white border rounded-xl shadow-lg z-20">
                <button
                  onClick={() => handleCategoryChange("")}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
                >
                  Semua Kategori
                </button>

                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleCategoryChange(opt.value)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
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
              className="flex items-center gap-2 border px-3 py-2 rounded-full text-xs"
            >
              {status ? getStatusLabel(status) : "Status"}
              <ChevronDown size={16} />
            </button>

            {showStatus && (
              <div className="absolute mt-2 w-40 bg-white border rounded-xl shadow-lg z-20">
                <button
                  onClick={() => handleChangeStatus("")}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
                >
                  Semua Status
                </button>

                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleChangeStatus(opt.value)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Cari . . ."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className="pl-5 pr-10 py-2 w-full h-[40px] bg-white rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none shadow border border-gray-200"
          />

          <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-xs text-gray-500">
          Memuat data...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-10 text-xs text-red-600">{error}</div>
      )}

      {/* Table */}
      {!loading && !error && (
        <>
          {data.length === 0 ? (
            <div className="text-center py-10 text-xs text-gray-500">
              Tidak ada data
            </div>
          ) : (
            <div className="border-1 rounded-2xl">
            <div className="p-7">
              <table className="w-full text-xs md:text-s">
                <thead>
                  <tr>
                    <th className="p-2 text-left">Nama Laki-laki</th>
                    <th className="p-2 text-left">Nama Perempuan</th>
                    <th className="p-2 text-left">Kategori</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} className="border-b">
                      <td className="p-2">{row.nameMan}</td>
                      <td className="p-2">{row.nameWoman}</td>
                      <td className="p-2">
                        {getCategoryLabelByName(row.categoryName)}
                      </td>
                      <td className="p-2">{getStatusLabel(row.status)}</td>

                      <td className="p-2 text-center relative">
                        {/* Desktop Actions */}
                        <div className="hidden sm:flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/buwuhan/edit/${row.id}`)}
                            className="px-3 py-1 border rounded-full text-xs"
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
                            className="px-3 py-1 bg-[#8A86D5] text-white rounded-full text-xs"
                          >
                            Detail
                          </button>

                          <button
                            onClick={() => handleDeleteData(row.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-full text-xs"
                          >
                            Hapus
                          </button>
                        </div>

                        {/* Mobile Options */}
                        <div className="sm:hidden flex justify-center">
                          <button
                            onClick={() =>
                              setOpenAction(
                                openAction === row.id ? null : row.id,
                              )
                            }
                            className="p-2 rounded-full hover:bg-gray-200"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openAction === row.id && (
                            <div className="absolute right-2 mt-2 w-32 bg-white border rounded-lg shadow-lg z-30">
                              <button
                                onClick={() =>
                                  navigate(`/buwuhan/edit/${row.id}`)
                                }
                                className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
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
                                className="w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
                              >
                                Detail
                              </button>

                              <button
                                onClick={() => handleDeleteData(row.id)}
                                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-gray-100"
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
      <div className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
        {/* Baris per halaman */}
        <div className="flex items-center gap-2 text-gray-600">
          <span>Baris per halaman</span>

          <div className="relative">
            <select
              value={pagination.size}
              onChange={(e) => handleChangeSize(Number(e.target.value))}
              className="px-3 py-1 pr-6 border border-gray-300 rounded-full text-sm appearance-none bg-white focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>

            <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPage }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handleChangePage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium transition ${
                    pagination.currentPage === page
                      ? "bg-[#8A86D5] text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage >= pagination.totalPage}
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>

        {/* Total */}
        <div className="text-gray-700">
          Total: <span className="font-semibold">{pagination.totalData}</span>
        </div>
      </div>

      {/* Modal */}
      <DetailBuwuhan
        isOpen={detailModal.isOpen}
        buwuhanId={detailModal.buwuhanId}
        onClose={() =>
          setDetailModal({
            isOpen: false,
            buwuhanId: null,
          })
        }
      />
    </div>
  );
}
