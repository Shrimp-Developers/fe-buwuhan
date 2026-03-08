import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, deleteUserProfileAvatar } from "../../services/authService";
import { alertSuccess, alertError, alertConfirm } from "../../lib/sweetalert";

export default function useUserProfile(isOpen) {

    const [formData, setFormData] = useState({
        fullName: "",
        email: ""
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                const data = response.data?.data;

                if (data) {
                    setFormData({
                        fullName: data.fullName,
                        email: data.email
                    });

                    if (data.avatar) {
                        setPreviewImage(data.avatar);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();

    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alertError("Ukuran file maksimal 2MB", "File Terlalu Besar");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };

        reader.readAsDataURL(file);

        setAvatarFile(file);
    };

    const handleDeleteAvatar = async () => {
        const result = await alertConfirm("", "Apakah Anda yakin ingin menghapus foto profile?", "/icon-alert-confirm.png");

        if (!result.isConfirmed) return;

        setIsDeleting(true);

        try {
            const response = await deleteUserProfileAvatar();

            if (response.status === 200) {
                await alertSuccess(
                    "", 
                    "Foto profile berhasil dihapus!", 
                    "/icon-alert-success.png"
                );

                setPreviewImage(null);
                setAvatarFile(null);

                window.location.reload();

            } else {
                await alertError(
                    "", 
                    "Gagal menghapus foto profile", 
                    "/icon-alert-error.png"
                );
            }

        } catch (error) {
            console.error("Error deleting avatar:", error);
            await alertError(
                "", 
                "Terjadi kesalahan saat menghapus foto profile", 
                "/icon-alert-error.png"
            );

        } finally {
            setIsDeleting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName.trim()) {
            await alertError(
                "Nama lengkap tidak boleh kosong", 
                "Validasi Gagal"
            );
            return;
        }

        setIsLoading(true);

        try {
            const response = await updateUserProfile({
                fullName: formData.fullName,
                avatar: avatarFile
            });

            if (response.status === 200) {
                await alertSuccess(
                    "", 
                    "Profile berhasil diupdate!", 
                    "/icon-alert-success.png");
                    window.location.reload();
            } else {
                await alertError(
                    "", 
                    "Gagal mengupdate profile", 
                    "/icon-alert-error.png"
                );
            }

        } catch (error) {
            console.error("Error updating profile:", error);
            await alertError(
                "", 
                "Terjadi kesalahan saat mengupdate profile", 
                "/icon-alert-error.png"
            );

        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        previewImage,
        isLoading,
        isDeleting,
        isFetching,
        handleImageChange,
        handleDeleteAvatar,
        handleSubmit
    };
}