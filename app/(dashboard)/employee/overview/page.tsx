"use client";
import React from "react";
// import { DashboardLayout } from "./_components/dashboard-layout";
import Link from "next/link";
import Routes from "@/lib/routes/routes";
import DashboardLayout from "../../_layout/DashboardLayout";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { MissionIcon, VisionIcon, WarningIcon } from "@/public/assets/icons";
import { ArrowRightIcon } from "lucide-react";

const OverView = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  return (
    <DashboardLayout headerTitle={`Welcome ${user?.name?.split(" ")[0]}`}>
      <div className="h-full flex flex-col overflow-y-hidden">
        <article className="bg-[var(--bg-yellow-300)] pl-6  md:pr-9 py-2.5 flex justify-between items-center w-full">
          <div className="inline-flex items-center">
            <Image src={WarningIcon} alt="warning icon" />
            <h4 className="text-[var(--text-color3)] font-medium ml-1.5">
              Complete your profile setup
            </h4>
            <Link
              href="#"
              className=" max-md:hidden text-xs font-light ml-3 underline underline-offset-1"
            >
              complete your employee profile setup
            </Link>
          </div>
          <Link
            href="#"
            className="font-medium text-sm text-[var(--primary-color)] inline-flex gap-x-1 items-center group"
          >
            Proceed
            {ArrowRight}
          </Link>
        </article>
        <div className="flex-1 relative">
          <div className="h-full w-full mr-[360px] absolute custom-scrollbar">
            Main content
          </div>
          <div className="bg-[var(--btn-solid-color)] absolute right-0 w-[360px] h-full z-10 custom-scrollbar px-5 py-8">
            {/* Mission and Vision Statement */}
            <section className="custom-shadow rounded w-full px-3 py-6 space-y-7">
              <div className="flex space-x-2.5">
                <Image
                  src={MissionIcon}
                  alt="Mission statement icon"
                  className="size-6"
                />
                <div className="space-y-2">
                  <h4 className="font-medium text-[var(--text-color5)]">
                    Mission Statement
                  </h4>
                  <p className="text-[var(--text-color2)] text-xs">
                    {user?.organization?.mission}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2.5">
                <Image
                  src={VisionIcon}
                  alt="Vision statement icon"
                  className="size-6"
                />
                <div className="space-y-2">
                  <h4 className="font-medium text-[var(--text-color5)]">
                    Vision Statement
                  </h4>
                  <p className="text-[var(--text-color2)] text-xs">
                    {user?.organization?.vision}
                  </p>
                </div>
              </div>
            </section>

            {/* Todo Action */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OverView;

const ArrowRight = (
  <svg
    width="24"
    height="24"
    className="group-hover:translate-x-1 transition-all ease-linear"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 11.75C4.5 11.4278 4.73949 11.1614 5.05021 11.1193L5.13659 11.1134H17.8684C18.22 11.1134 18.505 11.3985 18.505 11.75C18.505 12.0723 18.2655 12.3387 17.9548 12.3808L17.8684 12.3866H5.13659C4.78501 12.3866 4.5 12.1016 4.5 11.75Z"
      fill="currentColor"
    />
    <path
      d="M12.2851 7.0877C12.0359 6.83963 12.0351 6.43656 12.2831 6.18742C12.5087 5.96093 12.8623 5.93963 13.1119 6.124L13.1834 6.18548L18.3186 11.2986C18.5458 11.5248 18.5664 11.8797 18.3806 12.1293L18.3186 12.2008L13.1835 17.3147C12.9343 17.5628 12.5313 17.562 12.2832 17.3129C12.0576 17.0864 12.0378 16.7327 12.2233 16.4839L12.285 16.4126L16.967 11.7494L12.2851 7.0877Z"
      fill="currentColor"
    />
  </svg>
);
