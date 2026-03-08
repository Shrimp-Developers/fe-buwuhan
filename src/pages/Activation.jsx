import { Link } from "react-router-dom";
import useActivation from "../hooks/auth/useActivation";

export default function Activation() {

  const { status, message } = useActivation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8A86D5] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Buwuhan Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold mb-4">
          {status === "loading" && "Mengaktivasi Akun..."}
          {status === "success" && "Aktivasi Berhasil!"}
          {status === "error" && "Aktivasi Gagal"}
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {status === "error" && (
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full bg-[#8A86D5] text-white py-3 rounded-xl font-semibold hover:bg-[#7975C9] transition"
            >
              Ke Halaman Login
            </Link>

            <Link
              to="/register"
              className="block w-full border-2 border-[#8A86D5] text-[#8A86D5] py-3 rounded-xl font-semibold hover:bg-[#F5F5FF] transition"
            >
              Daftar Ulang
            </Link>
          </div>
        )}

        {status === "success" && (
          <Link
            to="/login"
            className="block w-full bg-[#8A86D5] text-white py-3 rounded-xl font-semibold hover:bg-[#7975C9] transition"
          >
            Login Sekarang
          </Link>
        )}
      </div>
    </div>
  );
}