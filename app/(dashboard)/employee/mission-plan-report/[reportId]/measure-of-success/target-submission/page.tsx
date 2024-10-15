"use client";
import { useEffect, useState } from "react";
import { useFormik, Formik, Form, Field, FormikState } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommentsIcon from "@/public/assets/icons/comments";
import { cn } from "@/lib/utils";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import HistoryDrawer from "@/components/drawer/history-drawer";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import {
  useAddMOSTargetMutation,
  useGetMOSMeasureofSuccessQuery,
  useLazyGetAchievementHistoyQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { PageLoader } from "@/components/custom-loader";
import { LottieAnimation } from "@/components/fragment";
import { LottieEmptyState } from "@/lottie";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import { toast } from "sonner";
import {
  useAddMssionPlanCommentOnComponentMutation,
  useLazyGetMssionPlanFetchCommentsQuery,
} from "@/redux/services/mission-plan/missionPlanCommentApi";
import ConfirmationModal from "@/components/atoms/modals/confirm";

const successMessage = {
  mos: {
    title: "Measures of Success Submitted",
    description: `You have successfully submitted your monthly target for ${getCurrentMonth()?.toLowerCase()}. Click on the button below to continue`,
    buttonText: "Continue Submissions",
  },
};

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

  // Defining the validation schema for target
  const validationSchema = Yup.object({
    target: Yup.string().required(`${getCurrentMonth()} Target is required`),
  });

  //Add MOS monthly target
  const [
    addMOSTarget,
    { isLoading: addingTarget, data: tardata, error: errtar },
  ] = useAddMOSTargetMutation();

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

  const handleFormSubmit = (
    values: {
      target: string;
      month: string;
    },
    id: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    addMOSTarget({
      success_measure_id: id,
      ...values,
    })
      .unwrap()
      .then(() => {
        setSubmitting(false);
        setShowSuccessModal(true);
        setSuccessContent(successMessage?.mos);
      })
      .catch((err) => {
        // console.log(err, "error");
        setSubmitting(false);
      });
  };

  const getInitialTarget: (item: any) => "" = (item) => {
    let filtered = item?.target_achievements?.filter(
      (data: any) =>
        data?.month?.toLowerCase() === getCurrentMonth()?.toLowerCase()
    );
    if (filtered.length > 0) {
      return filtered[0].month;
    } else {
      return "";
    }
  };

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
          {mosData?.data?.map((item: any, index: number) => {
            const filteredTarget = item?.target_achievements?.filter(
              (item: any) =>
                item?.month?.toLowerCase() === getCurrentMonth()?.toLowerCase()
            );
            return (
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
                    <span
                      className={cn(
                        "font-semibold text-purple-500",
                        Math?.round(
                          Number(item?.fy_completion_percentage?.split("%")[0])
                        ) >= 70
                          ? "text-green-500"
                          : Math?.round(
                              Number(
                                item?.fy_completion_percentage?.split("%")[0]
                              )
                            ) > 40
                          ? "text-warning"
                          : "text-[red]"
                      )}
                    >
                      {item?.fy_completion_percentage}
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
                  <Formik
                    initialValues={{
                      target:
                        (filteredTarget?.length < 1
                          ? ""
                          : filteredTarget?.[0]?.target) || "",
                      month: getCurrentMonth() || "",
                    }}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                    onSubmit={(values, { setSubmitting }) =>
                      handleFormSubmit(values, item.id, setSubmitting)
                    }
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      errors,
                      touched,
                    }: {
                      values?: any;
                      handleChange?: any;
                      handleBlur?: any;
                      isSubmitting?: any;
                      errors?: any;
                      touched?: any;
                    }) => (
                      <Form className="border grid gap-y-4 border-[var(--input-border)] rounded-sm w-full py-5 px-4">
                        <Input
                          label={`${getCurrentMonth()?.slice(0, 3)} Target`}
                          name="target"
                          id={`target-${item.id}`}
                          value={values.target}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors?.target}
                          touched={touched?.target}
                          placeholder="Target as set during period start"
                          isRequired
                          type="number"
                        />
                        <Input
                          label={`${getCurrentMonth()?.slice(
                            0,
                            3
                          )} Achievement`}
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
                            loading={isSubmitting}
                            type="submit"
                            disabled={isSubmitting}
                            loadingText="Submit"
                            className="text-white text-sm font-medium bg-primary p-2 px-5 borders border-primary mt-6 shadow-none"
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </main>
              </section>
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
        commentType={"success-measure"}
        loadingComment={loadingComment}
        loadingAddComment={addingComment}
      />

      <HistoryDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        id={id}
        loading={loadingHistory || fetchingHistory}
        data={format_history_data(historyData?.data?.data || [])}
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
