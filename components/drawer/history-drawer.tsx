"use client";
import CustomDrawer, { CustomDrawerProp } from "@/components/custom-drawer";
import { PageLoader } from "@/components/custom-loader";
import React from "react";
import { LottieAnimation } from "../fragment";
import { LottieEmptyState } from "@/lottie";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { SearchIcon } from "@/public/assets/icons";
import { cn } from "@/lib/utils";

interface HistoryCardProps {
  month: string;
  status: string;
  title: string;
  percentage: string;
  target: string;
  achievement: string;
}

interface HistoryDrawerProp extends CustomDrawerProp {
  id?: string;
  loading?: boolean;
  data: HistoryCardProps[];
}

export default function HistoryDrawer({
  open,
  onClose,
  id,
  loading,
  data,
}: HistoryDrawerProp) {
  return (
    <CustomDrawer title="Outcome History" open={open} onClose={onClose}>
      <div className="sr-only">This is the id to fetch this challenge {id}</div>
      <div className="h-[calc(100vh-66px)] grid overflow-y-auto">
        {loading ? (
          <div className="place-content-center">
            <PageLoader />
          </div>
        ) : data?.length ? (
          <div className="mx-3 my-5">
            <div className="relative mb-4">
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                // value={searchVal}
                // onChange={onSearchChange}
                onChange={() => {}}
                className="border-custom-divider bg-white flex-1 placeholder:text-custom-gray-scale-300 font-normal text-xs border rounded-[6px] text-custom-dark-blue"
              />
              <Image
                src={SearchIcon}
                alt="search"
                className="absolute right-0 mr-4 top-3"
              />
            </div>
            <div className="grid gap-y-3 m">
              {data?.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-[#E5E9EB] rounded-[5px] p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-x-2">
                      <p className="#252C32 font-medium text-sm">
                        {item?.month}
                      </p>
                      <p
                        className={cn(
                          "text-[8px]",
                          item?.status?.toLowerCase() === "rejected" &&
                            "text-[var(--bg-red-100)] ",
                          item?.status?.toLowerCase() === "pending"
                            ? "text-[var(--bg-yellow-400)] "
                            : "text-[rgb(var(--bg-green-100))] ",
                          "font-medium"
                        )}
                      >
                        {item?.status}
                      </p>
                    </div>
                    <p
                      className={cn(
                        Number(item?.percentage) <= 39 &&
                          "text-[var(--bg-red-100)] ",
                        Number(item?.percentage) >= 40 &&
                          Number(item?.percentage) <= 69 &&
                          "text-[var(--bg-yellow-400)] ",
                        Number(item?.percentage) >= 70 &&
                          "text-[rgb(var(--bg-green-100))] ",
                        "font-medium"
                      )}
                    >
                      {item?.percentage}%
                    </p>
                  </div>
                  <div>
                    <p className="mb-3 text-[#9AA6AC] text-xs">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[#6E7C87] text-xs font-bold">
                        {item.target}
                      </p>
                      <p className="text-[#008080] text-xs font-bold">
                        {" "}
                        {item?.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden place-content-center">
            <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
          </div>
        )}
      </div>
    </CustomDrawer>
  );
}

const progressRange = [
  {
    color: "#EC1410",
    value: "0% - 35%",
  },
  {
    color: "#FFC043",
    value: "40% - 65%",
  },
  {
    color: "#07A287",
    value: "70% - 100%",
  },
];
