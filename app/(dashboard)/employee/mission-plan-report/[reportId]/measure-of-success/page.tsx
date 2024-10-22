"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import ReportFilter from "../../_partials/_my_report/_fragment/report-filter";
import MeasureOfSucessMetricTableCard from "@/components/card/mos-table-card";
import ChallengeDrawer from "@/components/drawer/challenge-drawer";
import { CHALLENGES_DATA } from "@/app/(dashboard)/admin/mission-plan/reports/_data";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import OrganizationTargetChart from "@/app/(dashboard)/admin/mission-plan/reports/_charts/organization-target";
import { useGetOrganizationSpecifiedTaskProgressQuery } from "@/redux/services/mission-plan/reports/admin/adminMPReportApi";
import { useAppSelector } from "@/redux/store";
import {
  useGetSpecifiedTaskDetailsQuery,
  useLazyGetParentEntityChallengesQuery,
} from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import {
  useAddMssionPlanCommentOnComponentMutation,
  useLazyGetMssionPlanFetchCommentsQuery,
} from "@/redux/services/mission-plan/missionPlanCommentApi";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
  resetFilter,
  setFilteredFiscalYear,
} from "@/redux/features/mission-plan/report/employee/employeeMissionPlanReport";
import { Skeleton } from "@/components/ui/skeleton";
import { toWholeNumber } from "@/utils/helpers";

export default function MOSReport({
  params,
}: {
  params: { reportId: string };
}) {
  const mosDetails = [
    {
      title: "Revenue",
      fy_target: "150,0000",
      unit: "$",
      weight: "20",
      fy_achieved: "67",
      amount: "100,234,000",
      id: 1,
      percentage: 67,
      table_details: [
        {
          review_period: "Q1",
          target: "75,000,000",
          achieved_target: "58,000,000",
          percentage: 30,
        },
        {
          review_period: "Q2",
          target: "50,000,000",
          achieved_target: "45,000,000",
          percentage: 40,
        },
        {
          review_period: "Q3",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 60,
        },
        {
          review_period: "Q4",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 95,
        },
      ],
    },
    {
      title: "Revenue",
      fy_target: "150,0000",
      unit: "$",
      weight: "20",
      fy_achieved: "67",
      amount: "100,234,000",
      id: 2,
      percentage: 67,
      table_details: [
        {
          review_period: "Q1",
          target: "75,000,000",
          achieved_target: "58,000,000",
          percentage: 30,
        },
        {
          review_period: "Q2",
          target: "50,000,000",
          achieved_target: "45,000,000",
          percentage: 40,
        },
        {
          review_period: "Q3",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 60,
        },
        {
          review_period: "Q4",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 95,
        },
      ],
    },
    {
      title: "Revenue",
      fy_target: "150,0000",
      unit: "$",
      weight: "20",
      fy_achieved: "67",
      amount: "100,234,000",
      id: 3,
      percentage: 67,
      table_details: [
        {
          review_period: "Q1",
          target: "75,000,000",
          achieved_target: "58,000,000",
          percentage: 30,
        },
        {
          review_period: "Q2",
          target: "50,000,000",
          achieved_target: "45,000,000",
          percentage: 40,
        },
        {
          review_period: "Q3",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 60,
        },
        {
          review_period: "Q4",
          target: "20,000,000",
          achieved_target: "15,000,000",
          percentage: 95,
        },
      ],
    },
  ];
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const { fiscal_year, mission_cycle } = useAppSelector(
    (state) => state.employee_mission_plan_filter
  );

  const {
    data: orgData,
    isLoading: loadingOrg,
    isFetching: fetchingOrg,
  } = useGetOrganizationSpecifiedTaskProgressQuery({
    is_admin: false,
    staff_id: params?.reportId,
    fiscal_year: fiscal_year || "",
    cycle: mission_cycle || "",
  });

  // Specified task Id for the modal
  const [modalId, setModalId] = React.useState("");

  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const fy = searchParams.get("fy");

  useEffect(() => {
    if (fy) {
      dispatch(setFilteredFiscalYear(fy));
    } else {
      dispatch(resetFilter());
    }
  }, []);

  //fetch challenges
  const [
    getParentEntityChallenges,
    { data: challengeData, isLoading: loadingChallenges },
  ] = useLazyGetParentEntityChallengesQuery();

  // fetch mos comment
  const [
    getMssionPlanFetchComments,
    { isLoading: loadingComment, data: commentData },
  ] = useLazyGetMssionPlanFetchCommentsQuery();

  //Add comment on mos
  const [addMssionPlanCommentOnComponent, { isLoading: addingComment }] =
    useAddMssionPlanCommentOnComponentMutation();

  useEffect(() => {
    if (showChallengeModal) {
      getParentEntityChallenges({ type: "measure-of-success", id: modalId });
    }
    if (showCommentModal) {
      getMssionPlanFetchComments(
        {
          component_id: modalId,
          component_type: "specified-task",
        },
        true
      );
    }
  }, [showCommentModal, showChallengeModal]);
  return (
    <DashboardLayout back headerTitle="Measure of Success Percentage Achieved">
      <div className="px-5 pb-10 flex flex-col gap-2">
        <ReportFilter />
        <div className="mt-4">
          <OrganizationTargetChart
            totalAchieveValue={
              orgData?.data?.target_chart?.total_achievement_average || "0"
            }
          />
        </div>
        {loadingOrg || fetchingOrg ? (
          <>
            <Skeleton className="w-full h-[128px] bg-[var(--primary-accent-color)] rounded-sm mt-5" />
            <Skeleton className="w-full h-[128px] bg-[var(--primary-accent-color)] rounded-sm mt-5" />
          </>
        ) : (
          orgData?.data?.target_measure_of_success?.map(
            (chi: any, idx: number) => {
              const {
                measure,
                target,
                unit,
                weight,
                fy_achieved,
                amount,
                id,
                target_achievements,
                percentage,
              } = chi;
              return (
                <MeasureOfSucessMetricTableCard
                  num={idx + 1}
                  key={id || idx}
                  title={measure}
                  fy_target={target}
                  unit={unit}
                  weight={toWholeNumber(weight)}
                  percentage={percentage}
                  fy_achieved={fy_achieved}
                  amount={amount}
                  table_details={target_achievements}
                  onClickComment={(id) => {
                    id && setModalId(id);
                    setShowChallengeModal(false);
                    setShowCommentModal(true);
                  }}
                  onClickViewChallenge={(id) => {
                    id && setModalId(id);
                    setShowCommentModal(false);
                    setShowChallengeModal(true);
                  }}
                />
              );
            }
          )
        )}

        <ChallengeDrawer
          open={showChallengeModal}
          onClose={() => setShowChallengeModal(false)}
          id={modalId}
          loading={loadingChallenges}
          data={challengeData?.data?.challenges}
        />
        <CustomCommentDrawer
          open={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          id={modalId}
          commentType="success-measure"
          data={commentData?.data || []}
          handleSubmit={(response, resetForm) => {
            addMssionPlanCommentOnComponent(response)
              .unwrap()
              .then(() => {
                resetForm();
              });
          }}
          loadingComment={loadingComment}
          loadingAddComment={addingComment}
        />
      </div>
    </DashboardLayout>
  );
}
