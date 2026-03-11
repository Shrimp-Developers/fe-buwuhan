import { useState, useRef } from "react";
import DetailUser from "./DetailUser";
import useClickOutside from "../hooks/navbar/useClickOutside";
import usePageTitle from "../hooks/navbar/usePageTitle";
import useUserProfile from "../hooks/auth/useUserProfile";

export default function Navbar({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const title = usePageTitle();

  const { previewImage, isFetching } = useUserProfile(true);

  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <>
      <header className="py-4 sm:py-5 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between z-40 relative">
        <div className="flex items-center">
          <button
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer"
            onClick={onMenuClick}
          >
            <img
              src="/icon-hamburger.png"
              alt="deskripsi icon-hamburger"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>

          <h1 className="hidden md:block text-base lg:text-lg font-bold text-[#000000]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 relative">
          <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] transition border-2 border-[#000000] cursor-pointer overflow-hidden">
            <img
              src="/icon-moon.png"
              alt="deskripsi icon-moon"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] transition border-2 border-[#000000] cursor-pointer overflow-hidden"
            >
              <img
                src={
                  !isFetching && previewImage ? previewImage : "/icon-user.png"
                }
                alt="deskripsi icon-user"
                className="w-full h-full object-cover"
              />
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
