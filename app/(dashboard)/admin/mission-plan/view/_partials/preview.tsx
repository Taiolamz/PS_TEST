import {
  MissionItems,
  MissionSingleItem,
  MissionWrapper,
  SpecifiedMission,
} from "@/components/fragment";
import React from "react";
import { measureColumns } from "@/utils/data/dashboard/missionplan/dummy";
import { format } from "date-fns";
import MeasureOfSuccessTable from "../../_components/measure-of-success-table";

const Preview = ({ data }: dataProp) => {
  const {
    mission_statement,
    boundaries,
    measure_of_success,
    specified_tasks,
    strategic_intents,
  } = data;

  const MeasureData =
    measure_of_success.length !== null &&
    measure_of_success.map((item: measureProp, index: number) => {
      return {
        measure: `Measure ${index + 1}`,
        description: item?.measure,
        unit: item?.unit,
        value: item?.target,
        id: item?.id,
      };
    });

  const StrategicIntentData =
    strategic_intents.length !== null &&
    strategic_intents.map((item: strategicProp) => {
      return {
        description: [
          {
            key: "Behaviours",
            value: item?.behaviours,
          },
          {
            key: "Intent",
            value: item?.intent,
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

  return (
    <div className="flex flex-col gap-[12px]">
      {mission_statement !== null && (
        <MissionWrapper
          title="Mission Statement"
          status={mission_statement?.status}
        >
          <p className="leading-relaxed  text-sm">
            {mission_statement?.mission}
          </p>
        </MissionWrapper>
      )}
      {measure_of_success.length !== null && (
        <MissionWrapper
          title="Measure of Success"
          status={measure_of_success[0]?.status}
        >
          <MeasureOfSuccessTable data={MeasureData} columns={measureColumns} />
        </MissionWrapper>
      )}
      {strategic_intents.length !== null && (
        <MissionWrapper
          title="Strategic Intent"
          status={strategic_intents[0]?.status}
        >
          <MissionItems data={StrategicIntentData} lastColumn={true} />
        </MissionWrapper>
      )}
      {SpecifiedData.length !== null &&
        SpecifiedData?.map((items: any, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-[12px]">
              <MissionWrapper
                title={`Specified Task ${index + 1}`}
                status={items?.status}
              >
                <SpecifiedMission
                  data={items}
                  lastColumn={false}
                  index={index}
                />
              </MissionWrapper>
              {items?.impliedTask.length !== null &&
                items?.impliedTask.map((item: any, index: number) => {
                  return (
                    <MissionWrapper
                      title={`Implied Task ${index + 1}`}
                      status={item?.status}
                      key={index}
                    >
                      <SpecifiedMission data={item} index={index} />
                    </MissionWrapper>
                  );
                })}
            </div>
          );
        })}
      {boundaries[0]?.freedoms !== null && (
        <MissionWrapper title="Freedom" status={boundaries[0]?.status}>
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
    </div>
  );
};

export default Preview;
