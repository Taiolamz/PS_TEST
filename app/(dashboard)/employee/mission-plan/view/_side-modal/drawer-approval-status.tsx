import { ApprovalSteps } from "@/@types/missionPlan";
import {  PageLoader } from "@/components/custom-loader";
import { ReusableDrawer } from "@/components/fragment";
import { useLazyEmployeeMissionPlanApprovalStepsQuery } from "@/redux/services/mission-plan/missionPlanApprovalStep";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function DrawerApprovalStatus({
  show,
  handleClose,
  userId,
}: {
  show: boolean;
  handleClose: () => void;
  userId: string;
}) {
  const [approvalSteps, setApprovalSteps] = useState<ApprovalSteps[]>([]);
  const [loading, setLoading] = useState(false);
  const [getApprovalSteps] = useLazyEmployeeMissionPlanApprovalStepsQuery();

  useEffect(() => {
    setLoading(true);
    getApprovalSteps(userId).unwrap().then((res) => {
      setApprovalSteps(res.data);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      console.error(err);
    })
  }, [userId, getApprovalSteps]);


  // Sorting steps in descending order
  const sortedApprovalSteps = [...approvalSteps].sort((a, b) => b.step - a.step);

  return (
    <ReusableDrawer
      title="Approval Status"
      show={show}
      handleClose={handleClose}
      closeOnClickOutside={false}
    >
      <section className="border-t w-full h-[90.5vh] border-[#E5E9EB] pt-5">
        <div className="flex flex-col h-full space-y-11 w-[90%] mx-auto">
          {loading ? (
            <div className="place-content-center items-center h-full">
              <PageLoader />
            </div>
          ) : approvalSteps.length === 0 ? (
            <div className="text-center place-content-center items-center h-full mt-16">
              <p className="text-custom-gray-scale-400 font-medium text-sm">
                No Approval Status Found
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </section>
    </ReusableDrawer>
  );
}
