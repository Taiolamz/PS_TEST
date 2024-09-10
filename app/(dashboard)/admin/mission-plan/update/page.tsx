"use client";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { PageSidebar } from "@/components/atoms";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ApprovalFlowUpdate,
  FinancialYearUpdate,
  MissionVisionUpdate,
  StrategicPillarUpdate,
} from "./_steps";
import { CREATE_FY_LINKS } from "./_data";
import TimelineAndReminderUpdate from "./_steps/timeline-reminder";

const { ADMIN } = routesPath;

export default function Create() {
  const queryParams = useSearchParams();
  const ui = queryParams.get("ui");
  const router = useRouter();

  return (
    <DashboardLayout headerTitle="Mission Plan Update" back>
      <section style={{ height: "100%" }} className="flex overflow-y-hidden">
        <PageSidebar
          title={ui ? ui?.replace("-", " ") : "Mission Plan"}
          menu_items={CREATE_FY_LINKS}
          slug="ui"
          disableClick
        />

        <aside className="p-5 w-full">
          {ui === "financial-year" && <FinancialYearUpdate />}
          {ui === "strategic-pillar" && <StrategicPillarUpdate />}
          {ui === "timeline-reminder" && <TimelineAndReminderUpdate />}
          {ui === "mission-vision" && <MissionVisionUpdate />}
          {ui === "approval-flow" && <ApprovalFlowUpdate />}
        </aside>
      </section>
    </DashboardLayout>
  );
}
