import { Link } from "react-router-dom";
import useBuwuhanUpdatePassword from "../hooks/buwuhan/useBuwuhanUpdatePassword";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";

export default function BuwuhanUpdatePassword() {
  const {
    formData,
    isLoading,
    showPasswords,
    handleChange,
    toggleShow,
    resetForm,
    handleSubmit,
  } = useBuwuhanUpdatePassword();

  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-5">
      <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 md:hidden">
        Pengaturan / Ubah Kata Sandi
      </h1>
      <div className="bg-white dark:bg-[#0D0D0D] rounded-2xl shadow-lg dark:text-white">
        <div className="space-y-6 px-10 py-6">
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard/settings"
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
            </Link>
            <h2 className="text-xl font-semibold">Ganti password</h2>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e, formData, resetForm)}
            className="space-y-6"
          >
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Kata sandi saat ini
              </label>
              <input
                type={showPasswords.oldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-500 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-xs"
                placeholder="Masukkan kata sandi lama"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => toggleShow("oldPassword")}
                className="absolute bottom-2.5 right-3 flex items-center transition"
              >
                {showPasswords.oldPassword ? (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                ) : (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Kata sandi baru
                </label>
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-500 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-xs"
                  placeholder="Minimal 6 karakter"
                  disabled={isLoading}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => toggleShow("newPassword")}
                  className="absolute bottom-2.5 right-3 flex items-center transition"
                >
                  {showPasswords.newPassword ? (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                  ) : (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Konfirmasi kata sandi
                </label>
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-500 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-black dark:text-white text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-xs"
                  placeholder="Ulangi kata sandi baru"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => toggleShow("confirmPassword")}
                  className="absolute bottom-2.5 right-3 flex items-center transition"
                >
                  {showPasswords.confirmPassword ? (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                  ) : (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-[#ACA0A0]" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-fit px-4 py-1.5 rounded-full bg-[#8A86D5] hover:bg-[#7975C9] text-white text-sm font-medium transition disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Mengubah..." : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
