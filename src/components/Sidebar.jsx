import {
  PlusCircle,
  LogOut,
  X,
  LayoutDashboard,
  Settings,
  List,
} from "lucide-react";
import { Link } from "react-router-dom";
import useSidebar from "../hooks/sidebar/useSidebar";

export default function Sidebar({ isOpen, onClose }) {
  const { handleLogout, menuClasses } = useSidebar();

  return (
    <>
      {/* Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
                fixed md:static
                top-0 left-0
                w-[280px] lg:w-[270px]
                bg-[#FFFFFF] dark:bg-[#0D0D0D]
                flex flex-col 
                h-full min-h-screen
                z-50
                transform transition-transform duration-300 ease-in-out
                shadow-2xl md:shadow-none
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
      >
        <div className="py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
              <img
                src="/logo.png"
                alt="Deskripsi icon-logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
            </div>
            <span className="font-semibold text-base sm:text-lg dark:text-[#ffffff]">
              BUWUHAN
            </span>
          </div>

          <button
            onClick={onClose}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-[#FFFFFF]" />
          </button>
        </div>

        <nav className="flex-1 px-4 sm:px-6 md:px-5 lg:px-7 py-3 sm:py-4 md:py-2">
          <Link to="/dashboard" className={menuClasses("/dashboard")}>
            <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/dashboard/create"
            className={menuClasses("/dashboard/create")}
          >
            <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Tambah Data</span>
          </Link>

          <Link to="/dashboard/list" className={menuClasses("/dashboard/list")}>
            <List className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Lihat Semua Data</span>
          </Link>

          <Link
            to="/dashboard/settings"
            className={menuClasses("/dashboard/settings")}
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Pengaturan</span>
          </Link>
        </nav>

        <div className="px-4 sm:px-6 md:px-5 lg:px-7 py-4 sm:py-5">
          <button
            className="w-full flex items-center gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 py-3 sm:py-4 text-[#000000] dark:text-[#ffffff] hover:bg-[#8A86D533] rounded-lg text-xs sm:text-sm md:text-xs transition-all duration-200 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
