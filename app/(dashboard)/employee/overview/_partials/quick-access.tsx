import {
  AnnouncementIcon,
  CreateListIcon,
  HelpIcon,
} from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function QuickAccess() {
  return (
    <section className="mt-9">
      <h3 className="text-[var(--footer-link-color)] font-medium text-lg mb-2.5">
        Quick Access
      </h3>
      <section className="bg-white rounded-lg px-[15px] py-[23px] flex flex-wrap lg:flex-nowrap gap-3 overflow-x-auto customScrollbar">
        <Link
          href={"#"}
          className="border border-[#eef0f2] min-w-[180px] w-full px-2.5 py-3.5 text-sm rounded-lg inline-flex gap-x-1 items-center text-[var(--text-color4)] font-medium shadow-sm"
        >
          <Image
            className="size-11"
            src={AnnouncementIcon}
            alt="announcement icon"
          />
          View Announcement
        </Link>
        <Link
          href={"#"}
          className="border border-[#eef0f2] min-w-[180px] w-full px-2.5 py-3.5 text-sm rounded-lg inline-flex gap-x-1 items-center text-[var(--text-color4)] font-medium shadow-sm"
        >
          <Image
            className="size-11"
            src={CreateListIcon}
            alt="create todo icon"
          />
          Create To Do
        </Link>
        <Link
          href={"#"}
          className="border border-[#eef0f2] min-w-[180px] w-full px-2.5 py-3.5 text-sm rounded-lg inline-flex gap-x-1 items-center text-[var(--text-color4)] font-medium shadow-sm"
        >
          <Image className="size-11" src={HelpIcon} alt="help icon" />
          Help
        </Link>
      </section>
    </section>
  );
}
