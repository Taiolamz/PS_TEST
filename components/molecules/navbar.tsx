"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import PrimaryButton from "../atoms/primary-btn";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [top, setTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 80 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);
  return (
    <nav
      className={`py-4 z-10 top-0 left-0 right-0 sticky transition-all bg-gray-50 ${!top && `shadow`
        }`}
    >
      <div className="flex justify-between max-w-[90%] mx-auto">
        <Link href="/mance-web/" className="grid place-content-center">
          <Image src="/mancelogo.svg" width={96} height={32} alt="mance logo" className=" w-24 h-8" />
        </Link>

        <div className="hidden md:block text-[var(--text-color)]">
          <ul className="flex space-x-4 text-sm font-normal">
            <li className="px-3 py-2">
              <ScrollLink
                to="why"
                spy
                smooth
                duration={500}
                className="cursor-pointer flex gap-1 items-center"
              >
                <div>Why Mance</div>
                <span>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.49707 11L12.4971 15L16.4971 11"
                      stroke="#6E7C87"
                    />
                  </svg>
                </span>
              </ScrollLink>
            </li>
            <li className="px-3 py-2">
              <Link href="#" className="flex gap-1 items-center">
                <div>Resources</div>
                <span>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.49707 11L12.4971 15L16.4971 11"
                      stroke="#6E7C87"
                    />
                  </svg>
                </span>
              </Link>
            </li>
            <li className="px-3 grid place-content-center">
              <Link href="#" className="">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div className="place-content-center hidden md:block">
          <Link href="/login" className="px-4 py-1.5 transition-all ease-linear bg-[var(--btn-color)] hover:bg-[var(--btn-hover-backgroundColor)] text-white text-sm font-medium rounded-md">
            Log in
          </Link>
        </div>
        {/* Mobile level */}
        <div onClick={toggleDrawer} className=" md:hidden">
          <HiOutlineMenuAlt3 className="size-7 text-gray-700" />
        </div>
      </div>
      {/* {createPortal(
      <SideBar isOpen={isOpen} toggleDrawer={toggleDrawer} />,
      document.body
    )} */}
    </nav>
  )
}
