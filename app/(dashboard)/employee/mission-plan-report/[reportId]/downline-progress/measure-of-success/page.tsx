"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function EmployeeMOSProgress({
  params,
}: {
  params: { reportId: string };
}) {
  const router = useRouter();
  return (
    <DashboardLayout headerTitle="Welcome Hassan!">
      <div className="flex gap-3.5 bg-[#F6F8F9] items-center py-2 pl-8">
        <div
          className="flex gap-2 items-center cursor-pointer group"
          onClick={() => router.back()}
        >
          <figure className="group-hover:-translate-x-1 transition-all duration-300">
            {backIcon}
          </figure>
          <p className="text-xs text-[#6E7C87]">Back</p>
        </div>
        <p className="text-[#3E4345] font-semibold text-lsm">
          Measure of Success Percentage Achieved
        </p>
      </div>
      <div>mos details</div>
    </DashboardLayout>
  );
}

const backIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.52993 7.71985C4.67038 7.86047 4.74927 8.0511 4.74927 8.24985C4.74927 8.4486 4.67038 8.63922 4.52993 8.77985C4.3893 8.9203 4.19868 8.99919 3.99993 8.99919C3.80118 8.99919 3.61055 8.9203 3.46993 8.77985L0.219927 5.52985C0.0794764 5.38922 0.000587463 5.1986 0.000587463 4.99985C0.000587463 4.8011 0.0794764 4.61047 0.219927 4.46985L3.46993 1.21985C3.6121 1.08737 3.80015 1.01524 3.99445 1.01867C4.18875 1.0221 4.37414 1.10081 4.51155 1.23822C4.64896 1.37564 4.72767 1.56102 4.7311 1.75532C4.73453 1.94963 4.66241 2.13767 4.52993 2.27985L1.80993 4.99985L4.52993 7.71985ZM4.46993 5.52985L8.71993 9.77985C8.86055 9.9203 9.05118 9.99919 9.24993 9.99919C9.44868 9.99919 9.6393 9.9203 9.77993 9.77985C9.92038 9.63922 9.99927 9.4486 9.99927 9.24985C9.99927 9.0511 9.92038 8.86047 9.77993 8.71985L6.05993 4.99985L9.77993 1.27985C9.91241 1.13767 9.98453 0.949625 9.9811 0.755324C9.97767 0.561023 9.89896 0.375638 9.76155 0.238225C9.62414 0.100812 9.43875 0.0220998 9.24445 0.0186715C9.05015 0.0152433 8.8621 0.0873663 8.71993 0.219846L4.46993 4.46985C4.32948 4.61047 4.25059 4.8011 4.25059 4.99985C4.25059 5.1986 4.32948 5.38922 4.46993 5.52985Z"
      fill="#6E7C87"
    />
  </svg>
);
