"use client";

import { PageSidebar } from "@/components/atoms";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CREATE_FY_LINKS } from "./_data";
import { ApprovalFlow, FinancialYear, MissionVision, StrategicPillar, TimelineAndReminder } from "./_steps";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import routesPath from "@/utils/routes";
import { useAppSelector } from "@/redux/store";
import { allObjValuesNotEmpty } from "@/utils/helpers";

const { ADMIN } = routesPath

export default function Create() {
  const queryParams = useSearchParams();
  const ui = queryParams.get("ui");
  const router = useRouter()

  const { fy_info: { financial_year, mission_vision, strategic_pillars } } = useAppSelector((state) => state.mission_plan)

  
  const hasItems = allObjValuesNotEmpty(financial_year) && allObjValuesNotEmpty(mission_vision) && allObjValuesNotEmpty(strategic_pillars?.strategic_pillars?.[0])

  return (
    <DashboardLayout headerTitle="Mission Plan" 
    back
    onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
      <section style={{ height: "100%"}} className="flex overflow-y-hidden">
        <PageSidebar
          title="Create Mission Plan"
          menu_items={CREATE_FY_LINKS}
          slug="ui"
          // disableClick={hasItems === false}
        />

        <aside className="p-5 w-full">
          {ui === "financial-year" && <FinancialYear />}
          {ui === "mission-vision" && <MissionVision />}
          {ui === "strategic-pillar" && <StrategicPillar />}
          {ui === "timeline-reminder" && <TimelineAndReminder />}
          {ui === "approval-flow" && <ApprovalFlow />}
        </aside>
      </section>
    </DashboardLayout>
  );
}
