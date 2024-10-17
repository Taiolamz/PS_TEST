"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React, { useState } from "react";
import ReportFilter from "../../_partials/_my_report/_fragment/report-filter";
import MeasureOfSucessMetricTableCard from "@/components/card/mos-table-card";
import ChallengeDrawer from "@/components/drawer/challenge-drawer";
import { CHALLENGES_DATA } from "@/app/(dashboard)/admin/mission-plan/reports/_data";
import CustomCommentDrawer from "@/components/drawer/comment-drawer";
import OrganizationTargetChart from "@/app/(dashboard)/admin/mission-plan/reports/_charts/organization-target";
import { useGetOrganiationSpecifiedTaskProgressQuery } from "@/redux/services/mission-plan/reports/admin/adminMPReportApi";
import { useAppSelector } from "@/redux/store";

export default function MOSReport({
  params,
}: {
  params: { reportId: string };
}) {
  const [fiscalYear, setFiscalYear] = useState("");
  const [missionCycle, setMissionCycle] = useState("");

  const options = [
    {
      label: "Option one",
      value: "Option one",
    },
    {
      label: "Option two",
      value: "Option two",
    },
    {
      label: "Option three",
      value: "Option three",
    },
  ];

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

  const { data, isLoading } = useGetOrganiationSpecifiedTaskProgressQuery({
    fiscal_year: fiscal_year,
    cycle: mission_cycle,
  });

  return (
    <DashboardLayout back headerTitle="Measure of Success Percentage Achieved">
      <div className="px-5 pb-10 flex flex-col gap-2">
        <ReportFilter />
        <div className="mt-4">
          <OrganizationTargetChart
            totalAchieveValue={data?.data?.achievement_average || "0"}
          />
        </div>
        {mosDetails?.map((chi, idx) => {
          const {
            title,
            fy_target,
            unit,
            weight,
            fy_achieved,
            amount,
            id,
            table_details,
            percentage,
          } = chi;
          return (
            <MeasureOfSucessMetricTableCard
              num={idx + 1}
              key={id || idx}
              title={title}
              fy_target={fy_target}
              unit={unit}
              weight={weight}
              percentage={percentage}
              fy_achieved={fy_achieved}
              amount={amount}
              table_details={table_details}
              onClickViewChallenge={() => setShowChallengeModal(true)}
              onClickComment={() => setShowCommentModal(true)}
            />
          );
        })}
        <ChallengeDrawer
          open={showChallengeModal}
          onClose={() => setShowChallengeModal(false)}
          data={CHALLENGES_DATA}
        />
        <CustomCommentDrawer
          open={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          id={"modalId"}
          data={[]}
          handleSubmit={(value) => {
            // console.log(value, "comment");
          }}
          commentType="specified-task"
        />
      </div>
    </DashboardLayout>
  );
}
