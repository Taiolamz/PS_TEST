import { Button } from "@/components/ui/button";
import React from "react";
import Comment from "./comment";
import { BoundariesType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: BoundariesType[];
  approvables?: [];
  loading: boolean;
};

const FreedomConstraint = ({
  setShowTextArea,
  showTextArea,
  data,
  approvables,
  loading,
}: Props) => {
  const approvableTypeId = data?.map((item) => item.id as string);
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";
  const approval_type = "boundary";

  const { handleReject, handleApprove, FormikApprovalForm, undoStatus } = useApproval({
    initialComments: comments?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
  });
  console.log(comments);
  return (
    <section>
      {loading && (
        <>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
            <div className="pb-5">
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Freedoms
              </h2>

              <div className="w-full flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-1" />
              </div>
            </div>

            <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
              Constraints
            </h2>

            <div className="w-full flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin mr-1" />
            </div>
          </div>
        </>
      )}
      {!loading && data[0]?.freedoms.length !== 0 && (
        <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
          <div className=" flex justify-between items-end">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                  Freedom{" "}
                </h2>
                <div className="mt-2">
                  {data[0]?.freedoms?.map((freedom) => (
                    <h3
                      className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5"
                      key={freedom}
                    >
                      <span>-</span> {freedom}
                    </h3>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                  Constraints
                </h2>
                <div className="mt-2">
                  {data[0]?.constraints?.map((item) => (
                    <h3
                      className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5"
                      key={item}
                    >
                      <span>-</span> {item}
                    </h3>
                  ))}
                </div>
              </div>
            </div>
            {comments?.status === "pending" && !loading && data[0]?.freedoms  !== null ? (
              <div className="flex gap-2.5  items-end">
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
              !loading &&
              data[0]?.freedoms !== null ? (
              <div className="flex gap-2.5 mr-4">
                <Button onClick={() => undoStatus()}>Undo Approval</Button>
              </div>
            ) : comments?.status === "rejected" &&
              !loading &&
              data[0]?.freedoms !== null ? (
              <div className="flex gap-2.5 mr-4">
                <Button onClick={() => undoStatus()}>Undo Rejection</Button>
              </div>
            ) : (
              ""
            )}
            {/* <div className="flex gap-2.5 items-end">
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
            </div> */}
          </div>
        </div>
      )}
      {loading && data[0]?.freedoms?.length === 0 && (
        <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
          <div className="mb-5">
            <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
              Freedoms
            </h2>
            <div className="mt-2.5 ml-1.5 w-full text-center">
              <h3 className="font-normal">No Data found Found</h3>
            </div>
          </div>
          <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
            Constraints
          </h2>
          <div className="mt-2.5 ml-1.5 w-full text-center">
            <h3 className="font-normal">No Data found Found</h3>
          </div>
        </div>
      )}
      <Comment
        label="freedom & constraints"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={comments}
        formik={FormikApprovalForm}
      />
    </section>
  );
};

export default FreedomConstraint;
