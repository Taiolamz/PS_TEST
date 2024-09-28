import BadgeComponent from "@/components/badge/BadgeComponents";
import CustomDrawer, { CustomDrawerProp } from "@/components/custom-drawer";
import { PageLoader } from "@/components/custom-loader";
import React from "react";
import { LottieAnimation } from "../fragment";
import { LottieEmptyState } from "@/lottie";
import Image from "next/image";

export type APPROVAL_DATA_TYPE = {
  id: string;
  step: number;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

interface ApprovalDrawerProp extends CustomDrawerProp {
  id?: string;
  loading?: boolean;
  data: APPROVAL_DATA_TYPE[];
}

export default function ApprovalDrawer({
  open,
  onClose,
  loading,
  data,
}: ApprovalDrawerProp) {
  // Sorting steps in descending order
  const sortedApprovalSteps = [...data].sort((a, b) => b.step - a.step);
  return (
    <CustomDrawer title="Approval Status" open={open} onClose={onClose}>
      <div className="h-[calc(100vh-66px)] grid overflow-y-auto pt-5">
        {loading ? (
          <div className="place-content-center">
            <PageLoader />
          </div>
        ) : data?.length ? (
          sortedApprovalSteps.map((item, index) => (
            <div
              key={index}
              className={`${
                item.status === "pending"
                  ? "bg-white border-[var(--primary-color)]"
                  : "bg-[#fafdff] border-[#E5E9EB]"
              } p-4 border-2 rounded-lg flex justify-between items-center relative`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={
                    item.status === "pending"
                      ? "/svgs/currApprovalStatus.svg"
                      : "/svgs/approvalStatus.svg"
                  }
                  width={23}
                  height={23}
                  alt="approval status"
                />
                <div>
                  <p className="text-sm font-semibold capitalize">
                    {item.user.name}
                  </p>
                  <p className="text-xs font-light text-[#6E7C87]">
                    {item.user.role}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {item.status === "approved" ? (
                    <span className="text-green-500 py-2 px-3 rounded-lg border border-green-500">
                      Approved
                    </span>
                  ) : item.status === "pending" ? (
                    <span className="text-yellow-500 bg-[#eef8f4] py-2 px-3 rounded-lg border border-yellow-500">
                      In Review
                    </span>
                  ) : item.status === "pending" ? (
                    <span className="text-red-500 bg-[#fffcf6] py-2 px-3 rounded-lg border border-red-500">
                      Rejected
                    </span>
                  ) : (
                    <span className="text-[#9AA6AC] bg-[#f5f9fb] py-2 px-3 rounded-lg border border-[#9AA6AC]">
                      Yet to Review
                    </span>
                  )}
                </p>
              </div>
              <div
                className={`${
                  sortedApprovalSteps?.length - 1 === index ? "hidden" : ""
                } bg-[#E5E9EB] h-8 w-[2px] absolute -bottom-2 left-[50%] -translate-x-[100%] translate-y-[100%]`}
              ></div>
            </div>
          ))
        ) : (
          <div className="overflow-hidden place-content-center">
            <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
          </div>
        )}
      </div>
    </CustomDrawer>
  );
}
