import { useState, useRef } from "react";
import { MoonIcon, SunIcon, CircleUser, Menu } from "lucide-react";
import DetailUser from "./DetailUser";
import useClickOutside from "../hooks/navbar/useClickOutside";
import usePageTitle from "../hooks/navbar/usePageTitle";
import useUserProfile from "../hooks/auth/useUserProfile";
import useTheme from "../hooks/theme/useTheme";

export default function Navbar({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const title = usePageTitle();

  const { theme, toggleTheme } = useTheme();
  const { previewImage, isFetching } = useUserProfile(true);

  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <>
      <header className="py-4 sm:py-5 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between z-40 relative">
        <div className="flex items-center">
          <button
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-[#ffffff]" />
          </button>

          <h1 className="hidden md:block text-base lg:text-lg font-bold text-[#000000] dark:text-[#ffffff]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 relative">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] dark:bg-[#1C1D26] transition border-2 border-[#000000] dark:border-[#ffffff] cursor-pointer overflow-hidden"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-[#ffffff]" />
            ) : (
              <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            )}
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] dark:bg-[#1C1D26] transition border-2 border-[#000000] dark:border-[#ffffff] cursor-pointer overflow-hidden"
            >
              {!isFetching && previewImage ? (
                <img
                  src={previewImage}
                  alt="deskripsi icon-user"
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUser className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-[#ffffff]" />
              )}
            </button>

            {isProfileOpen && (
              <DetailUser
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
