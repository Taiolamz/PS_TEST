import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Comment from "./comment";
import { formatToReadableDateShort } from "@/utils/helpers/date-formatter";
import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";
import { EditableLabel } from "@/components/fragment";

type Props = {
  data: SpecifiedTasksType[];
  approvables?: [];
  loading: boolean;
  isEditable?: boolean;
  bg?: string;
  setDrawerUserId?: (e: string) => void;
  setComponentType?: (e: string) => void;
  setOpenDrawer?: (e: boolean) => void;
};

const SpecifiedTasksDropDown = ({
  data,
  approvables,
  loading,
  isEditable,
  bg,
  setDrawerUserId,
  setOpenDrawer,
  setComponentType,
}: Props) => {
  const approvableTypeId = data?.map((item) => item.id as string);
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";

  const approval_type = "specified-task";

  const {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
  } = useApproval({
    initialComments: comments?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
  });

  const [expandedTaskIndex, setExpandedTaskIndex] = useState<number | null>(
    null
  );

  const { primaryColorHexValue } = React.useContext(ActionContext);
  const colorWithAlpha = primaryColorHexValue
    ? addAlphaToHex(primaryColorHexValue, 0.05)
    : "";

  const toggleShowMore = (index: number) => {
    setExpandedTaskIndex(expandedTaskIndex === index ? null : index);
  };

  return (
    <div className={`flex flex-col gap-10 `}>
      {loading && (
        <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
          <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
            Specified Task
          </h2>

          <div className="w-full flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin mr-1" />
          </div>
        </div>
      )}
      <div>
        {!loading &&
          data?.length !== 0 &&
          data?.map((item, index) => (
            <section key={item?.id}>
              <div
                className={`rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm ${bg}`}
              >
                <div className="flex justify-between items-center mb-[1.4375rem] text-[var(--primary-color)] text-sm">
                  <h4>Specified Task {index + 1}</h4>
                  <div className="flex justify-between items-end gap-[20px]">
                    <div className="flex gap-[3.125rem] items-center">
                      <div className="flex gap-2.5 items-end">
                        {isEditable && (
                          <>
                            <Button
                              variant="outline"
                              className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                              onClick={() => handleReject(item.id)}
                            >
                              Reject
                            </Button>
                            <Button onClick={() => handleApprove()}>
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {expandedTaskIndex === index ? (
                      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full border-[#1E1E1E]  shadow-sm">
                        <ChevronUp
                          className="text-[var(--primary-color)] cursor-pointer"
                          onClick={() => toggleShowMore(index)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full border-[#1E1E1E]  shadow-sm">
                        <ChevronDown
                          className="text-[var(--primary-color)] cursor-pointer"
                          onClick={() => toggleShowMore(index)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-[1.095rem] text-[#1E1E1E] text-sm">
                  {item?.task}
                </h3>
                <div className="mt-5 ml-1.5"></div>
                {expandedTaskIndex === index && (
                  <div className="transition-all duration-500 ease-in-out">
                    <hr className="my-[1.4375rem]" />
                    <div>
                      <div className="flex justify-between">
                        <div className="flex gap-4 items-center text-wrap">
                          <p className="text-[#6E7C87] font-medium">
                            Measures of success
                          </p>
                          {item?.success_measures?.map((item) => (
                            <p
                              className="p-2 rounded-[0.625rem] text-[#6B51DF] bg-[#FCF0FF80] text-xs font-bold"
                              key={item?.id}
                            >
                              {item?.measure}
                            </p>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <p>Specified Task Weight</p>
                          <p className="text-base fot-bold text-[#015858]">
                            {item.weight
                              ? `${Math.round(parseInt(item?.weight))}%`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-[1.4375rem]">
                        <div className="flex items-center gap-4">
                          <p className="text-[#6E7C87] font-medium">Pillars</p>
                          {item?.strategic_pillars?.map((pillar) => (
                            <p
                              className="rounded-[0.625rem] p-[0.3125rem] text-[#FFC043] bg-[#FFFCC266] text-xs font-bold"
                              key={pillar?.id}
                            >
                              {pillar.title}
                            </p>
                          ))}
                        </div>
                        <p className="text-[#5A5B5F]">
                          {formatToReadableDateShort(item?.start_date)} -{" "}
                          {formatToReadableDateShort(item?.end_date)}
                        </p>
                      </div>
                    </div>
                    <hr className="my-[1.4375rem]" />

                    {/* Implied Tasks */}
                    <div>
                      {item?.implied_tasks?.length ? (
                        item?.implied_tasks?.map((impliedTask, index) => (
                          <div className="" key={impliedTask?.id}>
                            <div className="flex w-full justify-between gap-10 text-sm">
                              <p className="text-primary text-sm font-medium">
                                Implied Task {index + 1}
                              </p>
                              <div className="grid grid-cols-6 flex-grow">
                                <div className="col-span-3">
                                  <div className="mb-[2.1875rem]">
                                    <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                      Task title
                                    </p>
                                    <p className="text-[#5A5B5F] font-medium">
                                      {impliedTask?.task}
                                    </p>
                                  </div>

                                  {/* Resource */}
                                  <div>
                                    <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                      Resource
                                    </p>
                                    <div className="flex items-center gap-2">
                                      {impliedTask?.resources?.length
                                        ? impliedTask?.resources.map(
                                            (resource) => (
                                              <p
                                                className="p-[0.3125rem] text-primary text-xs capitalize rounded-[0.625rem]"
                                                style={{
                                                  backgroundColor:
                                                    colorWithAlpha,
                                                }}
                                                key={resource?.staff_member_id}
                                              >
                                                {resource.name}
                                              </p>
                                            )
                                          )
                                        : "no resource assigned."}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-2">
                                  <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                    Duration
                                  </p>
                                  <p className="text-[#5A5B5F] font-medium">
                                    {formatToReadableDateShort(
                                      impliedTask.start_date
                                    )}{" "}
                                    -{" "}
                                    {formatToReadableDateShort(
                                      impliedTask.start_date
                                    )}
                                  </p>
                                </div>

                                <div className="col-span-1">
                                  <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                    Weight
                                  </p>
                                  <p className="text-xl text-[#015858] font-medium">
                                    {impliedTask?.weight
                                      ? `${impliedTask?.weight}%`
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="flex gap-2.5 ml-[40px] items-center justify-end"
                                key={index}
                              >
                                {impliedTask?.status !== "" &&
                                  impliedTask?.status !== undefined && (
                                    <div className="flex items-end gap-[20px]">
                                      {impliedTask?.status === "rejected" &&
                                        impliedTask?.approval_comment_count &&
                                        impliedTask?.status !== undefined && (
                                          <div className="text-xs cursor-pointer ">
                                            <p className="flex gap-2 items-center">
                                              <span
                                                className="text-[#9AA6AC] text-xs font-normal hover:underline"
                                                onClick={() => {
                                                  setDrawerUserId &&
                                                    setDrawerUserId(
                                                      impliedTask?.id
                                                    );
                                                  setComponentType &&
                                                    setComponentType(
                                                      "implied-task"
                                                    );
                                                  setOpenDrawer &&
                                                    setOpenDrawer(true);
                                                }}
                                              >
                                                View Comments
                                              </span>
                                              <span className="bg-[#D6130F1A]  text-[#D6130F] p-[3px] px-[6px] rounded-full text-xs">
                                                {
                                                  impliedTask?.approval_comment_count
                                                }
                                              </span>
                                            </p>
                                          </div>
                                        )}
                                      <EditableLabel
                                        status={impliedTask?.status}
                                      />
                                    </div>
                                  )}
                              </div>
                            </div>
                            {index === item?.implied_tasks?.length - 1 ? (
                              ""
                            ) : (
                              <hr className="my-[1.4375rem]" />
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-sm">
                          No implied tasks found.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {openCommentId === item.id && (
                <Comment
                  label="Specified task"
                  showTextArea={openCommentId === item.id}
                  setShowTextArea={() => toggleComment(item.id)}
                  comments={comments}
                  formik={FormikApprovalForm}
                />
              )}
            </section>
          ))}
      </div>

      {!loading && data?.length === 0 && (
        <>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
            <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
              Specified Task
            </h2>
            <div className="mt-2.5 ml-1.5">
              <h3 className="font-normal">No Specified Task Found</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpecifiedTasksDropDown;
