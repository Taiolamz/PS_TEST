import React from "react";
import Link from "next/link";

const prevPath = "/employee/mission-plan/";

export default function FreedomConstraints() {
  return (
    <div className="w-full">
      <p>FreedomConstraints</p>

      <div className="mt-[30px]">
        <Link
          href={`${prevPath}/approval-flow`}
          className="bg-primary text-white text-xs px-[20px] py-[5px] rounded-sm"
        >
          Save and Continue
        </Link>
      </div>
    </div>
  );
}