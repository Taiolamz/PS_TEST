import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface EditRefType {
  pathname: string;
  query?: Record<string, string | number>;
}

const OrgDetailInfo = ({
  organization,
  headName,
  deptEmail,
  headOrgEmail,
  address,
  state,
  country,
  headerTitle,
  editRef,
  onDeactivate,
}: {
  organization?: string;
  headName?: string;
  deptEmail?: string;
  headOrgEmail?: string;
  address?: string;
  state?: string;
  country?: string;
  headerTitle?: string;
  editRef: string | EditRefType;
  onDeactivate?: () => void;
}) => {
  const rowClass = "flex flex-col gap-3 w-[400px]";
  const colClass = "grid grid-cols-[1fr_1fr] ";
  const rightColClass = "grid grid-cols-[.3fr_1fr] ";
  const headerClass = "text-[#6E7C87] text-[13px]";
  const contentClass = "text-[#3E4345] text-[13px] w-full";

  return (
    <div className="flex flex-col ">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <p className="text-[#162238] font-semibold text-xl">
          {headerTitle || "People & Culture"}
        </p>
        <div className="flex gap-3 items-center">
          <Link href={editRef}>
            <Button
              variant="outline"
              className="border border-primary rounded-[4px] font-medium text-primary text-sm bg-transparent px-4 py-1"
            >
              Edit
            </Button>
          </Link>
          <Button
            onClick={onDeactivate}
            className="border border-[#EC1410] rounded-[4px] font-medium text-[#EC1410] text-sm bg-transparent px-4 py-1"
          >
            Deactivate
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-[1fr_1.5fr] w-full mt-5 gap-10">
        {" "}
        {/* Left Column */}
        <div className={rowClass}>
          <div className={colClass}>
            <p className={headerClass}>{`Head of ${
              organization || "Department"
            }`}</p>
            <p className={contentClass}>{headName || "Hassan Lamidi"}</p>
          </div>
          <div className={colClass}>
            <p className={headerClass}>{`${
              organization || "Department"
            } Email`}</p>
            <p className={contentClass}>
              {deptEmail || "hlamidi@zojatech.com"}
            </p>
          </div>
          <div className={colClass}>
            <p className={headerClass}>{`Head of ${
              organization || "Department"
            } Email`}</p>
            <p className={contentClass}>
              {headOrgEmail || "hlamidi@ithorizons.com"}
            </p>
          </div>
        </div>
        {/* Right Column */}
        <div className={`${rowClass}`}>
          <div className={rightColClass}>
            <p className={headerClass}>Address</p>
            <p className={contentClass}>
              {address || "9b, Akin Ogunmade Gbagada"}
            </p>
          </div>
          <div className={rightColClass}>
            <p className={headerClass}>State</p>
            <p className={contentClass}>{state || "Lagos"}</p>
          </div>
          <div className={rightColClass}>
            <p className={headerClass}>Country</p>
            <p className={contentClass}>{country || "Nigeria"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgDetailInfo;
