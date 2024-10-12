"use client";
import { CustomAccordion } from "@/components/custom-accordion";
import React, { useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { data } from "../../_partials/_task_outcome/_data/data";
import { Button } from "@/components/ui/button";
import { ReusableDrawer } from "@/components/fragment";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";

import ImpliedTask from "./_partials/implied-task";
import History from "../../_component/history";
import Comment from "../../_component/comment";
import ReportChallengeModal from "../../_component/report-challenge-modal";
import { useGetTaskOutcomeTaskQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { PageLoader } from "@/components/custom-loader";
import { cn } from "@/lib/utils";

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

  const {
    data: taskData,
    isLoading: loadingTask,
    error,
  } = useGetTaskOutcomeTaskQuery(params.reportId);
  const handleFormSubmit = (val: any) => {
    console.log(val, "val");
  };

  const formik = useFormik({
    initialValues: {
      implied_task: [
        {
          expected_task_outcome: "",
        },
      ],
    },
    // validationSchema:
    onSubmit: handleFormSubmit,
    // validateOnChange: true,
    // validateOnBlur: true,
  });
  console.log(formik?.values);

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
                  <div>
                    <FormikProvider value={formik}>
                      <FieldArray name="tasks">
                        {({ insert, remove, push }) => (
                          <div>
                            {formik.values.implied_task?.length > 0 &&
                              formik.values.implied_task.map(
                                (implied_task: any, index: number) => (
                                  <>
                                    <div
                                      key={index}
                                      className=" border border-[#E5E9EB] bg-white"
                                    >
                                      <ImpliedTask
                                        formik={formik}
                                        impliedTaskData={item?.implied_tasks}
                                        setShowHistory={setShowHistory}
                                        setShowComment={setShowComment}
                                        setShowChallengeModal={
                                          setShowChallengeModal
                                        }
                                      />
                                    </div>
                                  </>
                                )
                              )}
                          </div>
                        )}
                      </FieldArray>
                      <div className="bg-white p-8 rounded-b">
                        <Button className="text-white text-sm font-medium bg-primary p-2 border flex gap-x-2 border-primary shadow-none">
                          Submit Input
                        </Button>
                      </div>
                    </FormikProvider>
                  </div>
                }
              />
            ))}
          </>
        )}
      </div>{" "}
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
