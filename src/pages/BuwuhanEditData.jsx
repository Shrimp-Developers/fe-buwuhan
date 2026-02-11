import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetailBuwuhan, updateDataBuwuhan } from '../services/buwuhanService.js';
import { alertSuccess, alertError, alertConfirm } from '../alert.js';

export default function BuwuhanEditData() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        namaLaki: '',
        namaPerempuan: '',
        kategori: '',
        pemberian: '',
        status: '',
        alamat: '',
        keterangan: ''
    });

    // Fetch data by ID
    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const response = await getDetailBuwuhan(id);
                const body = await response.json();

                if (response.ok && body.data) {
                    const data = body.data;

                    // Map category ID to name
                    const categoryMap = {
                        1: 'barang',
                        2: 'beras',
                        3: 'uang',
                        4: 'lainnya'
                    };

                    setFormData({
                        namaLaki: data.nameMan || '',
                        namaPerempuan: data.nameWoman || '',
                        kategori: categoryMap[data.categoryId] || '',
                        pemberian: data.gift || '',
                        status: data.status ? 'lunas' : 'belum-lunas',
                        alamat: data.address || '',
                        keterangan: data.information || ''
                    });
                } else {
                    await alertError(body.message || 'Gagal memuat data', 'Error', '/icon-alert-error.png');
                    navigate('/buwuhan/list');
                }
            } catch (error) {
                console.error('Error fetching buwuhan:', error);
                await alertError('Terjadi kesalahan saat memuat data', 'Error', '/icon-alert-error.png');
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
            // Map kategori ke categoryId
            const categoryMap = {
                'barang': 1,
                'beras': 2,
                'uang': 3,
                'lainnya': 4
            };

            const response = await updateDataBuwuhan(id, {
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
                await alertSuccess('Data berhasil diupdate!', 'Berhasil', '/icon-alert-update.png');
                navigate('/buwuhan/list');
            } else {
                await alertError(body.message || 'Gagal mengupdate data', 'Gagal', '/icon-alert-error.png');
            }
        } catch (error) {
            console.error('Error updating buwuhan:', error);
            await alertError('Terjadi kesalahan saat mengupdate data', 'Error', '/icon-alert-error.png');
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
                    {isLoading ? 'Mengupdate...' : 'Update Data'}
                </button>
            </div>
        </div>
    );
}
