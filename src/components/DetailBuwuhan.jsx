import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getDetailBuwuhan, CATEGORY_ID_TO_LABEL, STATUS_TO_LABEL } from '../services/buwuhanService';


export default function DetailBuwuhan({ isOpen, onClose, buwuhanId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [buwuhanData, setBuwuhanData] = useState({
        nameMan: '',
        nameWoman: '',
        category: '',
        gift: '',
        address: '',
        information: '',
        status: ''
    });

    useEffect(() => {
        if (!isOpen || !buwuhanId) return;

        const fetchBuwuhanDetail = async () => {
            setIsLoading(true);
            try {
                const body = await getDetailBuwuhan(buwuhanId);

                setBuwuhanData({
                    nameMan: body.data.nameMan || '-',
                    nameWoman: body.data.nameWoman || '-',
                    category: CATEGORY_ID_TO_LABEL[body.data.categoryId] || '-',
                    gift: body.data.gift || '-',
                    address: body.data.address || '-',
                    information: body.data.information || '-',
                    status: STATUS_TO_LABEL[body.data.status] || body.data.status || '-',
                });
            } catch (error) {
                console.error('Error fetching buwuhan detail:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuwuhanDetail();

    }, [isOpen, buwuhanId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[600px] p-6 sm:p-8">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <X className="w-6 h-6 sm:w-6 sm:h-6 text-gray-600" />
                </button>

                {isLoading ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-sm text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile: 1 kolom (urutan 1-7), Desktop: 3 kolom (urutan asli) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            {/* Nama Laki-laki — mobile: 1, desktop: row1 col1 */}
                            <div className="order-1 sm:order-1">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Nama Laki-laki</h2>
                                <p className="text-sm sm:text-base text-gray-600">{buwuhanData.nameMan}</p>
                            </div>
                            {/* Pemberian — mobile: 4, desktop: row1 col2 */}
                            <div className="order-4 sm:order-2">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Pemberian</h2>
                                <p className="text-sm sm:text-base text-gray-600">{buwuhanData.gift}</p>
                            </div>
                            {/* Status — mobile: 7, desktop: row1 col3 */}
                            <div className="order-7 sm:order-3">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Status</h2>
                                <span className="px-3 py-1 text-[10px] sm:text-xs rounded-full border border-[#8A86D5] text-[#8A86D5]">
                                    {buwuhanData.status}
                                </span>
                            </div>
                            {/* Nama Perempuan — mobile: 2, desktop: row2 col1 */}
                            <div className="order-2 sm:order-4">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Nama Perempuan</h2>
                                <p className="text-sm sm:text-base text-gray-600">{buwuhanData.nameWoman}</p>
                            </div>
                            {/* Alamat — mobile: 5, desktop: row2 col2 */}
                            <div className="order-5 sm:order-5">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Alamat</h2>
                                <p className="text-sm sm:text-base text-gray-600">{buwuhanData.address}</p>
                            </div>
                            {/* Placeholder desktop row2 col3 */}
                            <div className="hidden sm:block sm:order-6"></div>
                            {/* Kategori — mobile: 3, desktop: row3 col1 */}
                            <div className="order-3 sm:order-7">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Kategori</h2>
                                <p className="text-sm sm:text-base text-gray-600">{buwuhanData.category}</p>
                            </div>
                            {/* Keterangan — mobile: 6, desktop: row3 col2 */}
                            <div className="order-6 sm:order-8">
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Keterangan</h2>
                                <p className="text-sm sm:text-base text-gray-600">{buwuhanData.information}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}