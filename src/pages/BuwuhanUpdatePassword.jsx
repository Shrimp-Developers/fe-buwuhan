import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userUpdatePassword } from "../services/authService.js";
import { alertSuccess, alertError } from "../alert.js";

export default function BuwuhanUpdatePassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi
        if (!formData.oldPassword.trim()) {
            await alertError('Kata sandi lama harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        if (!formData.newPassword.trim()) {
            await alertError('Kata sandi baru harus diisi', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        if (formData.newPassword.length < 6) {
            await alertError('Kata sandi baru minimal 6 karakter', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            await alertError('Konfirmasi kata sandi tidak cocok', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        if (formData.oldPassword === formData.newPassword) {
            await alertError('Kata sandi baru harus berbeda dari kata sandi lama', 'Validasi Gagal', '/icon-alert-error.png');
            return;
        }

        setIsLoading(true);

        try {
            const response = await userUpdatePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });

            const body = await response.json();

            if (response.ok) {
                await alertSuccess('Kata sandi berhasil diubah!', 'Berhasil', '/icon-alert-update.png');

                // Reset form
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });

                navigate('/buwuhan/settings');
            } else {
                await alertError(body.message || 'Gagal mengubah kata sandi', 'Gagal', '/icon-alert-error.png');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            await alertError('Terjadi kesalahan saat mengubah kata sandi', 'Error', '/icon-alert-error.png');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white sm:w-full rounded-2xl shadow-lg">
            <div className="space-y-6 px-10 py-6">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <Link to="/buwuhan/settings" className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full">
                        <img src="/icon-left.png" alt="Kembali" className="w-8 h-8" />
                    </Link>
                    <h2 className="text-xl font-semibold">Ganti password</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password lama */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Kata sandi saat ini
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-500 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Masukkan kata sandi lama"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Password baru + konfirmasi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Kata sandi baru
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-500 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Minimal 6 karakter"
                                disabled={isLoading}
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Konfirmasi kata sandi
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-500 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Ulangi kata sandi baru"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-fit md:w-fit px-4 py-1.5 rounded-full bg-[#8A86D5] hover:bg-[#7975C9] text-white text-sm font-medium transition disabled:opacity-50 cursor-pointer"
                    >
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </form>
            </div>
        </div>
    );

}
