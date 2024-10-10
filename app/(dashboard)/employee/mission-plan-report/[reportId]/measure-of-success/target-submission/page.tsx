"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import { cn } from "@/lib/utils";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import { fakehistoryData } from "../../../_partials/_measure_of_success/_data/data";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReportChallengeModal from "../../../_component/report-challenge-modal";
import {
  useGetMOSMeasureofSuccessQuery,
  useLazyGetAchievementHistoyQuery,
  useLazyGetMOSCommentQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { PageLoader } from "@/components/custom-loader";
import { LottieAnimation } from "@/components/fragment";
import { LottieEmptyState } from "@/lottie";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";

export default function TargetSubmission({
  params,
}: {
  params: {
    reportId: string | number;
  };
}) {
  const [id, setId] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showComment, setShowComment] = useState(false);

  // fetch measure of success
  const { data: mosData, isLoading } = useGetMOSMeasureofSuccessQuery(
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
    getMOSComment,
    {
      isLoading: loadingComment,
      data: commentData,
      isFetching: fetchingComment,
    },
  ] = useLazyGetMOSCommentQuery();

  //Mount when history or comment modal is opened
  useEffect(() => {
    if (showHistory) {
      getAchievementHistoy(id);
    }
    if (showComment) {
      getMOSComment(id);
    }
  }, [showHistory, showComment]);

  console.log({
    mosData,
    isLoading,
    loadingHistory,
    historyData,
    loadingComment,
    commentData,
    fetchingComment,
  });
  const handleFormSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      success_measure_id: "",
      target: "",
      month: getCurrentMonth() || "",
    },
    // validationSchema:
    onSubmit: handleFormSubmit,
    // validateOnChange: true,
    // validateOnBlur: true,
  });

  return (
    <DashboardLayout back headerTitle="Period Target Submission">
      {isLoading ? (
        <div className="h-[90%] grid place-content-center">
          <PageLoader />
        </div>
      ) : mosData?.data?.length === 0 ? (
        <div className="h-[90%] grid text-center place-content-center select-none">
          <div className="overflow-hidden">
            <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
          </div>
          No Measure Of Success Available for this Fiscal Year
        </div>
      ) : (
        <div className="m-5 mt-7 space-y-7 pb-9">
          {mosData?.data?.map((item: any, index: number) => (
            <section
              key={item?.id}
              className="border border-[var(--input-border)] bg-white px-6 py-5"
            >
              <header className="lg:flex items-center justify-between">
                <h3 className="text-black max-lg:inline-block capitalize text-nowrap">
                  {index + 1} .
                </h3>
                <h3 className="inline-flex items-center max-lg:float-right gap-x-1 text-[var(--text-color4)] text-sm">
                  Approval Status :
                  <span
                    className={cn(
                      "capitalize",
                      item?.status?.toLowerCase() === "pending"
                        ? "text-[var(--bg-yellow-400)]"
                        : item?.status?.toLowerCase() === "approved"
                        ? "text-[rgb(var(--bg-green-100))]"
                        : "text-[var(--bg-red-100)]"
                    )}
                  >
                    {item?.status}
                  </span>
                </h3>
                <h3 className="font-medium max-lg:mt-3 items-center gap-x-1 text-[var(--text-color4)]">
                  Percent Completed:{" "}
                  <span className="font-semibold text-green-500">{74}%</span>
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

                    <p className=" col-span-4 text-xs">{item?.measure}</p>
                    <p className=" col-span-2 text-xs">{item?.weight}</p>
                    <p className=" col-span-1 text-xs">{item?.unit}</p>
                    <p className=" col-span-2 text-xs">{item?.target}</p>
                  </div>
                  <div className="flex gap-x-3 mt-8">
                    <Button
                      onClick={async () => {
                        await setShowComment(false);
                        setShowHistory(true);
                        setId(item?.id);
                      }}
                      className="text-primary text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
                    >
                      View History
                    </Button>
                    <Button
                      onClick={async () => {
                        await setShowHistory(false);
                        setShowComment(true);
                        setId(item?.id);
                      }}
                      className="text-[var(--footer-link-color)] text-sm font-medium bg-transparent p-2 border flex gap-x-2 border-primary shadow-none"
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
                    placeholder="Target as set during period start"
                    isRequired
                  />
                  <Input
                    label={`${getCurrentMonth()?.slice(0, 3)} Achievement`}
                    id="achievement"
                    name="achievement"
                    placeholder="Input Achievement"
                    disabled
                  />
                  <div className="grid lg:grid-cols-2 gap-4">
                    <Input
                      label="Total Percentage Achieved"
                      id="total_percentage"
                      name="total_percentage"
                      placeholder="% Auto Calculated"
                      disabled
                    />
                  </div>
                  <div className="space-x-5">
                    <Button
                      loading={false}
                      className="text-white text-sm font-medium bg-primary p-2 px-5 borders border-primary mt-6 shadow-none"
                    >
                      Submit
                    </Button>
                  </div>
                </section>
              </main>
            </section>
          ))}
        </div>
      )}

      <CustomCommentDrawer
        open={showComment}
        onClose={() => setShowComment(false)}
        id={id}
        data={commentData?.data?.comments || []}
        handleSubmit={() => {}}
        commentType={"success-measure"}
        loadingComment={loadingComment}
      />
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

// const dass = {
//   status: "success",
//   data: [
//     {
//       id: "01j96qxnhg5z6a3qeexjykmtty",
//       measure: "completion of tsts",
//       unit: "20",
//       target: "1.00",
//       status: "pending",
//       weight: "20.00",
//       target_achievements: [
//         {
//           id: "01j98nkrqczr7ank9m30fejwfh",
//           staff_member_id: "01j91fn4cg1d7mg38a7hd54h0y",
//           fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//           mission_plan_id: "01j96qpszq2vnztwkz6vma1rqh",
//           success_measure_id: "01j96qxnhg5z6a3qeexjykmtty",
//           target: "1.00",
//           achieved: "1.00",
//           month: "January",
//           status: "pending",
//           created_at: "2024-10-03T07:48:18.000000Z",
//           updated_at: "2024-10-03T07:50:30.000000Z",
//           achievement_submitted_at: "2024-10-03 07:50:30",
//           deleted_at: null,
//         },
//         {
//           id: "01j98nstrjepk1gyg50hqpbz7c",
//           staff_member_id: "01j91fn4cg1d7mg38a7hd54h0y",
//           fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//           mission_plan_id: "01j96qpszq2vnztwkz6vma1rqh",
//           success_measure_id: "01j96qxnhg5z6a3qeexjykmtty",
//           target: "2.00",
//           achieved: "1.00",
//           month: "June",
//           status: "pending",
//           created_at: "2024-10-03T07:51:36.000000Z",
//           updated_at: "2024-10-03T07:51:55.000000Z",
//           achievement_submitted_at: "2024-10-03 07:51:55",
//           deleted_at: null,
//         },
//       ],
//       fy_completion_percentage: [{ completion_percentage: null }],
//     },
//     {
//       id: "01j96qxnwdf3b1qdyfw2anjha5",
//       measure: "completion of aut tsts",
//       unit: "20",
//       target: "1.00",
//       status: "pending",
//       weight: "80.00",
//       target_achievements: [
//         {
//           id: "01j98nc00p6e59ef4che5gn77w",
//           staff_member_id: "01j91fn4cg1d7mg38a7hd54h0y",
//           fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//           mission_plan_id: "01j96qpszq2vnztwkz6vma1rqh",
//           success_measure_id: "01j96qxnwdf3b1qdyfw2anjha5",
//           target: "1.00",
//           achieved: "1.00",
//           month: "January",
//           status: "pending",
//           created_at: "2024-10-03T07:44:03.000000Z",
//           updated_at: "2024-10-03T07:44:50.000000Z",
//           achievement_submitted_at: "2024-10-03 07:44:50",
//           deleted_at: null,
//         },
//         {
//           id: "01j9km46a45kne0spz41pyer8y",
//           staff_member_id: "01j91fn4cg1d7mg38a7hd54h0y",
//           fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//           mission_plan_id: "01j96qpszq2vnztwkz6vma1rqh",
//           success_measure_id: "01j96qxnwdf3b1qdyfw2anjha5",
//           target: "20.00",
//           achieved: "15.00",
//           month: "April",
//           status: "pending",
//           created_at: "2024-10-07T13:53:58.000000Z",
//           updated_at: "2024-10-07T13:58:59.000000Z",
//           achievement_submitted_at: "2024-10-07 13:58:59",
//           deleted_at: null,
//         },
//         {
//           id: "01j9p2k88jjh2vvvea0zvhe1h7",
//           staff_member_id: "01j91fn4cg1d7mg38a7hd54h0y",
//           fiscal_year_id: "01j91d89ddn4s6ejqcsmrh2g31",
//           mission_plan_id: "01j96qpszq2vnztwkz6vma1rqh",
//           success_measure_id: "01j96qxnwdf3b1qdyfw2anjha5",
//           target: "20.00",
//           achieved: "9.00",
//           month: "May",
//           status: "pending",
//           created_at: "2024-10-08T12:45:20.000000Z",
//           updated_at: "2024-10-08T12:45:56.000000Z",
//           achievement_submitted_at: "2024-10-08 12:45:56",
//           deleted_at: null,
//         },
//       ],
//       fy_completion_percentage: [{ completion_percentage: null }],
//     },
//   ],
// };

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
