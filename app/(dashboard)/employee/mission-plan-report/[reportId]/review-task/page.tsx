"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import ApproveModal from "../../_component/approve-modal";
import RejectModal from "../../_component/reject-modal";
import { CustomAccordion } from "@/components/custom-accordion";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Taskdata } from "../../_partials/_downlines/_data/data";
import {
  useGetDownlinerExpectedOutcomeQuery,
  useGetMOSMeasureofSuccessQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import {
  abbreviateMonth,
  numberToWords,
} from "@/app/(dashboard)/_layout/Helper";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import { PageLoader } from "@/components/custom-loader";
import { getColorByStatus, getProgressColorByValue } from "@/utils/helpers";

export default function ApproveTask({
  params,
}: {
  params: { reportId: string };
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [id, setId] = useState("");
  const handleFormSubmit = () => {};
  // 01j91fn41cjb43nzwxaxngmw3p
  const formik = useFormik({
    initialValues: {
      implied_task: [
        {
          expected: "",
          actual_outcome: "",
          contribution: "",
          expected_outcome: "",
        },
      ],
    },
    // validationSchema:
    onSubmit: handleFormSubmit,
    // validateOnChange: true,
    // validateOnBlur: true,
  });

  const { data, isLoading, isFetching, refetch } =
    useGetDownlinerExpectedOutcomeQuery(params.reportId, {
      skip: !params.reportId,
    });
  // const { data: mosData, isLoading: isLoadingMosData } =
  //   useGetMOSMeasureofSuccessQuery(params?.reportId, {
  //     skip: !params.reportId,
  //   });
  // console.log(mosData, "mos data");

  // console.log(data, "specified data");

  return (
    <DashboardLayout back headerTitle="Downlines">
      <div className="m-5 mt-7">
        <h3 className="text-[var(--text-color4)] font-medium mb-5">
          {`${getCurrentMonth()} Expected Outcome`}
        </h3>
        <>
          {isLoading ? (
            <div className="h-[75vh] grid place-content-center">
              <PageLoader />
            </div>
          ) : (
            (data?.data?.specific_task as any[])?.map((item, idx) => (
              <CustomAccordion
                key={idx}
                className="mb-4 flex flex-col gap-1"
                headerClassName="bg-white p-5 border border-custom-divider rounded"
                title={
                  <div className="flex w-full gap-x-5">
                    <p className="text-[var(--primary-color)] text-2xl">
                      {idx + 1}.
                    </p>
                    <div className="flex justify-between items-start w-[80%]">
                      <div className="w-[60%] text-left grid gap-y-2">
                        <p className="text-[var(--text-color)] text-sm font-medium">
                          Specified task
                        </p>
                        <p className="text-[var(--footer-link-color)] font-medium">
                          {item?.task}
                        </p>
                        <p className="text-[var(--text-color)] text-sm">
                          {item?.start_date} - {item?.end_date}
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--text-color)] text-sm font-medium mb-2">
                          Weight
                        </p>
                        <p className="font-medium text-[var(--footer-link-color)] capitalize">
                          {item?.weight}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--text-color)] text-sm font-medium mb-2">
                          Status
                        </p>
                        <p
                          className="font-medium capitalize"
                          // className="font-medium text-[#FFC043]"
                          style={{ color: getColorByStatus(item?.status) }}
                        >
                          {item?.status}
                        </p>
                      </div>
                    </div>
                  </div>
                }
                content={
                  <div className="pt-8 border border-[#E5E9EB] p-8 bg-[#FAFAFA] space-y-10">
                    {/* MAPPED OUT IMPLIED TASK */}
                    {(item?.implied_tasks as any[])?.map((impliedItem, idx) => (
                      <main key={idx}>
                        <header className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-x-1">
                            <DotFilledIcon />
                            <p className="text-black font-medium capitalize">
                              {/* {impliedItem?.task} */}
                              {`Implied Task ${numberToWords(idx + 1)}`}
                            </p>
                          </span>
                          <p className="text-[#5A5B5F] font-medium text-sm">
                            Percent Completed: {"  "}
                            <span
                              className="text-base font-semibold"
                              style={{
                                color: getProgressColorByValue(
                                  impliedItem?.weight
                                ),
                              }}
                            >
                              {impliedItem?.weight}%
                            </span>
                          </p>
                        </header>
                        <div className="mt-7 flex gap-x-3">
                          {/* left-side */}
                          <div className="w-full">
                            <div className="grid grid-cols-11 gap-2">
                              <p className="col-span-5 text-[var(--footer-link-color)] text-sm">
                                Name of Task
                              </p>
                              <p className="col-span-2 text-[var(--footer-link-color)] text-sm">
                                Weight
                              </p>
                              <p className="col-span-4 text-[var(--footer-link-color)] text-sm">
                                Resource
                              </p>
                              <hr className="my-3 col-span-12" />
                              {/* {(impliedItem?.task as any[])?.map((chi: any, idx: any) => ( */}
                              <>
                                <p className="col-span-5 text-[var(--footer-link-color)] text-xs">
                                  {impliedItem?.task}
                                </p>
                                <p className="col-span-2 text-[var(--footer-link-color)] text-xs">
                                  {impliedItem?.weight}%
                                </p>
                                <p className="col-span-4 text-[var(--footer-link-color)] text-xs">
                                  {/* {impliedItem?.resources?.name?.join(", ")} */}
                                  {(impliedItem?.resources as any[])
                                    ?.map((resource) => resource.name)
                                    ?.join(", ")}
                                </p>
                              </>
                              {/* ))} */}
                            </div>
                            <div className="flex gap-x-3 mt-8">
                              <Button
                                onClick={() => {
                                  setShowHistory(true);
                                  setId("213|f12dfe2334jh88er");
                                }}
                                className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                              >
                                View History
                              </Button>
                              <Button
                                onClick={() => {
                                  setShowComment(true);
                                  setId("213|f12dfe2334jh88er");
                                }}
                                className="text-[#6E7C87] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                              >
                                Comments
                                <CommentsIcon />
                              </Button>
                            </div>
                          </div>
                          {/* right-side */}
                          <div className="border grid gap-y-5 border-[#E5E9EB] rounded-sm w-full py-5 px-4">
                            <Input
                              label={`${abbreviateMonth(
                                getCurrentMonth()
                              )} Expected Outcome (Monthly)`}
                              id="expected"
                              name="expected"
                              value={
                                impliedItem?.task_outcome?.expected_outcome ||
                                ""
                              }
                              placeholder="Input Expected Outcome"
                              disabled
                            />
                            <Input
                              label="Actual Outcome"
                              id="actual_outcome"
                              name="actual_outcome"
                              value={
                                impliedItem?.task_outcome?.actual_outcome || ""
                              }
                              placeholder="Input Actual Outcome"
                              disabled
                            />
                            <Input
                              label="Percentage Completion"
                              id="contribution"
                              name="contribution"
                              value={
                                impliedItem?.task_outcome?.completion_percent ||
                                ""
                              }
                              placeholder="Input Percentage Completion"
                              disabled
                              className="w-1/2"
                            />
                            <div className="space-x-3">
                              <Button
                                onClick={() => {
                                  setShowApprove(true);
                                  setId("143ofd4345approveId");
                                }}
                                className="text-[rgb(var(--bg-green-100))] w-[120px] text-sm font-medium bg-[rgb(var(--bg-green-100)/0.1)] p-2 px-5 rounded shadow-none"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => {
                                  setShowReject(true);
                                  setId("143ofd4345approveId");
                                }}
                                className="text-[var(--bg-red-100)] w-[120px] text-sm font-medium bg-[var(--bg-red-100-op)] p-2 px-5 borders border-transparent rounded shadow-none"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </main>
                    ))}
                  </div>
                }
              />
            ))
          )}
          {/* {Taskdata?.map((item, idx) => (
            <CustomAccordion
              key={idx}
              className="mb-4 flex flex-col gap-1"
              headerClassName="bg-white p-5 border border-custom-divider rounded"
              title={
                <div className="flex w-full gap-x-5">
                  <p className="text-[var(--primary-color)] text-2xl">
                    {idx + 1}.
                  </p>
                  <div className="flex justify-between items-start w-[80%]">
                    <div className="w-[60%] text-left grid gap-y-2">
                      <p className="text-[var(--text-color)] text-sm font-medium">
                        Specified task
                      </p>
                      <p className="text-[var(--footer-link-color)] font-medium">
                        {item.title}
                      </p>
                      <p className="text-[var(--text-color)] text-sm">
                        {item.startDate} - {item.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--text-color)] text-sm font-medium mb-2">
                        Weight
                      </p>
                      <p className="font-medium text-[var(--footer-link-color)] capitalize">
                        {item.weight}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--text-color)] text-sm font-medium mb-2">
                        Status
                      </p>
                      <p className="font-medium text-[#FFC043] capitalize">
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
              }
              content={
                <div className="pt-8 border border-[#E5E9EB] p-8 bg-[#FAFAFA] space-y-10">
         
                  {item.impliedTasks?.map((item, idx) => (
                    <main key={idx}>
                      <header className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-x-1">
                          <DotFilledIcon />
                          <p className="text-black font-medium capitalize">
                            {item.title}
                          </p>
                        </span>
                        <p className="text-[#5A5B5F] font-medium text-sm">
                          Percent Completed: {"  "}
                          <span className="text-base font-semibold text-red-500">
                            {item.percent}%
                          </span>
                        </p>
                      </header>
                      <div className="mt-7 flex gap-x-3">
                    
                        <div className="w-full">
                          <div className="grid grid-cols-11 gap-2">
                            <p className="col-span-5 text-[var(--footer-link-color)] text-sm">
                              Name of Task
                            </p>
                            <p className="col-span-2 text-[var(--footer-link-color)] text-sm">
                              Weight
                            </p>
                            <p className="col-span-4 text-[var(--footer-link-color)] text-sm">
                              Resource
                            </p>
                            <hr className="my-3 col-span-12" />
                            {item.task.map((item: any, idx: any) => (
                              <>
                                <p className="col-span-5 text-[var(--footer-link-color)] text-xs">
                                  {item.name}
                                </p>
                                <p className="col-span-2 text-[var(--footer-link-color)] text-xs">
                                  {item.weight}%
                                </p>
                                <p className="col-span-4 text-[var(--footer-link-color)] text-xs">
                                  {item.resources.join(", ")}
                                </p>
                              </>
                            ))}
                          </div>
                          <div className="flex gap-x-3 mt-8">
                            <Button
                              onClick={() => {
                                setShowHistory(true);
                                setId("213|f12dfe2334jh88er");
                              }}
                              className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                            >
                              View History
                            </Button>
                            <Button
                              onClick={() => {
                                setShowComment(true);
                                setId("213|f12dfe2334jh88er");
                              }}
                              className="text-[#6E7C87] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                            >
                              Comments
                              <CommentsIcon />
                            </Button>
                          </div>
                        </div>
           
                        <div className="border grid gap-y-5 border-[#E5E9EB] rounded-sm w-full py-5 px-4">
                          <Input
                            label="Jan Expected Outcome (Monthly)"
                            id="expected"
                            name="expected"
                            placeholder="Input Expected Outcome"
                            disabled
                          />
                          <Input
                            label="Actual Outcome"
                            id="actual_outcome"
                            name="actual_outcome"
                            placeholder="Input Actual Outcome"
                            disabled
                          />
                          <Input
                            label="Percentage Completion"
                            id="contribution"
                            name="contribution"
                            placeholder="Input Percentage Completion"
                            disabled
                            className="w-1/2"
                          />
                          <div className="space-x-3">
                            <Button
                              onClick={() => {
                                setShowApprove(true);
                                setId("143ofd4345approveId");
                              }}
                              className="text-[rgb(var(--bg-green-100))] w-[120px] text-sm font-medium bg-[rgb(var(--bg-green-100)/0.1)] p-2 px-5 rounded shadow-none"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => {
                                setShowReject(true);
                                setId("143ofd4345approveId");
                              }}
                              className="text-[var(--bg-red-100)] w-[120px] text-sm font-medium bg-[var(--bg-red-100-op)] p-2 px-5 borders border-transparent rounded shadow-none"
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </main>
                  ))}
                </div>
              }
            />
          ))} */}
        </>
        {/* Approve MOS target MOdal */}
        <ApproveModal
          show={showApprove}
          handleClose={() => setShowApprove(false)}
          handleSubmit={() => {
            setShowApprove(false);
          }}
        />
        {/* Reject MOS target MOdal */}
        <RejectModal
          show={showReject}
          handleClose={() => setShowReject(false)}
          handleSubmit={(val) => {
            setShowReject(false);
            console.log(val);
          }}
        />
        {/* MOS comment drawer */}
        <CustomCommentDrawer
          open={showComment}
          onClose={() => setShowComment(false)}
          id={id}
          data={[]}
          handleSubmit={() => {}}
          commentType={"success-measure"}
        />
        {/* MOS history drawer */}
        <HistoryDrawer
          open={showHistory}
          onClose={() => setShowHistory(false)}
          id={id}
          loading={false}
          data={[]}
          // data={fakehistoryData}
        />
      </div>
    </DashboardLayout>
  );
}
