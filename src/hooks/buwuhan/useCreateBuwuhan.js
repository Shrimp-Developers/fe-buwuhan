import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBuwuhan } from "../../services/buwuhanService";
import { alertError, alertSuccess } from "../../lib/sweetAlert";

export default function useCreateBuwuhan() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nameMan: "",
    nameWoman: "",
    categoryId: "",
    gift: "",
    status: "",
    address: "",
    information: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
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
    setIsLoading(true);

    try {
      const payload = {
        nameMan: formData.nameMan,
        nameWoman: formData.nameWoman,
        categoryId: Number(formData.categoryId),
        gift: formData.gift,
        status: formData.status,
        address: formData.address,
        information: formData.information || ""
      };

      const response = await createBuwuhan(payload);
      const data = response.data;

      await alertSuccess(
        "Data berhasil ditambah!",
        "Berhasil",
        "/icon-alert-add.png"
      );

      console.log("Success Response:", data);

      navigate("/dashboard/list");

    } catch (error) {
      console.log("Error Response:", error.response?.data);

      await alertError(
        "Terjadi kesalahan jaringan. Silakan coba lagi.",
        "Gagal!",
        "/icon-alert-error.png"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleReset,
    handleSubmit
  };
}