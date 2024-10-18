import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RecentActivity() {
  return (
    <section className="mt-9">
      <header className="flex justify-between items-center">
        <h3 className="text-[var(--footer-link-color)] font-medium text-lg mb-2.5">
          Recent Activity
        </h3>
        <Link
          href={"#"}
          className="inline-flex items-center text-[var(--primary-color)] text-[13px] h-fit"
        >
          See all <ChevronRightIcon className="size-4" />
        </Link>
      </header>
      <section className="bg-white rounded-sm px-[15px] py-4 ">
        <div className="text-[var(--text-color2)] min-h-28 grid place-content-center text-center w-full">
          You have no recent activity
        </div>
      </section>
    </section>
  );
}
