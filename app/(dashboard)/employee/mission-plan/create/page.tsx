"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { PageSidebar } from "@/components/atoms";
import { useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
// import { CREATE_MISSION_PLAN_LINKS } from "./_data";
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

  const { line_manager } = user;

  const stepList = [
    {
      id: 1,
      title: "Mission Plan Overview",
      path: "?ui=overview",
      accessor: "overview",
      onNextStep: () => {
        getNextLinkVal(`overview`);
      },
    },
    {
      id: 2,
      title: "Mission Statement",
      path: "?ui=measure-success",
      accessor: "mission-statement",
      hide: !active_fy_info?.template?.mission_statement,
      onNextStep: () => {
        getNextLinkVal(`mission-statement`);
      },
    },
    {
      id: 3,
      title: "Measure of Success",
      path: "?ui=measure-success",
      accessor: "measure-success",
      hide: !active_fy_info?.template?.success_measures,
      onNextStep: () => {
        getNextLinkVal(`measure-success`);
      },
    },
    {
      id: 4,
      title: "Set Strategic Intent",
      path: "?ui=strategic-intent",
      accessor: "strategic-intent",
      hide: !active_fy_info?.template?.strategic_intents,
      onNextStep: () => {
        getNextLinkVal(`strategic-intent`);
      },
    },
    {
      id: 5,
      title: "Specified Task",
      path: "?ui=specified-task",
      accessor: "specified-intent",
      hide: !active_fy_info?.template?.specified_tasks,
      onNextStep: () => {
        getNextLinkVal(`specified-intent`);
      },
    },
    {
      id: 6,
      title: "Implied Task",
      path: "?ui=implied-task",
      accessor: "implied-task",
      hide: !active_fy_info?.template?.implied_tasks,
      onNextStep: () => {
        getNextLinkVal(`implied-task`);
      },
    },
    {
      id: 7,
      title: "Freedom & Constraints",
      path: "?ui=boundaries",
      accessor: "boundaries",
      hide: !active_fy_info?.template?.boundaries,
      onNextStep: () => {
        getNextLinkVal(`boundaries`);
      },
    },
  ];

  const getListToUse = () => {
    const firstLinkList = stepList?.filter((chi) => !chi?.hide);
    return firstLinkList;
  };

  type MenuItem = {
    id: number;
    title: string;
    path: string;
    accessor: string;
    onClick?: () => void;
    hide?: boolean;
  };

  function getNextObjectByAccessor(
    accessorValue: string,
    items: MenuItem[]
  ): MenuItem | null {
    const index = items.findIndex((item) => item.accessor === accessorValue);

    // Check if the index is found and there is a next object
    if (index !== -1 && index < items.length - 1) {
      return items[index + 1];
    }

    // Return null if no match is found or there is no next item
    return null;
  }

  const getNextLinkVal = (param: string) => {
    const obj = getNextObjectByAccessor(param, getListToUse());
    console.log(obj);
    const path = EMPLOYEE.CREATE_MISSION_PLAN;
    if (obj !== null || obj) {
      const val = obj?.path;
      router?.push(`${path}${val}`);
    } else {
      router?.push(`${path}?ui=boundaries&step=preview`);
    }

    // return actualPath;
  };

  return (
    <DashboardLayout
      headerTitle={active_fy_info?.title}
      back
      // onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
      <section
        onClick={() => {
          getNextLinkVal("implied-task");
        }}
        className="flex h-full overflow-y-scroll"
      >
        <PageSidebar
          title="Create Mission Plan"
          menu_items={getListToUse()}
          slug="ui"
        />
        <aside className="p-5 w-full overflow-y-scroll pb-10 scroll-hidden">
          {line_manager?.id !== null && ui !== "overview" && (
            <>
              <h1 className="mb-3">Mission Plan</h1>
              <ShowLineManager
                btnText="View"
                title="Line Manager Mission Plan"
                clickAction={() =>
                  router.push(EMPLOYEE.LINE_MANAGER_MISSION_PLAN)
                }
              />
            </>
          )}

          {ui === "overview" && (
            <MissionPlanOverview
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
          {ui === "mission-statement" && (
            <MissionStatement
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
          {ui === "measure-success" && (
            <MeasureOfSuccess
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
          {ui === "strategic-intent" && (
            <StrategicIntent
              // currentMissionPlan={currentMissionPlan}
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
          {ui === "specified-intent" && (
            <SpecifiedTask
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
          {ui === "implied-task" && (
            <ImpliedTask
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
          {ui === "boundaries" && (
            <Boundaries
              onNextStep={() => {
                getNextLinkVal(ui);
              }}
            />
          )}
        </aside>
      </section>
    </DashboardLayout>
  );
};

export default CreateMissionPlan;
