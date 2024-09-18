import {
  EditableLabel,
  MissionItems,
  MissionSingleItem,
  MissionWrapper,
  SpecifiedMission,
  SpecifiedTasks,
} from "@/components/fragment";
import React, { useMemo, useState } from "react";
import { measureColumns } from "@/utils/data/dashboard/missionplan/dummy";
import { format } from "date-fns";
import MeasureOfSuccessTable from "../../_components/measure-of-success-table";
import Link from "next/link";
import routesPath from "@/utils/routes";
import MissionItemsLineManager from "@/components/fragment/mission-items-line-manager";
import SpecifiedTasksDropDown from "../../_components/specified-task-dropdown";
import { usePathname } from "next/navigation";
import DrawerComment from "../_side-modal/drawer-comment";
import SingleStrategicIntent from "../../_components/single-strategic-intent";

const { EMPLOYEE } = routesPath;

interface PreviewProps {
  data: any;
  type?: string;
}

const Preview = ({ data, type }: PreviewProps) => {
  const location = usePathname();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [drawerUserId, setDrawerUserId] = useState<string>("");
  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] text-sm bg-transparent border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

  const {
    mission_statement,
    boundaries,
    measure_of_success,
    specified_tasks,
    strategic_intents,
    implied_tasks,
  } = data || {};

  const MeasureData =
    measure_of_success.length !== null &&
    measure_of_success.map((item: measureProp, index: number) => {
      return {
        measure: `Measure ${index + 1}`,
        description: item?.measure,
        unit: item?.unit,
        target: item?.target,
        id: item?.id,
        weight: `${Math.round(item?.weight)}%`,
        actions: (
          <div
            className="flex gap-2.5 ml-[40px] items-end justify-end"
            key={index}
          >
            {item?.status !== "" && item?.status !== undefined && (
              <div className="flex items-end gap-[20px]">
                {item?.status === "rejected" &&
                  item?.approval_comment_count &&
                  item?.status !== undefined && (
                    <div className="text-xs cursor-pointer ">
                      <p className="flex gap-2 items-center">
                        <span
                          className="text-[#9AA6AC] text-xs font-normal hover:underline"
                          onClick={() => {
                            setDrawerUserId(item?.id);
                            setOpenDrawer(true);
                          }}
                        >
                          View Comments
                        </span>
                        <span className="bg-[#D6130F1A]  text-[#D6130F] p-[3px] px-[6px] rounded-full text-xs">
                          {item?.approval_comment_count}
                        </span>
                      </p>
                    </div>
                  )}
                <EditableLabel status={item?.status} />
              </div>
            )}
          </div>
        ),
      };
    });

  const StrategicIntentData =
    strategic_intents.length !== null &&
    strategic_intents.map((item: strategicProp) => {
      return {
        title: "Strategic Intent",
        description: [
          {
            key: "Intent",
            value: item?.intent,
          },
          {
            key: "Behaviours",
            value: item?.behaviours,
          },
        ],
      };
    });

  const FreedomData =
    boundaries[0]?.freedoms !== null &&
    boundaries[0]?.freedoms.map((item: string) => {
      return {
        item,
      };
    });
  const ConstraintsData =
    boundaries[0]?.constraints.length !== null &&
    boundaries[0]?.constraints.map((item: string) => {
      return {
        item,
      };
    });

  const measureColumnData = useMemo(() => measureColumns(), []);

  const SpecifiedData =
    specified_tasks.length !== null &&
    specified_tasks.map((items: specifiedProp) => {
      return {
        title: `${items?.task} ${
          items?.is_main_effort === 0 ? "" : "(MAIN EFFORT)"
        }`,
        status: items?.status,
        description: [
          {
            key: "Pillars",
            value:
              items?.strategic_pillars.length !== null &&
              items?.strategic_pillars?.map(
                (val: any, index: number) =>
                  `${val?.title}${
                    index + 1 === items?.strategic_pillars?.length ? " " : ", "
                  }`
              ),
          },
          {
            key: "Measures of success",
            // value: items?.success_measures,
            value:
              items?.success_measures.length !== null &&
              items?.success_measures?.map(
                (val: any, index: number) =>
                  `${val?.measure}${
                    index + 1 === items?.success_measures?.length ? " " : ", "
                  }`
              ),
          },
          {
            key: `${format(items?.start_date, "do MMM, yyyy")} - ${format(
              items?.end_date,
              "do MMM, yyyy"
            )}`,

            value: "",
          },
        ],
        impliedTask:
          items?.implied_tasks.length !== null &&
          items?.implied_tasks.map((itemProp: impliedProp) => {
            return {
              title: itemProp?.task,
              status: itemProp?.status,
              description: [
                {
                  key: "Specified Task",
                  value: `${items?.task} ${
                    items?.is_main_effort === 0 ? "" : "(MAIN EFFORT)"
                  }`,
                },
                {
                  key: "Expected Outcome",
                  value: itemProp?.expected_outcome,
                },
                {
                  key: "Weight",
                  value: itemProp?.weight,
                },
                {
                  key: "Percentage",
                  value: `${itemProp?.percentage}%`,
                },
                {
                  key: "Resources",
                  value: itemProp?.resources.map(
                    (resource: resourceProp, index: number) =>
                      `${resource?.name}${
                        index + 1 === itemProp?.resources?.length ? " " : ", "
                      }`
                  ),
                },
                {
                  key: `${format(items?.start_date, "do MMM, yyyy")} - ${format(
                    items?.end_date,
                    "do MMM, yyyy"
                  )}`,
                  value: "",
                },
              ],
            };
          }),
      };
    });
  // employee/mission-plan/01j6w7bg225j579xvc3v8pbcw3/approve?ui=presentation&step=1
  return (
    <div className="flex flex-col gap-[12px]">
      {type !== "lineManagerPreview" && (
        <div className="flex gap-[10px] ml-auto">
          <div className={`${btn}`}>
            <Link href="#">Approval Status</Link>
          </div>
          <div className={`${btn}`}>
            <Link href="#">History</Link>
          </div>
          <div className={`${btn}`}>
            <Link
              href={`/employee/mission-plan/${data?.id}/approve?ui=presentation&step=1`}
            >
              Presentation Mode
            </Link>
          </div>

          <div className={`${btn}`}>
            <Link href={`${EMPLOYEE.CREATE_MISSION_PLAN}?ui=overview`}>
              Edit
            </Link>
          </div>
        </div>
      )}
      {mission_statement !== 0 && (
        <MissionWrapper title="Mission Statement" childWidth="w-[100%]">
          <div className="flex w-full justify-between">
            <p className="leading-relaxed  text-sm">
              {mission_statement?.mission}
            </p>
            <div className="flex gap-2.5 ml-[40px] items-end justify-end">
              {mission_statement?.status !== "" &&
                mission_statement?.status !== undefined && (
                  <div className="flex items-center gap-[20px]">
                    {mission_statement?.status === "rejected" &&
                      mission_statement?.approval_comment_count &&
                      mission_statement?.status !== undefined && (
                        <div className="text-xs cursor-pointer ">
                          <p className="flex gap-2 items-center">
                            <span
                              className="text-[#9AA6AC] text-xs font-normal hover:underline"
                              onClick={() => {
                                setDrawerUserId(mission_statement?.id);
                                setOpenDrawer(true);
                              }}
                            >
                              View Comments
                            </span>
                            <span className="bg-[#D6130F1A]  text-[#D6130F] p-[3px] px-[6px] rounded-full text-xs">
                              {mission_statement?.approval_comment_count}
                            </span>
                          </p>
                        </div>
                      )}
                    <EditableLabel status={mission_statement?.status} />
                  </div>
                )}
            </div>
          </div>
        </MissionWrapper>
      )}
      {measure_of_success.length !== 0 && (
        <MissionWrapper title="Measure of Success" childWidth="w-[100%]">
          <MeasureOfSuccessTable
            data={MeasureData}
            columns={measureColumnData}
          />
        </MissionWrapper>
      )}
      {strategic_intents.length !== 0 && (
        <SingleStrategicIntent
          data={strategic_intents ?? []}
          loading={false}
          setOpenDrawer={setOpenDrawer}
          setDrawerUserId={setDrawerUserId}
        />
      )}
      {specified_tasks.length !== 0 && (
        <>
          {type === "lineManagerPreview" ? (
            <MissionItemsLineManager
              data={specified_tasks}
              type="specifiedTasks"
            />
          ) : (
            <SpecifiedTasksDropDown
              data={specified_tasks ?? []}
              approvables={specified_tasks?.approvables ?? []}
              loading={false}
              bg="bg-white"
              setOpenDrawer={setOpenDrawer}
              setDrawerUserId={setDrawerUserId}
              
            />
          )}
        </>
      )}

      {boundaries?.length !== 0 && (
        <MissionWrapper
          title="Freedom"
          status={type !== "lineManagerPreview" ? boundaries[0]?.status : ""}
        >
          <div className="flex flex-col gap-[1rem]">
            <MissionSingleItem data={FreedomData} />
            <div>
              {boundaries[0]?.constraints !== null && (
                <>
                  <div className="text-[var(--primary-color)] font-[500] leading-relaxed pb-[11px]">
                    <h4>Constraints</h4>
                  </div>
                  <MissionSingleItem data={ConstraintsData} />
                </>
              )}
            </div>
          </div>
        </MissionWrapper>
      )}
      <DrawerComment
        show={openDrawer}
        handleClose={() => {
          setDrawerUserId("");
          setOpenDrawer(false);
        }}
        userId={drawerUserId}
      />
    </div>
  );
};

export default Preview;
