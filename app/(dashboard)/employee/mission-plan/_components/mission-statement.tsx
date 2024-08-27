import { Button } from "@/components/ui/button";
import React from "react";
import Comment from "./comment";
import { MissionStatementType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data?: MissionStatementType;
  approvables?: [];
  setApprovalTypeId: (e: string) => void;
  loading: boolean;
};
const MissionStatement = ({
  setShowTextArea,
  showTextArea,
  data,
  approvables,
  setApprovalTypeId,
  loading,
}: Props) => {
  const approvableTypeId = data?.id;
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";
  const approval_type = "mission-statement";

  const { handleReject, handleApprove, FormikApprovalForm } = useApproval({
    initialComments: comments?.comment,
    initialActionType,
    missionplanid,
    approval_type,
  });

  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
          Mission Statement
        </h2>
        <div className="flex justify-between items-end w-full">
          {loading && (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin mr-1" />
            </div>
          )}
          {!loading && (
            <p className="w-[52%] text-[#162238] text-sm">
              {data?.mission ?? "No Mission Statement"}
            </p>
          )}
          {!loading && data?.mission !== null && (
            <div className="flex gap-2.5 mr-4">
              <Button
                variant="outline"
                className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                onClick={() => {
                  setShowTextArea(true);
                  handleReject();
                }}
              >
                Reject
              </Button>
              <Button onClick={() => handleApprove()}>Approve</Button>
            </div>
          )}
        </div>
      </div>
      {showTextArea && (
        <Comment
          label="Mission statement"
          showTextArea={showTextArea}
          setShowTextArea={setShowTextArea}
          comments={comments}
          formik={FormikApprovalForm}
        />
      )}
    </section>
  );
};

export default MissionStatement;
