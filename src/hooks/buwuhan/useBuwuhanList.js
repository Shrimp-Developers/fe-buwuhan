import { useEffect, useState } from "react";
import { getListBuwuhan, deleteBuwuhan } from "../../services/buwuhanService";
import { alertConfirm, alertError, alertSuccess } from "../../lib/sweetalert";

export default function useBuwuhanList(searchQuery) {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

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

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.currentPage,
        size: pagination.currentSize,
      };

      if (category) params.category = category;
      if (status) params.status = status;

      const response = await getListBuwuhan(params);

      const body = response.data;

      let results = body.data || [];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();

        results = results.filter(
          (item) =>
            item.nameMan?.toLowerCase().includes(query) ||
            item.nameWoman?.toLowerCase().includes(query),
        );
      }

      setData(results);

      if (body.paging) {
        setPagination((prev) => ({
          ...prev,
          totalPage: body.paging.totalPage || 1,
          totalData: body.paging.totalData || 0,
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

  const handleCategoryChange = (val) => {
    setCategory(val);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleChangeStatus = (val) => {
    setStatus(val);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleChangeSize = (currentSize) => {
    setPagination((prev) => ({
      ...prev,
      currentSize,
      currentPage: 1,
    }));
  };

  const handleChangePage = (page) => {
  setPagination((prev) => ({
    ...prev,
    currentPage: page
  }));
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
      console.log("DELETE ID:", buwuhanId);

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
  };
}
