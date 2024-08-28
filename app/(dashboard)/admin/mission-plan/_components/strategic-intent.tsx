import React, { useState } from "react";
import Comment from "./comment";
import { Button } from "@/components/ui/button";
import { StrategicIntentType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";

type Props = {
  data: StrategicIntentType[];
  approvables?: [];
  loading: boolean;
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
};

const StrategicIntent = ({ data, approvables, loading, showTextArea, setShowTextArea }: Props) => {
  const approvableTypeId = data?.map((item) => item.id as string);
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";

  const approval_type = "strategic-intent";

  const {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
    undoStatus,
  } = useApproval({
    initialComments: comments?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
  });
  return (
    <div className="flex flex-col gap-10">
      {loading && (
        <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
          <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
            Strategic Intent
          </h2>

          <div className="w-full flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin mr-1" />
          </div>
        </div>
      )}
      {!loading &&
        data?.length !== 0 &&
        data?.map((item, index) => (
          <section key={item?.id}>
            <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm text-[#162238]">
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Strategic Intent
              </h2>
              <div className="mt-2.5 ml-1.5">
                <h3 className="font-normal">- Strategic Intent {index + 1}</h3>
                <div className="flex justify-between items-end">
                  <div className="ml-3">
                    <p className="mt-2 font-light">
                      <span className="font-normal">Intent:</span>{" "}
                      {item?.intent}
                    </p>
                    <p className="mt-1 font-light">
                      <span className="font-normal">Behaviors: </span>
                      {item?.behaviours}
                    </p>
                  </div>
                  {comments?.status === "pending" && !loading ? (
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
                  ) : comments?.status === "approved" &&
                    !loading ? (
                    <div className="flex gap-2.5 mr-4">
                      <Button onClick={() => undoStatus()}>Undo Approval</Button>
                    </div>
                  ) : comments?.status === "rejected" &&
                    !loading ? (
                    <div className="flex gap-2.5 mr-4">
                      <Button onClick={() => undoStatus()}>Undo Rejection</Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <Comment
              label="Strategic intent"
              showTextArea={openCommentId === item.id}
              setShowTextArea={() => toggleComment(item.id)}
              comments={comments}
              // comments={FormikApprovalForm.values.comments}
              formik={FormikApprovalForm}
            />
          </section>
        ))}
      {!loading && data?.length === 0 && (
        <>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
            <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
              Strategic Intent
            </h2>
            <div className="mt-2.5 ml-1.5">
              <h3 className="font-normal">No Strategic Intent Found</h3>
            </div>
          </div>
          <Comment
            label="Strategic intent"
            showTextArea={false}
            setShowTextArea={() => toggleComment("3")}
            comments={comments}
            // comments={FormikApprovalForm.values.comments}
            formik={FormikApprovalForm}
          />
        </>
      )}
    </div>
  );
};

export default StrategicIntent;
