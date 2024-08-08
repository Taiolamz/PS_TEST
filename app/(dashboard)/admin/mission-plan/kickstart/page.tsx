"use client";

import { PageSidebar } from "@/components/atoms";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CREATE_FY_LINKS } from "./_data";
import { FinancialYear, MissionVision, StrategicPillar } from "./_steps";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import routesPath from "@/utils/routes";

const { ADMIN } = routesPath

export default function Create() {
  const queryParams = useSearchParams();
  const ui = queryParams.get("ui");
  const router = useRouter()

  return (
    <DashboardLayout headerTitle="Mission Plan" 
    back
    onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
      <section style={{ height: "100%"}} className="flex">
        <PageSidebar
          title="Create Mission Plan"
          menu_items={CREATE_FY_LINKS}
          slug="ui"
          disableClick={true}
        />

        <aside className="p-5 w-[100vw_-_201px]">
          {ui === "financial-year" && <FinancialYear />}
          {ui === "mission-vision" && <MissionVision />}
          {ui === "strategic-pillar" && <StrategicPillar />}
        </aside>
      </section>
    </DashboardLayout>
  );
}
