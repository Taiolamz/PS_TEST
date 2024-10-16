"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import { cn } from "@/lib/utils";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import RejectModal from "../../_component/reject-modal";
import ApproveModal from "../../_component/approve-modal";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import {
  useGetMOSSubmissionQuery,
  useLazyGetAchievementHistoyQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { LottieAnimation } from "@/components/fragment";
import { LottieEmptyState } from "@/lottie";
import { PageLoader } from "@/components/custom-loader";
import {
  useAddMssionPlanCommentOnComponentMutation,
  useLazyGetMssionPlanFetchCommentsQuery,
} from "@/redux/services/mission-plan/missionPlanCommentApi";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";

export default function ApproveMOS({
  params,
}: {
  params: { reportId: string };
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [id, setId] = useState("");

  // fetch mos for submission
  const { data, isLoading, isError } = useGetMOSSubmissionQuery(
    params?.reportId
  );

  //fetch mos achievement history
  const [
    getAchievementHistoy,
    {
      isLoading: loadingHistory,
      data: historyData,
      isFetching: fetchingHistory,
    },
  ] = useLazyGetAchievementHistoyQuery();

  // fetch mos comment
  const [
    getMssionPlanFetchComments,
    { isLoading: loadingComment, data: commentData },
  ] = useLazyGetMssionPlanFetchCommentsQuery();

  //Add comment on mos
  const [addMssionPlanCommentOnComponent, { isLoading: addingComment }] =
    useAddMssionPlanCommentOnComponentMutation();

  //Mount when history or comment modal is opened
  useEffect(() => {
    if (showHistory) {
      getAchievementHistoy(id);
    }
    if (showComment) {
      getMssionPlanFetchComments(
        {
          component_id: id,
          component_type: "success-measure",
        },
        true
      );
    }
  }, [showHistory, showComment]);

  return (
    <DashboardLayout back headerTitle="Review Measure of Success">
      {isError ? (
        <div className="h-[90%] grid place-content-center">
          <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
          <p className="text-[var(--text-color3)]">No Mission Plan found</p>
        </div>
      ) : isLoading ? (
        <div className="h-[90%] grid place-content-center">
          <PageLoader />
        </div>
      ) : data?.data?.measure_of_success?.length === 0 ? (
        <div className="h-[90%] grid text-center place-content-center select-none">
          <div className="overflow-hidden">
            <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
          </div>
          No Measure Of Success Available for this Fiscal Year
        </div>
      ) : (
        <div className="m-5 mt-7 space-y-7">
          {data?.data?.measure_of_success?.map((item: any) => (
            <section
              key={item?.id}
              className="border border-[var(--input-border)] bg-white px-6 py-5"
            >
              <header className="flex items-center justify-between">
                <h3 className="text-black max-lg:inline-block capitalize text-nowrap">
                  1 .
                </h3>
                <h3 className="inline-flex items-center max-lg:float-right gap-x-1 text-[var(--text-color4)] text-sm">
                  Approval Status :
                  <span
                    className={cn(
                      "capitalize",
                      item?.target_achievement?.status?.toLowerCase() ===
                        "pending"
                        ? "text-[var(--bg-yellow-400)]"
                        : item?.target_achievement?.status?.toLowerCase() ===
                          "approved"
                        ? "text-[rgb(var(--bg-green-100))]"
                        : "text-[var(--bg-red-100)]"
                    )}
                  >
                    {item?.target_achievement?.status}
                  </span>
                </h3>
              </header>
              <main className="mt-7 lg:flex gap-x-3">
                <section className="w-full mb-6">
                  <div className="grid grid-cols-9 text-[var(--footer-link-color)] gap-x-1">
                    <p className=" col-span-4 text-sm">Measure</p>
                    <p className=" col-span-2 text-sm">Weight</p>
                    <p className=" col-span-1 text-sm">Unit</p>
                    <p className=" col-span-2 text-sm">Yearly Target</p>

                    <hr className="my-3 col-span-12" />

                    <p className=" col-span-4 text-xs">{item?.measure} </p>
                    <p className=" col-span-2 text-xs">{item?.weight}</p>
                    <p className=" col-span-1 text-xs">{item?.unit}</p>
                    <p className=" col-span-2 text-xs">{item?.target}</p>
                  </div>
                  <div className="flex gap-x-3 mt-8">
                    <Button
                      onClick={() => {
                        setShowHistory(true);
                        setId(item?.id);
                      }}
                      className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                    >
                      View History
                    </Button>
                    <Button
                      onClick={() => {
                        setShowComment(true);
                        setId(item?.id);
                      }}
                      className="text-[#6E7C87] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                    >
                      Comments
                      <CommentsIcon />
                    </Button>
                  </div>
                </section>
                <section className="border grid gap-y-4 border-[var(--input-border)] rounded-sm w-full py-5 px-4">
                  <Input
                    label={`${getCurrentMonth()?.slice(0, 3)} Target`}
                    id="target"
                    name="target"
                    value={item?.target_achievement?.target}
                    placeholder="Target as set during period start"
                    disabled
                  />
                  <Input
                    label={`${getCurrentMonth()?.slice(0, 3)} Achievement`}
                    id="achievement"
                    name="achievement"
                    placeholder="Input Achievement"
                    value={item?.target_achievement?.achieved}
                    disabled
                  />
                  <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                      label="Total Percentage Achieved"
                      id="total_percentage"
                      name="total_percentage"
                      value={item?.target_achievement?.total_achieved}
                      placeholder="% Auto Calculated"
                      disabled
                    />
                    <Input
                      label="Downline Achievement"
                      id="downline_achieved"
                      name="downline_achieved"
                      placeholder="Auto Generated"
                      disabled
                    />
                  </div>
                  <div className="space-x-3">
                    <Button
                      onClick={() => {
                        setShowApprove(true);
                        setId(item?.target_achievement?.id);
                      }}
                      className="text-[rgb(var(--bg-green-100))] hover:opacity-85 w-[120px] text-sm font-medium bg-[rgb(var(--bg-green-100)/0.1)] p-2 px-5 rounded shadow-none"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        setShowReject(true);
                        setId(item?.target_achievement?.id);
                      }}
                      className="text-[var(--bg-red-100)] hover:opacity-85 w-[120px] text-sm font-medium bg-[var(--bg-red-100-op)] p-2 px-5 borders border-transparent rounded shadow-none"
                    >
                      Reject
                    </Button>
                  </div>
                </section>
              </main>
            </section>
          ))}
        </div>
      )}

      {/* Approve MOS target MOdal */}
      <ApproveModal
        show={showApprove}
        handleClose={() => setShowApprove(false)}
        handleSubmit={() => {
          setShowApprove(false);
        }}
        id={id}
        option="target_achievement"
      />
      {/* Reject MOS target MOdal */}
      <RejectModal
        show={showReject}
        handleClose={() => setShowReject(false)}
        handleSubmit={(val) => {
          setShowReject(false);
          console.log(val);
        }}
        id={id}
        option="target_achievement"
      />
      {/* MOS comment drawer */}
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
        commentType={"success-measure"}
        loadingComment={loadingComment}
        loadingAddComment={addingComment}
      />
      {/* MOS history drawer */}
      <HistoryDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        id={id}
        loading={loadingHistory || fetchingHistory}
        data={format_history_data(historyData?.data?.data || [])}
      />
    </DashboardLayout>
  );
}

const format_history_data = (data: any[]) => {
  return data?.map((item: any) => ({
    id: item?.id,
    month: item?.month,
    status: item?.status,
    title: item?.success_measure?.measure,
    percentage: item?.achievementPercentage,
    target: item?.target,
    achievement: item?.achieved,
  }));
};
