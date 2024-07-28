import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function MissionAllTab({ activeTab }: { activeTab: string }) {
  const notactive =
    "bg-transparent hover:bg-transparent text-custom-gray-scale-300 shadow-none";

  const active =
    "bg-[var(--bg-primary-05)] hover:bg-[var(--bg-primary-05)] text-primary  shadow-none";
  return (
    <div className="border rounded-[5px] px-[7px] py-[3px] w-fit space-x-4 text-sm">
      <Link href="missionplan">
        <Button
          className={`h-8 px-[18px] py-2 text-sm rounded-[5px] ${
            activeTab !== "allemployee" ? active : notactive
          }`}
        >
          Mission Plan
        </Button>
      </Link>
      <Link href="allemployee">
        <Button
          className={`h-8 px-[18px] py-2 text-sm rounded-[5px] ${
            activeTab === "allemployee" ? active : notactive
          }`}
        >
          All Employees
        </Button>
      </Link>
    </div>
  );
}
