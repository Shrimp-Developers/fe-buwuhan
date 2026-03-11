import { useEffect, useState } from "react";
import { getListBuwuhan, deleteBuwuhan } from "../../services/buwuhanService";
import { alertConfirm, alertError, alertSuccess } from "../../lib/sweetAlert";

export default function useBuwuhanList({ searchQuery, category, status }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    currentSize: 5,
    totalPage: 1,
    totalData: 0,
  });

  // Reset ke page 1 saat filter berubah
  useEffect(() => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [searchQuery, category, status]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getListBuwuhan({
        name: searchQuery,
        category,
        status,
        page: pagination.currentPage,
        size: pagination.currentSize,
      });

      const body = response.data;
      setData(body.data || []);

      if (body.paging) {
        setPagination((prev) => ({
          ...prev,
          totalPage: body.paging.totalPage,
          totalData: body.paging.totalData,
        }));
      }
    } catch (err) {
      console.error("Error fetching buwuhan list:", err);
      setError(err.message || "Terjadi kesalahan saat memuat data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    searchQuery,
    category,
    status,
    pagination.currentPage,
    pagination.currentSize,
    refreshKey,
  ]);

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPage) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handleChangePage = (pg) => {
    setPagination((prev) => ({ ...prev, currentPage: pg }));
  };

  const handleChangeSize = (currentSize) => {
    setPagination((prev) => ({ ...prev, currentSize, currentPage: 1 }));
  };

  const handleDeleteData = async (buwuhanId) => {
    const confirm = await alertConfirm(
      "Hapus Data Buwuhan?",
      "Apakah Kamu yakin ingin menghapus data ini?",
      "/icon-alert-confirm.png",
    );

    if (!confirm.isConfirmed) return;

    try {
      await deleteBuwuhan(buwuhanId);
      await alertSuccess(
        "Data berhasil dihapus",
        "Berhasil!",
        "/icon-alert-delete.png",
      );
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      await alertError(
        "Gagal menghapus data",
        "Gagal!",
        "/icon-alert-error.png",
      );
    }
  };

  return {
    data,
    loading,
    error,
    pagination,
    handlePrevPage,
    handleNextPage,
    handleChangeSize,
    handleChangePage,
    handleDeleteData,
  };
}
