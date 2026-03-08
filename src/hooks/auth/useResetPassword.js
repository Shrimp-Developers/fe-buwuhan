import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { alertSuccess, alertError } from "../../lib/sweetalert";

export default function useResetPassword(token) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, { newPassword, confirmPassword }) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      await alertError(
        "Password minimal 8 karakter",
        "Gagal!",
        "/icon-alert-error.png"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      await alertError(
        "Konfirmasi password tidak cocok",
        "Gagal!",
        "/icon-alert-error.png"
      );
      return;
    }

    if (!token) {
      await alertError(
        "Token reset password tidak ditemukan",
        "Gagal!",
        "/icon-alert-error.png"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword({ token, newPassword });

      await alertSuccess(
        "Password berhasil direset",
        "Berhasil!",
        "/icon-alert-success.png"
      );

      console.log("Password reset response:", response);

      navigate("/login");
    } catch (error) {
        console.log("Error:", error);
        await alertError("Gagal mereset password", "Gagal!", "/icon-alert-error.png");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
}