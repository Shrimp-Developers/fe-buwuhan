import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { alertConfirm, alertSuccess } from "../../lib/sweetAlert.js";

export default function useSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await alertConfirm(
      "Apakah Kamu ingin keluar?",
      "Konfirmasi Logout",
      "/icon-alert-confirm.png",
    );

    if (result.isConfirmed) {
      await alertSuccess(
        "Sampai jumpa lagi!",
        "Logout Berhasil",
        "/icon-alert-logout.png",
      );

      logout();
      navigate("/login");
    }
  };

  const menuClasses = (path) =>
    `w-full flex items-center gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 py-2.5 sm:py-3 mb-2 rounded-lg text-xs sm:text-sm md:text-xs font-medium transition-all duration-200
    ${
      pathname === path
        ? "bg-[#8A86D5] text-[#ffffff] hover:bg-[#8A86D5]"
        : "text-[#000000] dark:text-[#ffffff] hover:bg-[#8A86D533] hover:text-[#000000] dark:hover:text-[#ffffff]"
    }`;

  return {
    handleLogout,
    menuClasses,
  };
}
