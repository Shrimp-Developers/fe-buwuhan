import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBuwuhan, CATEGORY_VALUE_MAP, STATUS_FORM_TO_API } from '../services/buwuhanService.js';
import { alertSuccess, alertError } from '../alert.js';

export default function BuwuhanCreate() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nameMan: '',
        nameWoman: '',
        categoryId: '',
        gift: '',
        status: '',
        address: '',
        information: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReset = () => {
        setFormData({
            nameMan: '',
            nameWoman: '',
            categoryId: '',
            gift: '',
            status: '',
            address: '',
            information: ''
        });
    };

    const handleSubmit = async () => {
        // Validasi form
        if (!formData.nameMan.trim()) {
            await alertError('Nama laki-laki harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.nameWoman.trim()) {
            await alertError('Nama perempuan harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.categoryId) {
            await alertError('Kategori harus dipilih', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.gift.trim()) {
            await alertError('Pemberian harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.status) {
            await alertError('Status harus dipilih', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        setIsLoading(true);

        try {
            await createBuwuhan({
                nameMan: formData.nameMan,
                nameWoman: formData.nameWoman,
                categoryId: CATEGORY_VALUE_MAP[formData.categoryId],
                gift: formData.gift,
                status: STATUS_FORM_TO_API[formData.status],
                address: formData.address || '',
                information: formData.information || ''
            });

            await alertSuccess('Data berhasil ditambah!', 'Berhasil', '/icon-alert-add.png');
            navigate('/buwuhan/list');
        } catch (error) {
            const errorMsg = error.body?.errors?.[0]?.message || error.message || 'Gagal menambahkan data';
            await alertError(errorMsg, 'Gagal!', '/icon-alert-error.png');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto px-3 sm:px-4 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 md:hidden">
                Tambah Data
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 lg:gap-x-12 gap-y-3 sm:gap-y-4">
                {/* Kolom Kiri */}
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Nama laki-laki
                        </label>
                        <input
                            type="text"
                            name="nameMan"
                            value={formData.nameMan}
                            onChange={handleChange}
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Nama Perempuan
                        </label>
                        <input
                            type="text"
                            name="nameWoman"
                            value={formData.nameWoman}
                            onChange={handleChange}
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Kategori
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white"
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
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Pemberian
                        </label>
                        <input
                            type="text"
                            name="gift"
                            value={formData.gift}
                            onChange={handleChange}
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                            placeholder="Contoh: Rp 500.000 atau 10 kg"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white"
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
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Alamat
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
                            disabled={isLoading}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5">
                            Keterangan
                        </label>
                        <textarea
                            name="information"
                            value={formData.information}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
                            disabled={isLoading}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sm:flex-row gap-3 sm:gap-4 mt-5 sm:mt-6 justify-between">
                <button
                    onClick={handleReset}
                    className="px-5 sm:px-3 py-3 sm:py-3 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-full hover:bg-red-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1 cursor-pointer"
                    disabled={isLoading}
                >
                    Reset Data
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-5 sm:px-3 py-3 sm:py-3 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gray-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? 'Menambahkan...' : 'Tambah Data'}
                </button>
            </div>
        </div>
    );
}
