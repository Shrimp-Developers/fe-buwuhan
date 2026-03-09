import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDetailBuwuhan, updateDataBuwuhan } from "../../services/buwuhanService";
import { alertConfirm, alertSuccess, alertError } from "../../lib/sweetAlert";

export default function useEditBuwuhan(buwuhanId) {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    nameMan: "",
    nameWoman: "",
    categoryId: "",
    gift: "",
    status: "",
    address: "",
    information: "",
  });

  
  useEffect(() => {

    const fetchData = async () => {
      setIsFetching(true);

      try {
        const body = await getDetailBuwuhan(buwuhanId);
        const data = body.data;

        setFormData({
          nameMan: data.data.nameMan,
          nameWoman: data.data.nameWoman,
          categoryId: data.data.categoryId,
          gift: data.data.gift,
          status: data.data.status,
          address: data.data.address,
          information: data.data.information,
        });
      } catch (error) {
        console.error("Error fetching buwuhan:", error);

        await alertError(
          error.message || "Gagal memuat data",
          "Error",
          "/icon-alert-error.png"
        );

        navigate("/buwuhan/list");
      } finally {
        setIsFetching(false);
      }
    };

    if (buwuhanId) fetchData();
  }, [buwuhanId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      nameMan: "",
      nameWoman: "",
      categoryId: "",
      gift: "",
      status: "",
      address: "",
      information: ""
    });
  };

  const handleSubmit = async () => {
    if (!formData.nameMan.trim()) {
      return alertError(
        "Nama laki-laki harus diisi",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
    }

    if (!formData.nameWoman.trim()) {
      return alertError(
        "Nama perempuan harus diisi",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
    }

    if (!formData.categoryId) {
      return alertError(
        "Kategori harus dipilih",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
    }

    if (!formData.gift.trim()) {
      return alertError(
        "Pemberian harus diisi",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
    }

    if (!formData.status) {
      return alertError(
        "Status harus dipilih",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
    }

    const result = await alertConfirm(
      "Apakah Anda yakin ingin mengubah data ini?",
      "Konfirmasi Update",
      "/icon-alert-confirm.png"
    );

    if (!result.isConfirmed) return;

    setIsLoading(true);

    try {
      const responseBody = await updateDataBuwuhan(buwuhanId, {
        nameMan: formData.nameMan,
        nameWoman: formData.nameWoman,
        categoryId: formData.categoryId,
        gift: formData.gift,
        status: formData.status,
        address: formData.address,
        information: formData.information || "",
      });

      console.log(responseBody)

      await alertSuccess(
        "Data berhasil diupdate!",
        "Berhasil",
        "/icon-alert-update.png"
      );

      navigate("/dashboard/list");

    } catch (error) {
      await alertError("Gagal mengupdate data", "Gagal", "/icon-alert-error.png");
      console.log("Error updating buwuhan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    isFetching,
    handleChange,
    handleSubmit,
    handleReset,
  };
}