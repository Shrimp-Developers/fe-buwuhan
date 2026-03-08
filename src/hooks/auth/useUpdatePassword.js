import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/authService";
import { alertSuccess, alertError } from "../../lib/sweetalert";

export default function useUpdatePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, { oldPassword, newPassword, confirmPassword }, resetForm) => {
    e.preventDefault();

    if (!oldPassword.trim()) {
      await alertError(
        "Kata sandi lama harus diisi",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
      return;
    }

    if (!newPassword.trim()) {
      await alertError(
        "Kata sandi baru harus diisi",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
      return;
    }

    if (newPassword.length < 6) {
      await alertError(
        "Kata sandi baru minimal 6 karakter",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      await alertError(
        "Konfirmasi kata sandi tidak cocok",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
      return;
    }

    if (oldPassword === newPassword) {
      await alertError(
        "Kata sandi baru harus berbeda dari kata sandi lama",
        "Validasi Gagal",
        "/icon-alert-error.png"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await updatePassword({
        oldPassword,
        newPassword,
      });

      await alertSuccess(
        response.data.message || "Kata sandi berhasil diubah!",
        "Berhasil",
        "/icon-alert-update.png"
      );

      resetForm();

      navigate("/dashboard/settings");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Gagal mengubah kata sandi";

      await alertError(
        msg,
        "Gagal",
        "/icon-alert-error.png"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
}