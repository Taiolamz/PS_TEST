"use client";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import History from "../../_component/history";
import Comment from "../../_component/comment";
import { Button } from "@/components/ui/button";
import ImpliedTask from "./_partials/implied-task";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { ReusableDrawer } from "@/components/fragment";
import { PageLoader } from "@/components/custom-loader";
import CommentsIcon from "@/public/assets/icons/comments";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { data } from "../../_partials/_task_outcome/_data/data";
import { CustomAccordion } from "@/components/custom-accordion";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReportChallengeModal from "../../_component/report-challenge-modal";
import { useGetTaskOutcomeTaskQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";

const ExpectedOutcome = ({
  params,
}: {
  params: {
    reportId: string | number;
  };
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Fetch task data
  const {
    data: taskData,
    isLoading: loadingTask,
    error,
  } = useGetTaskOutcomeTaskQuery(params.reportId);

  // Handle form submit
  const handleFormSubmit = (val: any) => {
    console.log(val, "val");
  };

  // Form handling
  const formik = useFormik({
    initialValues: {
      tasks: [
        {
          expected_task_outcome: "",
          actualOutcome: "",
          myContribution: "",
          adamuContribution: "",
          damilareContribution: "",
        },
      ],
    },
    validationSchema: Yup.object({
      tasks: Yup.array().of(
        Yup.object({
          expected_task_outcome: Yup.string().required(
            "Expected outcome is required"
          ),
          actualOutcome: Yup.string(),
          myContribution: Yup.string(),
          adamuContribution: Yup.string(),
          damilareContribution: Yup.string(),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <DashboardLayout back headerTitle="Expected Outcome">
      <div className="mt-10 px-5">
        {error ? (
          <></>
        ) : loadingTask ? (
          <PageLoader />
        ) : (
          <>
            <h1 className="text-[#222222b9] mb-5">
              Set Specified Task Expected Outcomes
            </h1>

            {taskData?.data?.tasks?.map((item: any, idx: number) => (
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
                  <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                      <FieldArray name="tasks">
                        {({ insert, remove, push }) => (
                          <div className=" border border-[#E5E9EB] bg-white">
                            <div className="grid mt-8">
                              {item?.implied_tasks?.map(
                                (val: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className={cn(
                                      "py-5 px-8",
                                      val?.status?.toLowerCase() === "rejected"
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
                                        <div key={idx} className="flex gap-x-2">
                                          <p className="w-[36%] text-[#222222da] text-xs">
                                            {val?.task}
                                          </p>
                                          <p className="w-[16%] text-[#222222da] text-xs">
                                            {val.weight}%
                                          </p>
                                          <p className="w-[40%] text-[#222222da] text-xs">
                                            {val.resources
                                              ?.map(
                                                (element: any) => element?.name
                                              )
                                              ?.join(", ")}
                                          </p>
                                        </div>
                                        <div className="flex gap-x-3 mt-8">
                                          <Button
                                            onClick={() => setShowHistory(true)}
                                            className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                                          >
                                            View History
                                          </Button>
                                          <Button
                                            onClick={() => setShowComment(true)}
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
                                          id="expected_task_outcome"
                                          name="expected_task_outcome"
                                          // value={formik.values.expected_task_outcome}
                                          // onChange={formik.handleChange}
                                          // touched={formik.touched.expected_task_outcome}
                                          // error={formik.errors.expected_task_outcome}
                                          placeholder="Input Expected Outcome"
                                        />
                                        <Input
                                          label="Actual Outcome"
                                          id="actual_outcome"
                                          name="actual_outcome"
                                          disabled
                                          // value={formik.values.actual_outcome}
                                          // onChange={formik.handleChange}
                                          // touched={formik.touched.actual_outcome}
                                          // error={formik.errors.actual_outcome}
                                          placeholder="Input Actual Outcome"
                                        />
                                        <div className="flex flex-wrap items-center gap-x-2">
                                          <Input
                                            label="My Contribution"
                                            id="contribution"
                                            name="contribution"
                                            disabled
                                            // value={formik.values.contribution}
                                            // onChange={formik.handleChange}
                                            // touched={formik.touched.contribution}
                                            // error={formik.errors.contribution}
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
                                                  id="expected_outcome"
                                                  name="expected_outcome"
                                                  // value={val?.value}
                                                  // onChange={formik.handleChange}
                                                  // touched={formik.touched.expected_outcome}
                                                  // error={formik.errors.expected_outcome}
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
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </FieldArray>
                      <div className="bg-white p-8 rounded-b">
                        <Button
                          type="submit"
                          className="text-white text-sm font-medium bg-primary p-2 border flex gap-x-2 border-primary shadow-none"
                        >
                          Submit Input
                        </Button>
                      </div>
                    </form>
                  </FormikProvider>
                }
              />
            ))}
          </>
        )}
      </div>

      <ReusableDrawer
        title="Outcome History"
        show={showHistory}
        handleClose={() => setShowHistory(false)}
        closeOnClickOutside={false}
        headerClass={"bg-primary lg:mx-0 p-5"}
        titleClass={"text-white"}
      >
        <div className="py-4 px-[18px]">
          <History />
        </div>
      </ReusableDrawer>
      <ReusableDrawer
        title="Comments"
        show={showComment}
        handleClose={() => setShowComment(false)}
        closeOnClickOutside={false}
        headerClass={"bg-primary lg:mx-0 p-5"}
        titleClass={"text-white"}
        childrenContainerClass="py-0"
      >
        <div className="">
          <Comment />
        </div>
      </ReusableDrawer>
      <ReportChallengeModal
        show={showChallengeModal}
        handleClose={() => setShowChallengeModal(false)}
      />
    </DashboardLayout>
  );
};

export default ExpectedOutcome;
