"use client";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { PageLoader } from "@/components/custom-loader";
import CommentsIcon from "@/public/assets/icons/comments";
import { FieldArray, Form, Formik } from "formik";
import { CustomAccordion } from "@/components/custom-accordion";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import {
  useAddTaskOutcomeMutation,
  useGetTaskOutcomeTaskQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import {
  useAddMssionPlanCommentOnComponentMutation,
  useLazyGetMssionPlanFetchCommentsQuery,
} from "@/redux/services/mission-plan/missionPlanCommentApi";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import { LottieEmptyState } from "@/lottie";
import { LottieAnimation } from "@/components/fragment";

const successMessage = {
  task: {
    title: "Specific Task Outcomes Submitted",
    description: `You have successfully submitted your monthly target for ${getCurrentMonth()?.toLowerCase()}. Click on the button below to continue`,
    buttonText: "Continue Submissions",
  },
};

const ExpectedOutcome = ({
  params,
}: {
  params: {
    reportId: string | number;
  };
}) => {
  const [id, setId] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showHistoryContent, setShowHistoryContent] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successContent, setSuccessContent] = useState<{
    title: string;
    description: string;
    buttonText: string;
  }>({
    title: "",
    description: "",
    buttonText: "",
  });

  // Fetch task data
  const {
    data: taskData,
    isLoading: loadingTask,
    error,
  } = useGetTaskOutcomeTaskQuery(params.reportId);

  // fetch task comment
  const [
    getMssionPlanFetchComments,
    { isLoading: loadingComment, data: commentData },
  ] = useLazyGetMssionPlanFetchCommentsQuery();

  //Add comment on task
  const [addMssionPlanCommentOnComponent, { isLoading: addingComment }] =
    useAddMssionPlanCommentOnComponentMutation();

  //Mount when history or comment modal is opened
  React.useEffect(() => {
    if (showComment) {
      getMssionPlanFetchComments(
        {
          component_id: id,
          component_type: "implied-task",
        },
        true
      );
    }
  }, [showHistory, showComment, id]);

  //Add Task outcome
  const [addTaskOutcome, { isLoading: addingTask }] =
    useAddTaskOutcomeMutation();

  // Handle form submit
  const handleFormSubmit = (val: any) => {
    addTaskOutcome({
      fiscal_year_id: params?.reportId,
      month: getCurrentMonth(),
      ...val,
    })
      .unwrap()
      .then(() => {
        setShowSuccessModal(true);
        setSuccessContent(successMessage?.task);
      })
      .catch((err) => {
        // console.log(err, "error");
      });
  };

  //validation schema
  const validationSchema = Yup.object({
    tasks: Yup.array().of(
      Yup.object({
        expected_task_outcome: Yup.string().required(
          "Expected outcome is required"
        ),
      })
    ),
  });

  return (
    <DashboardLayout back headerTitle="Expected Outcome">
      {error ? (
        <div className="h-[90%] grid place-content-center">
          <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
          <p className="text-[var(--text-color3)]">No Mission Plan found</p>
        </div>
      ) : loadingTask ? (
        <div className="h-[90%] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div className="mt-10 px-5">
          <h1 className="text-[#222222b9] mb-5">
            Set Specified Task Expected Outcomes
          </h1>

          {taskData?.data?.tasks?.map((item: any, idx: number) => {
            return (
              <CustomAccordion
                key={idx}
                className="mb-4 flex flex-col gap-1"
                headerClassName="bg-white p-5 border border-custom-divider rounded"
                title={
                  <div className="flex w-full gap-x-5">
                    <p className="text-[#015858] text-lg">{idx + 1}.</p>
                    <div className="flex justify-between items-center w-[80%]">
                      <div className="w-[60%] text-left grid gap-y-2">
                        <p className="text-[#222222ef] text-sm font-medium">
                          Specified task
                        </p>
                        <p className="text-[#222222d2] font-medium text-xs">
                          {item?.task}
                        </p>
                        <p className="text-[#222222ef] text-xs">
                          {item?.start_date} - {item?.end_date}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#222222ef] text-sm font-medium mb-2">
                          Weight
                        </p>
                        <p className="font-medium text-[#222222ef] text-xs">
                          {item?.weight}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[#222222ef] text-sm font-medium mb-2">
                          Status
                        </p>
                        <p
                          className={cn(
                            "font-medium text-[#FFC043] text-xs capitalize",
                            item?.status?.toLowerCase() === "approved"
                              ? "text-[rgb(var(--bg-green-100))]"
                              : item?.status?.toLowerCase() === "rejected"
                              ? "text-[var(--error-color)]"
                              : "text-[#FFC043]"
                          )}
                        >
                          {item?.status}
                        </p>
                      </div>
                    </div>
                  </div>
                }
                content={
                  <Formik
                    initialValues={{
                      tasks: item?.implied_tasks?.map((task: any) => {
                        const filteredTarget = task?.task_outcome?.filter(
                          (item: any) =>
                            item?.month?.toLowerCase() ===
                            getCurrentMonth()?.toLowerCase()
                        );
                        if (filteredTarget?.length >= 1) {
                          return {
                            expected_task_outcome:
                              task?.task_outcome?.[0]?.expected_outcome || "",
                            implied_task_id: task?.id,
                            specified_task_id: item?.id,
                          };
                        } else {
                          return {
                            expected_task_outcome: "",
                            implied_task_id: task?.id,
                            specified_task_id: item?.id,
                          };
                        }
                      }),
                    }}
                    onSubmit={handleFormSubmit}
                    validationSchema={validationSchema}
                  >
                    {({
                      isValid,
                      errors,
                      handleChange,
                      touched,
                      values,
                    }: {
                      isValid: boolean;
                      handleChange: any;
                      touched: any;
                      values: any;
                      errors: any;
                    }) => (
                      <Form>
                        <FieldArray name="tasks">
                          {({ insert, remove, push }) => (
                            <div className=" border border-[#E5E9EB] bg-white">
                              <div className="grid mt-8">
                                {item?.implied_tasks?.map(
                                  (val: any, idx: number) => {
                                    return (
                                      <div
                                        key={idx}
                                        className={cn(
                                          "py-5 px-8",
                                          val?.status?.toLowerCase() ===
                                            "rejected"
                                            ? "bg-[var(--bg-red-100-op)]"
                                            : ""
                                        )}
                                      >
                                        {idx > 0 && <hr />}
                                        <div
                                          className={`flex items-center justify-between ${
                                            idx > 0 && "mt-7"
                                          }`}
                                        >
                                          <span className="flex items-center gap-x-1">
                                            <DotFilledIcon />
                                            <p className="text-[#1E1E1E] capitalize">
                                              {val?.task}
                                            </p>
                                          </span>
                                          <span className="flex gap-x-1 items-center">
                                            Approval Status:
                                            <span
                                              className={cn(
                                                "font-medium text-[#FFC043] text-xs capitalize",
                                                val?.status?.toLowerCase() ===
                                                  "approved"
                                                  ? "text-[rgb(var(--bg-green-100))]"
                                                  : val?.status?.toLowerCase() ===
                                                    "rejected"
                                                  ? "text-[var(--error-color)]"
                                                  : "text-[#FFC043]"
                                              )}
                                            >
                                              {val?.status}
                                            </span>
                                          </span>
                                          <span className="flex items-center gap-x-1 text-[#1E1E1E] text-sm">
                                            Percent Completed:
                                            <p className="text-base font-semibold text-red-500">
                                              {" "}
                                              {val.percentage}%{" "}
                                            </p>
                                          </span>
                                        </div>
                                        <div className="mt-7 flex gap-x-3">
                                          <div className="w-full">
                                            <div className="flex gap-x-2">
                                              <p className="w-[36%] text-[#222222ef] text-sm">
                                                Name of Task
                                              </p>
                                              <p className="w-[16%] text-[#222222ef] text-sm">
                                                Weight
                                              </p>
                                              <p className="w-[40%] text-[#222222ef] text-sm">
                                                Resource
                                              </p>
                                            </div>
                                            <hr className="my-3" />
                                            <div
                                              key={idx}
                                              className="flex gap-x-2"
                                            >
                                              <p className="w-[36%] text-[#222222da] text-xs">
                                                {val?.task}
                                              </p>
                                              <p className="w-[16%] text-[#222222da] text-xs">
                                                {val.weight}%
                                              </p>
                                              <p className="w-[40%] text-[#222222da] text-xs">
                                                {val.resources
                                                  ?.map(
                                                    (element: any) =>
                                                      element?.name
                                                  )
                                                  ?.join(", ")}
                                              </p>
                                            </div>
                                            <div className="flex gap-x-3 mt-8">
                                              <Button
                                                type="button"
                                                onClick={() => {
                                                  setShowHistoryContent(
                                                    val?.task_outcome
                                                  );
                                                  setShowHistory(true);
                                                  setId(val?.id);
                                                }}
                                                className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                                              >
                                                View History
                                              </Button>
                                              <Button
                                                type="button"
                                                onClick={async () => {
                                                  await setShowHistory(false);
                                                  setShowComment(true);
                                                  setId(val?.id);
                                                }}
                                                className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                                              >
                                                Comments
                                                <CommentsIcon />
                                              </Button>
                                            </div>
                                          </div>
                                          <div className="border grid gap-y-5 border-[#E5E9EB] rounded-sm w-full py-5 px-4">
                                            <Input
                                              label={
                                                getCurrentMonth().slice(0, 3) +
                                                " Expected Outcome (Monthly)"
                                              }
                                              type="text"
                                              id={`tasks.${idx}.expected_task_outcome`}
                                              name={`tasks.${idx}.expected_task_outcome`}
                                              onChange={handleChange}
                                              value={
                                                values?.tasks?.[idx]
                                                  ?.expected_task_outcome
                                              }
                                              touched={
                                                touched?.tasks?.[idx]
                                                  ?.expected_task_outcome
                                              }
                                              error={
                                                errors?.tasks?.[idx]
                                                  ?.expected_task_outcome
                                              }
                                              placeholder="Input Expected Outcome"
                                              isRequired
                                            />
                                            <Input
                                              label="Actual Outcome"
                                              id="actual_outcome"
                                              name="actual_outcome"
                                              disabled
                                              placeholder="Input Actual Outcome"
                                            />
                                            <div className="flex flex-wrap items-center gap-x-2">
                                              <Input
                                                label="My Contribution"
                                                id="contribution"
                                                name="contribution"
                                                disabled
                                                placeholder="Input Contribution"
                                              />
                                            </div>
                                            <div className="">
                                              <p className="block relative text-xs  text-[#6E7C87] font-normal pb-2">
                                                Downline expectation
                                              </p>
                                              <div className="grid grid-cols-2 gap-x-2 justify-between">
                                                {val?.resources.map(
                                                  (num: any, idx: number) => (
                                                    <Input
                                                      label={`${Math.round(
                                                        num?.percentage
                                                      )}% ${num?.name}`}
                                                      key={idx}
                                                      type="text"
                                                      id="expected_outcome"
                                                      name="expected_outcome"
                                                      placeholder="Input Expected Outcome"
                                                      disabled
                                                    />
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </FieldArray>
                        <div className="bg-white p-8 rounded-b">
                          <Button
                            loading={addingTask}
                            type="submit"
                            loadingText="Submitting"
                            disabled={!isValid || addingTask}
                            className="text-white text-sm font-medium bg-primary p-2 border flex gap-x-2 border-primary shadow-none"
                          >
                            Submit Input
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                }
              />
            );
          })}
        </div>
      )}

      <CustomCommentDrawer
        open={showComment}
        onClose={() => setShowComment(false)}
        id={id}
        data={commentData?.data || []}
        handleSubmit={(response, resetForm) => {
          addMssionPlanCommentOnComponent(response)
            .unwrap()
            .then(() => {
              resetForm();
            });
        }}
        commentType={"implied-task"}
        loadingComment={loadingComment}
        loadingAddComment={addingComment}
      />

      <ConfirmationModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title={successContent?.title}
        message={successContent?.description}
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        handleClick={() => setShowSuccessModal(false)}
        actionBtnTitle={successContent?.buttonText}
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      />

      <HistoryDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        data={format_history_data(showHistoryContent)}
      />
    </DashboardLayout>
  );
};

export default ExpectedOutcome;

const format_history_data = (data: any[]) => {
  return data?.map((item: any) => ({
    id: item?.id,
    month: item?.month,
    status: item?.status,
    title: item?.success_measure?.measure,
    percentage: item?.completion_percent || 0,
    target: item?.expected_outcome,
    achievement: item?.actual_outcome || "No achievement yet",
  }));
};
