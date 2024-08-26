"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { PageSidebar } from "@/components/atoms";
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { CREATE_MISSION_PLAN_LINKS } from "./_data";
import {
  Boundaries,
  ImpliedTask,
  MeasureOfSuccess,
  MissionPlanOverview,
  MissionStatement,
  SpecifiedTask,
  StrategicIntent,
} from "./_steps";
import { selectUser } from "@/redux/features/auth/authSlice";
import ShowLineManager from "./_component/show-line-manager";

const { EMPLOYEE } = routesPath;

const CreateMissionPlan = () => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const ui = queryParams.get("ui");

  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

  const user = useAppSelector(selectUser);

  const { line_manger } = user;

  return (
    <DashboardLayout
      headerTitle={active_fy_info?.title}
      back
      // onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
      <section className="flex h-full overflow-y-scroll">
        <PageSidebar
          title="Create Mission Plan"
          menu_items={CREATE_MISSION_PLAN_LINKS}
          slug="ui"
        />
        <aside className="p-5 w-full overflow-y-scroll pb-10 scroll-hidden">
          <h1 className="mb-3">Mission Plan</h1>
          {line_manger?.id === null && (
            <ShowLineManager
              btnText="View"
              title="Line Manager Mission Plan"
              clickAction={() =>
                router.push(EMPLOYEE.LINE_MANAGER_MISSION_PLAN)
              }
            />
          )}
          {ui === "overview" && <MissionPlanOverview />}
          {ui === "mission-statement" && <MissionStatement />}
          {ui === "measure-success" && <MeasureOfSuccess />}
          {ui === "strategic-intent" && (
            <StrategicIntent
            // currentMissionPlan={currentMissionPlan}
            />
          )}
          {ui === "specified-intent" && <SpecifiedTask />}
          {ui === "implied-task" && <ImpliedTask />}
          {ui === "boundaries" && <Boundaries />}
        </aside>
      </section>
    </DashboardLayout>
  );
};

export default CreateMissionPlan;
