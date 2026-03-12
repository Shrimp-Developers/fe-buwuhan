import { Link } from "react-router-dom";
import { Languages, CaseSensitive, KeyRound, ChevronRight } from "lucide-react";

export default function BuwuhanSettings() {
  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-5">
      <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 md:hidden">
        Pengaturan
      </h1>
      <div className="space-y-2.5 sm:space-y-3">
        <button className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#000000] dark:border-white rounded-full bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition cursor-pointer">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white flex-shrink-0" />
            <span className="text-gray-700 dark:text-white text-xs sm:text-sm">
              Bahasa
            </span>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white flex-shrink-0" />
        </button>

        <button className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#000000] dark:border-white rounded-full bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition cursor-pointer">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <CaseSensitive className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white flex-shrink-0" />
            <span className="text-gray-700 dark:text-white text-xs sm:text-sm">
              Ukuran Huruf
            </span>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white flex-shrink-0" />
        </button>

        <Link
          to="/dashboard/settings/update-password"
          className="w-full flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#000000] dark:border-white rounded-full bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white flex-shrink-0" />
            <span className="text-gray-700 dark:text-white text-xs sm:text-sm">
              Kata Sandi
            </span>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}
