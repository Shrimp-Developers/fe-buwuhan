import { X } from "lucide-react";
import useUserProfile from "../hooks/auth/useUserProfile";

export default function DetailUser({ isOpen, onClose }) {
  const {
    formData,
    setFormData,
    previewImage,
    isLoading,
    isDeleting,
    isFetching,
    handleImageChange,
    handleDeleteAvatar,
    handleSubmit,
  } = useUserProfile(isOpen);

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

        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-black">Tunggu Sebentar...</p>
          </div>
        ) : (
          <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
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
                      {formData.fullName.charAt(0).toUpperCase() || "U"}
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
                <button
                  type="button"
                  onClick={handleDeleteAvatar}
                  className="w-fit md:w-fit px-2 py-2 bg-[#8A86D5] hover:bg-[#7975C9] text-white rounded-full text-[8px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={isDeleting || isLoading}
                >
                  {isDeleting ? "Menghapus..." : "Hapus Foto Profile"}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-600 mb-0.5 block">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
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
              <button
                type="submit"
                className="w-fit md:w-fit px-4 py-1.5 bg-[#8A86D5] hover:bg-[#7975C9] text-white rounded-full text-[11px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Mengupdate..." : "Ubah Profile"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
