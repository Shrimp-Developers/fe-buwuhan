import { useParams } from "react-router-dom";
import useEditBuwuhan from "../hooks/buwuhan/useEditBuwuhan";

export default function BuwuhanEditData() {
  const { buwuhanId } = useParams();
  const {
    formData,
    isLoading,
    isFetching,
    handleChange,
    handleSubmit,
    handleReset,
  } = useEditBuwuhan(buwuhanId);

  if (isFetching) {
    return (
      <div className="text-center py-10 text-sm text-gray-400">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-5 dark:text-[#ffffff]">
      <h1 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 md:hidden">
        Edit Data
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5">
              Nama laki-laki
            </label>
            <input
              type="text"
              name="nameMan"
              placeholder="Contoh: Hadi Budi Hardoyo"
              value={formData.nameMan}
              onChange={handleChange}
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5">
              Nama Perempuan
            </label>
            <input
              type="text"
              name="nameWoman"
              placeholder="Contoh: Davina Karamoy"
              value={formData.nameWoman}
              onChange={handleChange}
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5">Kategori</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              disabled={isLoading}
              required
            >
              <option value="">Pilih kategori</option>
              <option value="1">Uang</option>
              <option value="2">Beras</option>
              <option value="3">Barang</option>
              <option value="4">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5">
              Pemberian
            </label>
            <input
              type="text"
              name="gift"
              placeholder="Contoh: Rp 500.000, 10 kg, Motor, Emas"
              value={formData.gift}
              onChange={handleChange}
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              disabled={isLoading}
              required
            >
              <option value="">Pilih status</option>
              <option value="paid">Lunas</option>
              <option value="unpaid">Belum Lunas</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5">Alamat</label>
            <textarea
              name="address"
              placeholder="Jl. Mawar Indah No. 12, RT 03/RW 07, Kel. Sukamaju, Kec. Cibeunying, Kota Bandung, Jawa Barat 40123"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none placeholder:text-xs"
              disabled={isLoading}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5">
              Keterangan
            </label>
            <textarea
              name="information"
              placeholder="Contoh: Anak dari si A dan si B"
              value={formData.information}
              onChange={handleChange}
              rows="4"
              className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-400 dark:border-gray-600 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none placeholder:text-xs"
              disabled={isLoading}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-row gap-4 mt-6 justify-between">
        <button
          onClick={handleReset}
          className="px-5 sm:px-3 py-3 sm:py-3 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-full hover:bg-red-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={isLoading}
        >
          Reset Data
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 sm:px-3 py-3 sm:py-3 bg-[#000000] text-white dark:bg-white dark:text-[#000000] text-xs sm:text-sm font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-2 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Mengupdate..." : "Update Data"}
        </button>
      </div>
    </div>
  );
}
