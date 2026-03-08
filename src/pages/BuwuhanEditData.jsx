import { useParams } from "react-router-dom";
import useEditBuwuhan from "../hooks/useEditBuwuhan";

export default function BuwuhanEditData() {
    const { id: buwuhanId  } = useParams();
    const { 
        formData, 
        isLoading, 
        handleChange, 
        handleSubmit, 
        handleReset 
    } = useEditBuwuhan(buwuhanId );

    return (
        <div className="w-full mx-auto px-4 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-base font-semibold text-gray-900 mb-4 md:hidden">
                Edit Data
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium mb-1.5">
                            Nama laki-laki
                        </label>
                        <input
                            type="text"
                            name="nameMan"
                            value={formData.nameMan}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
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
                            value={formData.nameWoman}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1.5">
                            Kategori
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white"
                            disabled={isLoading}
                            required
                        >
                            <option value="">Pilih kategori</option>
                            <option value="barang">Barang</option>
                            <option value="beras">Beras</option>
                            <option value="uang">Uang</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1.5">
                            Pemberian
                        </label>
                        <input
                            type="text"
                            name="gift"
                            value={formData.gift}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            placeholder="Contoh: Rp 500.000 atau 10 kg"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1.5">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white"
                            disabled={isLoading}
                            required
                        >
                            <option value="">Pilih status</option>
                            <option value="lunas">Lunas</option>
                            <option value="belum-lunas">Belum Lunas</option>
                        </select>
                    </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium mb-1.5">
                            Alamat
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
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
                            value={formData.information}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-1.5 text-xs border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
                            disabled={isLoading}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sm:flex-row gap-4 mt-6 justify-between">
                <button
                    onClick={handleReset}
                    className="px-5 sm:px-3 py-3 sm:py-3 bg-red-600 text-white text-xs font-medium rounded-full hover:bg-red-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    Reset Data
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-5 sm:px-3 py-3 sm:py-3 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-gray-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Mengupdate...' : 'Update Data'}
                </button>
            </div>
        </div>
    );
}
