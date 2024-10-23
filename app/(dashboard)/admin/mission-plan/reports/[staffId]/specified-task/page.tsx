"use client"

import DashboardLayout from '@/app/(dashboard)/_layout/DashboardLayout'
import MetricTableCard from '@/components/card/metric-table-card';
import CustomSelect from '@/components/custom-select';
import ChallengeDrawer from '@/components/drawer/challenge-drawer';
import { ActionLabel, CardContainer, GridLegend, ReusableProgress, ReusableSegmentProgress } from '@/components/fragment';
import { exportIcon, filterIcon, undoIcon } from '@/public/svgs';
import { getProgressColorByValue, toWholeNumber } from '@/utils/helpers';
import React, { useEffect } from 'react'
import { CHALLENGES_DATA } from '../../_data';
import CustomCommentDrawer from '@/components/drawer/comment-drawer';
import { useAppSelector } from '@/redux/store';
import { useGetSpecifiedTaskDetailsQuery, useLazyGetParentEntityChallengesQuery } from '@/redux/services/mission-plan/reports/employee/missionPlanReportApi';
import { useAddMssionPlanCommentOnComponentMutation, useLazyGetMssionPlanFetchCommentsQuery } from '@/redux/services/mission-plan/missionPlanCommentApi';
import ReportFilter from '@/app/(dashboard)/employee/mission-plan-report/_partials/_my_report/_fragment/report-filter';
import { Skeleton } from '@/components/ui/skeleton';
import MetricFrame from '@/components/card/frame';
import { cn } from '@/lib/utils';
import CardSkeletonLoader from '@/components/card-loader';
import MetricTableCardTwo from '@/components/card/metric-table-card-two';


export default function OrganizationSpecifiedTask({
  params,
}: {
  params: { staffId: string };
}) {
  const [showChallengeModal, setShowChallengeModal] = React.useState(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);

  // Open modal for challenge and Comment
  const [commentModal, setCommentModal] = React.useState(false);
  const [challengeModal, setChallengeModal] = React.useState(false);
  // Specified task Id for the modal
  const [modalId, setModalId] = React.useState("");

  // const dispatch = useDispatch();

  // Filter
  const { fiscal_year, mission_cycle } = useAppSelector(
    (state) => state.employee_mission_plan_filter
  );

  const getParams = () => {
    if (params.staffId === "organization") {
      return {
        is_admin: true,
      }
    }
    return {
      is_admin: false,
      staff_id: params.staffId
    }
  }

  const {
    data: orgData,
    isLoading: loadingOrg,
    isFetching: fetchingOrg,
  } = useGetSpecifiedTaskDetailsQuery({
    fiscal_year: fiscal_year || "",
    cycle: mission_cycle || "",
    ...getParams()
  });

  //fetch challenges
  const [
    getParentEntityChallenges,
    { data: challengeData, isLoading: loadingChallenges, isFetching: isFetchingChallenges },
  ] = useLazyGetParentEntityChallengesQuery();

  // fetch task comment
  const [
    getMssionPlanFetchComments,
    { isLoading: loadingComment, isFetching: isFetchingComment, data: commentData },
  ] = useLazyGetMssionPlanFetchCommentsQuery();

  //Add comment on task
  const [addMssionPlanCommentOnComponent, { isLoading: addingComment }] =
    useAddMssionPlanCommentOnComponentMutation();

  useEffect(() => {
    if (challengeModal) {
      getParentEntityChallenges({ type: "specified-task", id: modalId });
    }
    if (commentModal) {
      getMssionPlanFetchComments(
        {
          component_id: modalId,
          component_type: "specified-task",
        },
        true
      );
    }
  }, [commentModal, challengeModal]);

  return (
    <DashboardLayout
      headerTitle='Specified Task Overview'
      back
    >
      <section className='p-5'>
        <CardContainer className="mb-5">
          <ReportFilter className="mt-0" />
        </CardContainer>

        <CardContainer className="mt-10">

          {/* flex flex-col gap-4  */}
          {/* <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1>Organization Task Activity</h1>
              <span className="text-xs text-gray-400 font-light">March 2023 - March 31, 2024</span>
            </div>
            <p>Total Tasks: {50}</p>
          </div> */}

          {/* -------MULTI PROGRESS BAR------ */}
          {/* <div className="mt-10">
            <ReusableSegmentProgress
              value={100}
              height={6}
              segments={segments}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-4 items-center mt-5 ">
                {progressDesc.map((chi, idx) => {
                  const { label, color, value } = chi;
                  return (
                    <GridLegend
                      key={idx}
                      color={color as any}
                      label={label}
                      value={value}
                    />
                  );
                })}
              </div>

            </div>
          </div> */}
          {/* -------MULTI PROGRESS BAR------ */}

          {loadingOrg || fetchingOrg ? (
            <CardContainer className="border mt-3">
              <CardSkeletonLoader />
            </CardContainer>
          ) : (
            <MetricFrame className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="">Organization Task Activity</p>
                <p>
                  Total Tasks:{" "}
                  {orgData?.data?.task_activity?.reduce(
                    (acc: number, curr: any) => acc + curr.total,
                    0
                  ) || 0}
                </p>
              </div>

              {/* -------MULTI PROGRESS BAR------ */}
              <div className="mt-14">
                <div className="flex h-1.5 w-full rounded bg-[var(--input-bg)]">
                  {/* in progress */}
                  {orgData?.data?.task_activity?.map((item: any, idx: number) => {
                    const { status, percentage } = item;
                    return (
                      <span
                        className={cn(
                          "block h-full",
                          idx === 0 && "rounded-l",
                          idx === orgData?.data?.task_activity.length - 1 &&
                          "rounded-l"
                        )}
                        style={{
                          width: `${toWholeNumber(percentage)}%`,
                          backgroundColor: returnStatusColor(status),
                        }}
                        key={idx}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-4 items-center mt-5 ">
                    {orgData?.data?.task_activity?.map((item: any) => {
                      const { status, total } = item;
                      return (
                        <div className="flex flex-col gap-2" key={item?.status}>
                          <div className="flex gap-2 items-center">
                            <span
                              style={{
                                backgroundColor: returnStatusColor(status),
                              }}
                              className={` h-[6px] w-[6px] rounded-[1.06px]`}
                            />
                            <p className="text-[#6E7C87] text-xs">{status}</p>
                          </div>
                          <p
                            className={`text-sm ml-4`}
                            style={{ color: returnStatusColor(status) }}
                          >
                            {total}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* -------MULTI PROGRESS BAR------ */}
            </MetricFrame>
          )}

        </CardContainer>

        <h1 className='mt-8 text-gray-600'>Organization Specific Task</h1>
        <div className="mt-7">
          {loadingOrg || fetchingOrg ? (
            <>
              <Skeleton className="w-full h-[177px] bg-[var(--primary-accent-color)] rounded-sm mt-5" />
              <Skeleton className="w-full h-[177px] bg-[var(--primary-accent-color)] rounded-sm mt-5" />
            </>
          ) : (
            orgData?.data?.specified_task?.map((chi: any, idx: number) => {
              const {
                task,
                measure_of_success_percentage_completion,
                implied_tasks,
                measure_of_success,
                id,
              } = chi;
              return (
                <MetricTableCardTwo
                  key={idx}
                  id={id}
                  title={task}
                  percentage={toWholeNumber(
                    measure_of_success_percentage_completion
                  )}
                  measureOfSuccessDetails={measure_of_success?.map(
                    (item: any) => ({
                      label: item?.measure,
                      textColor: "var(--primary-color)",
                      bgColor: "var(--primary-accent-color)",
                    })
                  )}
                  tasks={implied_tasks}
                  progressValue={toWholeNumber(
                    measure_of_success_percentage_completion
                  )}
                  progressColor={valueColor(
                    toWholeNumber(measure_of_success_percentage_completion)
                  )}
                  onClickComment={(id) => {
                    id && setModalId(id);
                    setChallengeModal(false);
                    setCommentModal(true);
                  }}
                  onClickViewChallenge={(id) => {
                    id && setModalId(id);
                    setCommentModal(false);
                    setChallengeModal(true);
                  }}
                />
              );
            })
          )}
        </div>
      </section>
      <ChallengeDrawer
        open={challengeModal}
        onClose={() => setChallengeModal(false)}
        id={modalId}
        loading={loadingChallenges || isFetchingChallenges}
        data={challengeData?.data?.challenges}
      />
      <CustomCommentDrawer
        open={commentModal}
        onClose={() => setCommentModal(false)}
        id={modalId}
        commentType="specified-task"
        data={commentData?.data || []}
        handleSubmit={(response, resetForm) => {
          addMssionPlanCommentOnComponent(response)
            .unwrap()
            .then(() => {
              resetForm();
            });
        }}
        loadingComment={loadingComment || isFetchingComment}
        loadingAddComment={addingComment}
      />
    </DashboardLayout>
  )
}

const statusColors: { [key: string]: string } = {
  "In Progress": "#FFA500",
  Completed: "#008000",
  "Under Review": "#FFD700",
  Overdue: "#FF0000",
};

const valueColor = (number: number): "red" | "yellow" | "green" => {
  if (number >= 70) {
    return "green";
  } else if (number >= 40 && number <= 69) {
    return "yellow";
  } else {
    return "red";
  }
};

const returnStatusColor = (status: string): string => {
  return statusColors[status] || "#000000";
};
