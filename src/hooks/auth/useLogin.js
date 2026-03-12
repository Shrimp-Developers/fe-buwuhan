import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { alertError, alertSuccess } from "../../lib/sweetAlert";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e,{ email, password }) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 8 || password.length > 100) {
      await alertError(
        "Kata sandi harus minimal 8 karakter",
        "Gagal Masuk!",
        "/icon-alert-error.png"
      );
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        await alertSuccess(
          "Login berhasil!",
          "Selamat Datang!",
          "/icon-alert-success.png"
        );

        navigate("/dashboard");
      } else {
        const msg = result.error?.toLowerCase() || "";

        if (msg.includes("inactive")) {
          await alertError(
            "Akun Anda tidak aktif. Silakan periksa email untuk aktivasi.",
            "Gagal Masuk!",
            "/icon-alert-error.png"
          );
        } else if (msg.includes("google")) {
          await alertError(
            "Email ini terdaftar via Google. Gunakan tombol masuk Google.",
            "Gagal Masuk!",
            "/icon-alert-error.png"
          );
        } else {
          await alertError(
            "Email atau kata sandi salah",
            "Gagal Masuk!",
            "/icon-alert-error.png"
          );
        }
      }
    } catch (err) {
      console.error("Login error:", err);

      await alertError(
        "Terjadi kesalahan jaringan. Silakan coba lagi.",
        "Gagal Masuk!",
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