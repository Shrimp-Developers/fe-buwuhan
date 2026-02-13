import { X } from 'lucide-react';


export default function DetailBuwuhan({ isOpen, onClose, data }) {
    // Default data jika tidak ada props data yang dikirim
    const defaultData = {
        namaLaki: 'Rachman',
        pemberian: '100.000',
        status: 'Belum lunas',
        namaPerempuan: 'Yasmine',
        alamat: 'Desa kemuning blok G05',
        kategori: 'Uang',
        keterangan: '-'
    };
    const buwuhanData = data || defaultData;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-white border border-none rounded-xl shadow-2xl w-[550px] p-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>

                {/* Content Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Nama Laki-laki</h2>
                            <p className="text-base text-gray-600">{buwuhanData.namaLaki}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Pemberian</h2>
                            <p className="text-base text-gray-600">{buwuhanData.pemberian}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Status</h2>
                            <span className="px-3 py-1 text-xs rounded-full border border-[#8A86D5] text-[#8A86D5]">
                                {buwuhanData.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 my-6">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Nama Perempuan</h2>
                            <p className="text-base text-gray-600">{buwuhanData.namaPerempuan}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Alamat</h2>
                            <p className="text-base text-gray-600">{buwuhanData.alamat}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Kategori</h2>
                            <p className="text-base text-gray-600">{buwuhanData.kategori}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-800 mb-2">Keterangan</h2>
                            <p className="text-base text-gray-600">{buwuhanData.keterangan}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}