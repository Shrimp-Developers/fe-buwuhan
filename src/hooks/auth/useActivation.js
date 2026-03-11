import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { activateAccount } from "../../services/authService";
import { alertSuccess, alertError } from "../../lib/sweetAlert";

export default function useActivation() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {

    const code = searchParams.get("code");

    if (!code) {
      setStatus("error");
      setMessage("Kode aktivasi tidak ditemukan.");
      return;
    }

    const activate = async () => {

      try {

        const { data } = await activateAccount(code);

        setStatus("success");
        setMessage(data.message || "Akun berhasil diaktivasi!");

        await alertSuccess(
          "Akun Anda berhasil diaktivasi! Silakan login.",
          "Aktivasi Berhasil!",
          "/icon-alert-success.png"
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {

        const msg =
          error.response?.data?.message ||
          "Kode aktivasi tidak valid atau sudah kadaluarsa.";

        setStatus("error");
        setMessage(msg);

        await alertError(
          msg,
          "Aktivasi Gagal!",
          "/icon-alert-error.png"
        );

      }

    };

    activate();

  }, [searchParams, navigate]);

  return {
    status,
    message
  };

}