import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertSuccess, alertError } from "../../lib/sweetAlert";
import { updatePassword } from "../../services/authService";

export default function useUpdatePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const resetForm = () => {
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alertError(
        "Kata password baru dan password konfirmasi tidak cocok",
        "Gagal!",
        "/icon-alert-error.png",
      );
    }

    if (formData.newPassword === formData.oldPassword) {
      return alertError(
        "Kata sandi baru tidak boleh sama dengan kata sandi lama",
        "Gagal!",
        "/icon-alert-error.png",
      );
    }

    setIsLoading(true);
    try {
      await updatePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      await alertSuccess(
        "Password berhasil diubah!",
        "Berhasil!",
        "/icon-alert-update.png",
      );
      resetForm();
      navigate("/dashboard/settings");
    } catch (error) {
      console.log(error);
      await alertError(
        "Kata sandi lama tidak sesuai",
        "Gagal!",
        "/icon-alert-error.png",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    showPasswords,
    handleChange,
    toggleShow,
    handleSubmit,
  };
}
