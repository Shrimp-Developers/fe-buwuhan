import { X } from "lucide-react";
import { useDetailBuwuhan } from "../hooks/buwuhan/useDetailBuwuhan";
import { getCategoryLabelById, getStatusLabel } from "../constants/buwuhanOptions";

export default function DetailBuwuhan({ isOpen, onClose, buwuhanId }) {
  const { buwuhanData, isLoading } = useDetailBuwuhan(buwuhanId, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl w-full max-w-[600px] p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-white" />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-gray-500 dark:text-gray-400">Tunggu Sebentar...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="order-1 sm:order-1">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Nama Laki-laki</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">{buwuhanData?.nameMan}</p>
            </div>
            <div className="order-4 sm:order-2">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Pemberian</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">{buwuhanData?.gift}</p>
            </div>
            <div className="order-7 sm:order-3">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Status</h2>
              <span className={`px-3 py-1 text-[10px] sm:text-xs rounded-full border ${buwuhanData?.status === "unpaid" ? "border-red-500 text-red-500" : "border-[#8A86D5] text-[#8A86D5]"}`}>
                {getStatusLabel(buwuhanData?.status)}
              </span>
            </div>
            <div className="order-2 sm:order-4">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Nama Perempuan</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">{buwuhanData?.nameWoman}</p>
            </div>
            <div className="order-5 sm:order-5">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Alamat</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">{buwuhanData?.address}</p>
            </div>
            <div className="hidden sm:block sm:order-6"></div>
            <div className="order-3 sm:order-7">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Kategori</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">{getCategoryLabelById(buwuhanData?.category)}</p>
            </div>
            <div className="order-6 sm:order-8">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1 sm:mb-2">Keterangan</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-white">{buwuhanData?.information}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}