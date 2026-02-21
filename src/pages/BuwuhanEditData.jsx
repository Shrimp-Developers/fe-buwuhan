import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getDetailBuwuhan,
    updateDataBuwuhan,
    CATEGORY_ID_MAP,
    STATUS_API_TO_FORM,
    CATEGORY_VALUE_MAP,
    STATUS_FORM_TO_API,
} from '../services/buwuhanService.js';
import { alertSuccess, alertError, alertConfirm } from '../alert.js';

export default function BuwuhanEditData() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        nameMan: '',
        nameWoman: '',
        categoryId: '',
        gift: '',
        status: '',
        address: '',
        information: ''
    });

    // Fetch data by ID
    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const body = await getDetailBuwuhan(id);
                const data = body.data;

                setFormData({
                    nameMan: data.nameMan || '',
                    nameWoman: data.nameWoman || '',
                    categoryId: CATEGORY_ID_MAP[data.categoryId] || '',
                    gift: data.gift || '',
                    status: STATUS_API_TO_FORM[data.status] || '',
                    address: data.address || '',
                    information: data.information || ''
                });
            } catch (error) {
                console.error('Error fetching buwuhan:', error);
                await alertError(error.message || 'Gagal memuat data', 'Error', '/icon-alert-error.png');
                navigate('/buwuhan/list');
            } finally {
                setIsFetching(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReset = () => {
        navigate(`/buwuhan/edit/${id}`);
        window.location.reload();
    };

    const handleSubmit = async () => {
        // Validasi
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

        const result = await alertConfirm(
            'Apakah Anda yakin ingin mengubah data ini?',
            'Konfirmasi Update',
            '/icon-alert-confirm.png'
        );

        if (!result.isConfirmed) {
            return;
        }

        setIsLoading(true);

        try {
            const body = await updateDataBuwuhan(id, {
                nameMan: formData.nameMan,
                nameWoman: formData.nameWoman,
                categoryId: CATEGORY_VALUE_MAP[formData.categoryId],
                gift: formData.gift,
                status: STATUS_FORM_TO_API[formData.status],
                address: formData.address || '',
                information: formData.information || ''
            });

            await alertSuccess(body.message || 'Data berhasil diupdate!', 'Berhasil', '/icon-alert-update.png');
            navigate('/buwuhan/list');
        } catch (error) {
            const errorMsg = error.body?.errors?.[0]?.message || error.message || 'Gagal mengupdate data';
            await alertError(errorMsg, 'Gagal', '/icon-alert-error.png');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="w-full mx-auto px-4 md:px-5">
                <div className="text-center py-10 text-sm text-gray-500">Memuat data...</div>
            </div>
        );
    }

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
