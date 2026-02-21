import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUserProfileAvatar } from '../services/authService.js';
import { alertSuccess, alertError, alertConfirm } from '../alert.js';

export default function DetailUser({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: ''
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchProfile = async () => {
                try {
                    const response = await getUserProfile();
                    const body = await response.json();

                    if (response.ok && body.data) {
                        setFormData({
                            fullName: body.data.fullName || '',
                            email: body.data.email || ''
                        });

                        if (body.data.avatar) {
                            setPreviewImage(body.data.avatar);
                        }
                    } else {
                        console.error('Failed to fetch profile:', body.message);
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                } finally {
                    setIsFetching(false);
                }
            };

            fetchProfile();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validasi ukuran file (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alertError('Ukuran file maksimal 2MB', 'File Terlalu Besar');
                return;
            }

            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);

            // Simpan file untuk upload
            setAvatarFile(file);
        }
    };

    const handleDeleteAvatar = async () => {
        const result = await alertConfirm('', 'Apakah Anda yakin ingin menghapus foto profile?', '/icon-alert-confirm.png');

        if (result.isConfirmed) {
            setIsDeleting(true);
            try {
                const response = await deleteUserProfileAvatar();

                if (response.ok) {
                    await alertSuccess('', 'Foto profile berhasil dihapus!', '/icon-alert-success.png');

                    setPreviewImage(null);
                    setAvatarFile(null);

                    // Refresh untuk update UI
                    window.location.reload();
                } else {
                    await alertError('', 'Gagal menghapus foto profile', '/icon-alert-error.png');
                }
            } catch (error) {
                console.error('Error deleting avatar:', error);
                await alertError('', 'Terjadi kesalahan saat menghapus foto profile', '/icon-alert-error.png');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName.trim()) {
            await alertError('Nama lengkap tidak boleh kosong', 'Validasi Gagal');
            return;
        }

        setIsLoading(true);

        try {
            const response = await updateUserProfile({
                fullName: formData.fullName,
                avatarFile: avatarFile
            });

            if (response.ok) {
                await alertSuccess('', 'Profile berhasil diupdate!', '/icon-alert-success.png');

                // Refresh halaman atau update context
                window.location.reload();
            } else {
                await alertError('', 'Gagal mengupdate profile', '/icon-alert-error.png');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            await alertError('', 'Terjadi kesalahan saat mengupdate profile', '/icon-alert-error.png');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute z-50 top-12 right-3">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl w-64 p-4">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    aria-label="Close"
                    disabled={isLoading}
                >
                    <X className="w-5 h-5 text-black" />
                </button>

                {/* Loading State */}
                {isFetching ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-sm text-black">Tunggu Sebentar...</p>
                    </div>
                ) : (
                    /* Form */
                    <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            <div className="w-18 h-18 rounded-full border-2 border-[#8A86D5] flex items-center justify-center relative">
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile"
                                            className="w-full h-full "
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#8A86D5] text-white text-2xl font-bold">
                                            {formData.fullName.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute inset-0 flex items-center justify-center bg-black text-white text-[10px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                    Ubah
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        disabled={isLoading}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-center mt-1">
                                {/* Hapus Button */}
                                <button
                                    type="button"
                                    onClick={handleDeleteAvatar}
                                    className="w-fit md:w-fit px-2 py-2 bg-[#8A86D5] hover:bg-[#7975C9] text-white rounded-full text-[8px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isDeleting || isLoading}
                                >
                                    {isDeleting ? 'Menghapus...' : 'Hapus Foto Profile'}
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <label className="text-[10px] text-gray-600 mb-0.5 block">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-[#8A86D5] focus:border-[#8A86D5]"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[10px] text-gray-600 mb-0.5 block">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-[11px] bg-gray-100 cursor-not-allowed"
                                disabled
                                readOnly
                            />
                        </div>
                        <div className="flex justify-center">
                            {/* Update Button */}
                            <button
                                type="submit"
                                className="w-fit md:w-fit px-4 py-1.5 bg-[#8A86D5] hover:bg-[#7975C9] text-white rounded-full text-[11px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Mengupdate...' : 'Ubah Profile'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
