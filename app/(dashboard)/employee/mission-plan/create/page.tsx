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
import { Dictionary } from "@/@types/dictionary";

const { EMPLOYEE } = routesPath;

const CreateMissionPlan = () => {

  const router = useRouter();
  const queryParams = useSearchParams();
  const ui = queryParams.get("ui");

  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );


  const TEMPLATE = active_fy_info?.template
  // console.log(TEMPLATE)

  const user = useAppSelector(selectUser);

  const { line_manager } = user;

  const RANDOM_LIST = [
    {
      title: "Mission Statement",
      path: "?ui=mission-statement",
      accessor: "mission-statement",
      slug: "mission_statement",
      hide: !active_fy_info?.template?.mission_statement,
      onNextStep: () => {
        getNextLinkVal(`mission-statement`);
      },
    },
    {
      title: "Set Strategic Intent",
      path: "?ui=strategic-intent",
      accessor: "strategic-intent",
      slug: "strategic_intents",
      hide: !active_fy_info?.template?.strategic_intents,
      onNextStep: () => {
        getNextLinkVal(`strategic-intent`);
      },
    },
    {
      title: "Freedom & Constraints",
      path: "?ui=boundaries",
      accessor: "boundaries",
      slug: "boundaries",
      hide: !active_fy_info?.template?.boundaries,
      onNextStep: () => {
        getNextLinkVal(`boundaries`);
      },
    },
  ]

  const getDynamicStepList = () => {
    // check if duration exist in the template
    // subtract 1 from the order number if it exist and DURATION_ORDER is less than order
    const DURATION_ORDER = TEMPLATE?.duration?.order

    const MAPPED_DATA = RANDOM_LIST?.map((item) => {
      const DYNAMIC_LIST = []
      const { title, path, accessor, slug, hide, onNextStep } = item
      if (TEMPLATE?.[item?.slug]?.order) {
        const ORDER = Number(TEMPLATE?.[item.slug]?.order)
        const newObj = {
          id: Number(DURATION_ORDER) < ORDER ? ORDER - 1 : ORDER,
          title,
          path,
          accessor,
          slug,
          hide,
          onNextStep,
        }
        DYNAMIC_LIST.push(newObj)
      }
      return DYNAMIC_LIST
    })
    return MAPPED_DATA.flat().sort((a, b) => a.id < b.id ? - 1 : Number(a.id > b.id))
  }

  // console.log(getDynamicStepList())

  const stepList = [
    {
      id: 1,
      title: "Mission Plan Overview",
      path: "?ui=overview",
      accessor: "overview",
      slug: "financial_year",
      onNextStep: () => {
        getNextLinkVal(`overview`);
      },
    },
    {
      id: 2,
      title: "Measure of Success",
      path: "?ui=measure-success",
      accessor: "measure-success",
      slug: "success_measures",
      hide: !active_fy_info?.template?.success_measures,
      onNextStep: () => {
        getNextLinkVal(`measure-success`);
      },
    },
    {
      id: 3,
      title: "Specified Task",
      path: "?ui=specified-task",
      accessor: "specified-task",
      slug: "specified_tasks",
      hide: !active_fy_info?.template?.specified_tasks,
      onNextStep: () => {
        getNextLinkVal(`specified-task`);
      },
    },
    {
      id: 4,
      title: "Implied Task",
      path: "?ui=implied-task",
      accessor: "implied-task",
      slug: "implied_tasks",
      hide: !active_fy_info?.template?.implied_tasks,
      onNextStep: () => {
        getNextLinkVal(`implied-task`);
      },
    },
    ...getDynamicStepList()
    // {
    //   id: 5,
    //   title: "Mission Statement",
    //   path: "?ui=mission-statement",
    //   accessor: "mission-statement",
    //   slug: "mission_statement",
    //   hide: !active_fy_info?.template?.mission_statement,
    //   onNextStep: () => {
    //     getNextLinkVal(`mission-statement`);
    //   },
    // },
    // {
    //   id: 6,
    //   title: "Set Strategic Intent",
    //   path: "?ui=strategic-intent",
    //   accessor: "strategic-intent",
    //   slug: "strategic_intents",
    //   hide: !active_fy_info?.template?.strategic_intents,
    //   onNextStep: () => {
    //     getNextLinkVal(`strategic-intent`);
    //   },
    // },
    // {
    //   id: 7,
    //   title: "Freedom & Constraints",
    //   path: "?ui=boundaries",
    //   accessor: "boundaries",
    //   slug: "boundaries",
    //   hide: !active_fy_info?.template?.boundaries,
    //   onNextStep: () => {
    //     getNextLinkVal(`boundaries`);
    //   },
    // },
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
    // console.log(obj);
    const path = EMPLOYEE.CREATE_MISSION_PLAN;
    if (obj !== null || obj) {
      const val = obj?.path;
      router?.push(`${path}${val}`);
    } else {
      router?.push(`${path}?ui=${param}&step=preview`);
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
        // onClick={() => {
        //   getNextLinkVal("measure-success");
        // }}
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
          {ui === "specified-task" && (
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
