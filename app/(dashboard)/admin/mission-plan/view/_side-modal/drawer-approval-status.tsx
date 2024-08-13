import { ReusableDrawer } from "@/components/fragment";
import { useLazyEmployeeMissionPlanApprovalStepsQuery } from "@/redux/services/mission-plan/missionPlanApprovalStep";
import Image from "next/image";
import React, { useEffect } from "react";

export default function DrawerApprovalStatus({
  show,
  handleClose,
  userId,
}: {
  show: boolean;
  handleClose: () => void;
  userId: string;
}) {
  const approvalSttus = [
    {
      employeeName: "Tobi Oluwa",
      role: "Managing Director",
      status: "static",
    },
    {
      employeeName: "Tobi Oluwa",
      role: "Managing Director",
      status: "Pending",
    },
    {
      employeeName: "Tobi Oluwa",
      role: "Managing Director",
      status: "Approved",
    },
    {
      employeeName: "Tobi Oluwa",
      role: "Managing Director",
      status: "Approved",
    },
  ]
console.log(userId)
  const [getApprovalSteps] = useLazyEmployeeMissionPlanApprovalStepsQuery();
  useEffect(() => {
    getApprovalSteps('01j562kwcmbwxwbtwzk180xqmy').unwrap().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    })
  }, [userId]);
  return (
    <ReusableDrawer
      title="Approval Status"
      show={show}
      handleClose={handleClose}
      closeOnClickOutside={false}
    >
      <section className="border-t border-[#E5E9EB] pt-5">
        <div className="flex flex-col space-y-11 w-[90%] mx-auto">
          {approvalSttus.map((item, index) => (
            <div
              key={index}
              className={`${item.status === "Pending" ? "bg-white border-[var(--primary-color)]" : "bg-[#fafdff] border-[#E5E9EB]"} p-4 border-2 rounded-lg flex justify-between items-center relative`}
            >
              <div className="flex items-center gap-2">
                <Image src={item.status === "Pending" ? "/svgs/currApprovalStatus.svg" : "/svgs/approvalStatus.svg"} width={23} height={23} alt="approval status" />
                <div>
                <p className="text-sm font-semibold">{item.employeeName}</p>
                <p className="text-xs font-light text-[#6E7C87]">{item.role}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {item.status === "Approved" ? (
                    <span className="text-green-500 py-2 px-3 rounded-lg border border-green-500">Approved</span>
                  ) : item.status === "Pending" ? (
                    <span className="text-yellow-500 bg-[#eef8f4] py-2 px-3 rounded-lg border border-yellow-500">In Review</span>
                  ) :  item.status === "Pending" ? (
                    <span className="text-red-500 bg-[#fffcf6] py-2 px-3 rounded-lg border border-red-500">Rejected</span>
                  ) : (
                    <span className="text-[#9AA6AC] bg-[#f5f9fb] py-2 px-3 rounded-lg border border-[#9AA6AC]">Yet to Review</span>
                  )}
                </p>
              </div>
              <div className={`${(approvalSttus.length - 1) === index ? "hidden" : ""} bg-[#E5E9EB] h-8 w-[2px] absolute -bottom-2 left-[50%] -translate-x-[100%] translate-y-[100%]`}></div>
            </div>
          ))}
        </div>
      </section>
    </ReusableDrawer>
  );
}
