import { useState } from "react";
import { forgotPassword } from "../../services/authService";
import { alertSuccess, alertError } from "../../lib/sweetalert";

export default function useForgotPassword() {

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, { email }) => {
    e.preventDefault();

    if (!email) {
      await alertError(
        "Email harus diisi",
        "Gagal!",
        "/icon-alert-error.png"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword({ email });

      await alertSuccess(
        response.data.message ||
        "Link reset password telah dikirim ke email Anda",
        "Berhasil!",
        "/icon-alert-success.png"
      );

    } catch (error) {

      const msg =
        error.response?.data?.message ||
        "Email tidak ditemukan";

      await alertError(
        msg,
        "Gagal!",
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