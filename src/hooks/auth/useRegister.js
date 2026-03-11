import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/authService";
import { alertError, alertSuccess } from "../../lib/sweetAlert";

export default function useRegister() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, { fullName, email, password }) => {

    e.preventDefault();
    setIsLoading(true);

    // Validasi nama
    if (fullName.length < 3 || fullName.length > 100) {

      await alertError(
        "Nama lengkap minimal harus terdiri dari 3 karakter",
        "Validation Error",
        "/icon-alert-error.png"
      );

      setIsLoading(false);
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {

      await alertError(
        "Format email tidak valid",
        "Validation Error",
        "/icon-alert-error.png"
      );

      setIsLoading(false);
      return;
    }

    try {

      const response = await userRegister({ fullName, email, password });

      if (response.status === 200 || response.status === 201) {

        await alertSuccess(
          "Periksa email untuk aktivasi akun terlebih dahulu",
          "Daftar Berhasil!",
          "/icon-alert-success.png"
        );

        navigate("/login");

      }

    } catch (err) {

      console.error("Register error:", err);

      const status = err.response?.status;

      if (status === 409) {

        await alertError(
          "Email sudah terdaftar",
          "Gagal Daftar!",
          "/icon-alert-error.png"
        );

      } else if (status === 400) {

        await alertError(
          "Kata sandi harus mengandung huruf besar dan angka",
          "Gagal Daftar!",
          "/icon-alert-error.png"
        );

      } else {

        await alertError(
          "Terjadi kesalahan jaringan. Silakan coba lagi.",
          "Gagal Daftar!",
          "/icon-alert-error.png"
        );

      }

    } finally {

      setIsLoading(false);

    }

  };

  return {
    handleSubmit,
    isLoading
  };

}