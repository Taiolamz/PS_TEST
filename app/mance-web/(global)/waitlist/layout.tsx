"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GlobalLayout({ children } : {
  children: React.ReactNode;
}) {


  return (
    <main className="w-screen h-screen flex flex-col">
      <nav className="py-4 z-10 md:shadow fixed left-0 right-0 top-0">
        <div className="md:flex max-w-[90%] mx-auto">
          <Link href="/mance-web/home" className="grid place-content-center">
            <Image 
            width={200}
            height={50}
             src="/mancelogo.svg" alt="mance logo" className=" w-20" />
          </Link>
        </div>
      </nav>

      <section className="w-full h-full mt-[52px] flex overflow-x-hidden bg-gray-50">
        <div
          className="w-[45%] hidden md:block bg-[var(--btn-light-color)]"
          data-aos="fade-right"
          data-aos-offset="300"
        >
          <div className="h-full flex flex-col items-center justify-between py-8">
            <div className="mt-12 flex flex-col w-[75%] space-y-7">
              {/* From who and message */}
              <div className="space-y-4 text-center">
                <span className=" text-[var(--btn-color)] font-normal text-[13px]">
                  Message from the CPO
                </span>
                <h3 className=" font-medium text-2xl text-[var(--text-color3)]">
                  <q>
                    Transforming and maintaining the employee’s performance
                    ratio has been our top priority
                  </q>
                </h3>
              </div>
              {/* Owner name and avatar */}
              <div className="inline-flex items-center justify-center gap-x-[15px]">
                <span className="">
                  <Image
                  width={50}
                  height={50}
                   src="/assets-website/svg/avatar.svg" alt="avatar" className="size-9" />
                </span>
                <span className="font-medium text-base text-[var(--text-color)]">
                  Olusegun Dada
                </span>
              </div>
            </div>
            <span className=" font-normal text-xs text-[var(--text-color2)]">
              © 2024 Monetize. All rights reserved
            </span>
          </div>
        </div>
        <div
          className="w-full md:w-[55%] h-full overflow-y-auto bg-white"
          data-aos="fade-left"
          data-aos-offset="300"
        >
          {children}
        </div>
      </section>
    </main>
  );
}
