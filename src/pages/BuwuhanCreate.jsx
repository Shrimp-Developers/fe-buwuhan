import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBuwuhan } from '../services/buwuhanService.js';
import { alertSuccess, alertError } from '../alert.js';

export default function BuwuhanCreate() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        namaLaki: '',
        namaPerempuan: '',
        kategori: '',
        pemberian: '',
        status: '',
        alamat: '',
        keterangan: ''
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
            namaLaki: '',
            namaPerempuan: '',
            kategori: '',
            pemberian: '',
            status: '',
            alamat: '',
            keterangan: ''
        });
    };

    const handleSubmit = async () => {
        // Validasi form
        if (!formData.namaLaki.trim()) {
            await alertError('Nama laki-laki harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.namaPerempuan.trim()) {
            await alertError('Nama perempuan harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.kategori) {
            await alertError('Kategori harus dipilih', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.pemberian.trim()) {
            await alertError('Pemberian harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }
        if (!formData.status) {
            await alertError('Status harus dipilih', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        setIsLoading(true);

        try {
            // Map kategori ke categoryId (1=Barang, 2=Beras, 3=Uang, 4=Lainnya)
            const categoryMap = {
                'barang': 1,
                'beras': 2,
                'uang': 3,
                'lainnya': 4
            };

            const response = await createBuwuhan({
                nameMan: formData.namaLaki,
                nameWoman: formData.namaPerempuan,
                categoryId: categoryMap[formData.kategori],
                gift: formData.pemberian,
                status: formData.status === 'lunas',
                address: formData.alamat || '',
                information: formData.keterangan || ''
            });

            const body = await response.json();

            if (response.ok) {
                await alertSuccess('Data berhasil ditambah!', 'Berhasil', '/icon-alert-add.png');
                navigate('/dashboard/buwuhan/list');
            } else {
                await alertError(body.message || 'Gagal menambahkan data', 'Gagal', '/icon-alert-error.png');
            }
        } catch (error) {
            console.error('Error creating buwuhan:', error);
            await alertError('Terjadi kesalahan saat menambahkan data', 'Error', '/icon-alert-error.png');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto px-4 md:px-5">
            {/* Judul untuk mobile */}
            <h1 className="text-base font-semibold text-gray-900 mb-4 md:hidden">
                Tambah Data
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
                            name="namaLaki"
                            value={formData.namaLaki}
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
                            name="namaPerempuan"
                            value={formData.namaPerempuan}
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
                            name="kategori"
                            value={formData.kategori}
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
                            name="pemberian"
                            value={formData.pemberian}
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
                            name="alamat"
                            value={formData.alamat}
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
                            name="keterangan"
                            value={formData.keterangan}
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
                    className="px-6 py-2.5 bg-red-600 text-white text-xs font-medium rounded-full hover:bg-red-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    Reset Data
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-gray-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Menambahkan...' : 'Tambah Data'}
                </button>
            </div>
        </div>
    );
}
