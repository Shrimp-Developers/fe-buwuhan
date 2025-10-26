import { useState } from 'react';

export default function BuwuhanForm() {
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

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        alert('Data berhasil ditambahkan!');
    };

    return (
        <div className="w-full mx-auto p-6">
            {/* Judul untuk mobile */}
            <h1 className="text-lg font-semibold text-gray-900 mb-6 md:hidden" >
                Tambah Data
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {/* Kolom Kiri */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Nama laki-laki
                        </label>
                        <input
                            type="text"
                            name="namaLaki"
                            value={formData.namaLaki}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Nama Perempuan
                        </label>
                        <input
                            type="text"
                            name="namaPerempuan"
                            value={formData.namaPerempuan}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Kategori
                        </label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white"
                        >
                            <option value="">Pilih kategori</option>
                            <option value="uang">Uang</option>
                            <option value="beras">Beras</option>
                            <option value="barang">Barang</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Pemberian
                        </label>
                        <input
                            type="text"
                            name="pemberian"
                            value={formData.pemberian}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-white"
                        >
                            <option value="">Pilih status</option>
                            <option value="belum-kawin">Lunas</option>
                            <option value="sudah-kawin">Belum Lunas</option>
                        </select>
                    </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Alamat
                        </label>
                        <textarea
                            name="alamat"
                            value={formData.alamat}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Keterangan
                        </label>
                        <textarea
                            name="keterangan"
                            value={formData.keterangan}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-between ">
                <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition shadow-md"
                >
                    Reset Data
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition shadow-md"
                >
                    Tambah Data
                </button>
            </div>
        </div>
    );
}
