import { useState, useRef } from "react";
import DetailUser from "./DetailUser";
import useClickOutside from "../hooks/navbar/useClickOutside";
import usePageTitle from "../hooks/navbar/usePageTitle";

export default function Navbar({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const title = usePageTitle();

  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <>
      <header className="py-4 sm:py-5 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between z-40 relative">
        <div className="flex items-center">
          <button
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
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
          <button
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] hover:bg-gray-200 transition border-2 border-[#000000]"
          >
            <img
              src="/icon-search.png"
              alt="deskripsi icon-search"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>

          <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#E8E9EE] hover:bg-gray-200 transition border-2 border-[#000000] cursor-pointer">
            <img
              src="/icon-moon.png"
              alt="deskripsi icon-moon"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition cursor-pointer"
            >
              <img
                src="/icon-user.png"
                alt="deskripsi icon-user"
                className="w-8 h-8 sm:w-8 sm:h-8"
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
