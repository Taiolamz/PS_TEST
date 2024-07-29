"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const notactive =
  "bg-transparent hover:bg-transparent text-custom-gray-scale-300 shadow-none";

const active =
  "bg-[var(--bg-primary-05)] hover:bg-[var(--bg-primary-05)] text-primary  shadow-none";

export default function MissionAllTabUI() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ui = searchParams.get("ui");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="border rounded-[5px] px-[7px] py-[3px] w-fit space-x-4 text-sm">
      <Button
        onClick={() => {
          router.push(pathname + "?" + createQueryString("ui", "mission-plan"));
        }}
        className={`h-8 px-[18px] py-2 text-sm rounded-[5px] ${
          ui === "mission-plan" || ui !== "all-employee" ? active : notactive
        }`}
      >
        Mission Plan
      </Button>
      <Button
        className={`h-8 px-[18px] py-2 text-sm rounded-[5px] ${
          ui === "all-employee" ? active : notactive
        }`}
        onClick={() => {
          router.push(pathname + "?" + createQueryString("ui", "all-employee"));
        }}
      >
        All Employees
      </Button>
    </div>
  );
}
