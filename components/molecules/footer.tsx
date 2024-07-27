import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <nav className="py-8 z-10 transition-all bg-[var(--btn-light-color)] text-sm font-normal text-[var(--text-color)]">
      <div className="md:flex md:justify-between max-w-[90%] mx-auto">
        <Link href="/mance-web/home" className="grid place-content-center">
          <Image 
          width={96}
          height={32}
          src="/mancelogo.svg" alt="mance logo" className="w-24 h-8" />
        </Link>
        <div className="flex justify-between md:w-2/3 max-md:mt-8">
          <div className=" space-y-4">
            <p className="">Products</p>
            <p className="">Features & Updates</p>
          </div>
          <div className=" space-y-4">
            <p className="">About Us</p>
            <p className="">Resources</p>
          </div>
          <div className=" space-y-4">
            <p className="">Waitlist</p>
            <p className="">Socials</p>
          </div>
        </div>
      </div>
      <hr className="my-6 w-[90%] mx-auto border-1.5 border-gray-300" />
      <div className="text-center">© 2024Mance All rights reserved </div>
    </nav>
  );
}
