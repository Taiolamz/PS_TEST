"use client"

import { PageSidebar } from "@/components/atoms";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DashboardLayout } from "../../_components/dashboard-layout";
import DashboardNavContent from "../../_components/dashboard-layout/dashboard-nav-content";
import { CREATE_FY_LINKS } from "./_data";
import { FinancialYear, MissionVision, StrategicPillar } from "./_steps";

export default function Create() {
  const queryParams = useSearchParams()
  const ui = queryParams.get('ui')

  return (
    <DashboardLayout
      dynamiccontent={<DashboardNavContent title="Mission Plan" showBack />}
    >
      <section className="flex">
        <PageSidebar
          title="Create Mission Plan"
          menu_items={CREATE_FY_LINKS}
          slug="ui"
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
