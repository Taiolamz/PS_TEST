import { formatBehaviours } from "@/utils/helpers";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";
import React from "react";

interface missionItems {
  title: string;
  behaviours: string;
  intent: string;
  description: [
    {
      key: string;
      value: string;
    }
  ];
  impliedTask?: [];
}
interface dataProp {
  data?: any;
  strategicIntent?: boolean;
  strategicIntentData?: any[];
  specifiedTasks?: boolean;
  specifiedTasksData?: any[];
  lastColumn?: boolean;
  impliedTask?: boolean;
  impliedTasksData?: any[];
  boundaries?: boolean;
  boundariesData?: any[];
}

const MissionItems = ({
  data,
  lastColumn,
  strategicIntent,
  strategicIntentData,
  specifiedTasks,
  specifiedTasksData,
  impliedTask,
  boundaries,
  boundariesData,
}: dataProp) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      {data?.map(({ title, description }: missionItems, index: string) => {
        return (
          <div key={index} className="text-[var(--text-secondary)] text-sm">
            {title !== null && title !== undefined && (
              <div className="text-sm font-normal leading-relaxed capitalize">
                <h4>- {title}</h4>
              </div>
            )}
            <div className="gap-[5px] flex flex-col pt-[5px]">
              {description !== undefined &&
                description.map(({ key, value }, index) => {
                  return (
                    <div className="pl-[1rem] leading-relaxed " key={index}>
                      <p className="flex gap-[5px] leading-relaxed text-sm">
                        <span className="font-[400] capitalize">
                          {key}
                          {lastColumn === true ? (
                            <span> : </span>
                          ) : index + 1 !== description.length ? (
                            <span> : </span>
                          ) : (
                            ""
                          )}
                        </span>
                        <span className="font-[300]">
                          {formatBehaviours(value)}
                        </span>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      <>
        {strategicIntent ? (
          <div className="flex flex-col gap-3">
            {strategicIntentData?.map((chi, idx) => {
              const { title, intent, behaviours } = chi;
              const formattedBehaviours =
                behaviours ?? JSON.parse(behaviours as string).join(", ");

              return (
                <div key={idx} className="flex flex-col gap-1">
                  <p className="text-primary font-medium">{`- Strategic Intent ${
                    idx + 1
                  }`}</p>

                  <div className="flex gap-[5px] items-center mt-2">
                    <p className="font-[400]">Intent :</p>
                    <p className="text-sm font-light">{intent}</p>
                  </div>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-[400]">Behaviours :</p>
                    <p className="text-sm font-light">{formattedBehaviours}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
      <>
        {specifiedTasks ? (
          <div className="flex flex-col gap-3">
            {specifiedTasksData?.map((chi, idx) => {
              const {
                task,
                success_measures,
                strategic_pillars,
                start_date,
                end_date,
              } = chi;

              return (
                <div key={idx} className="flex flex-col gap-1">
                  <p className="text-primary font-medium">{`Specified Task ${
                    idx + 1
                  }`}</p>

                  <p>{`- ${task}`}</p>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-[400]">Pillars :</p>
                    {(strategic_pillars as any[])?.map((chi, index) => (
                      <React.Fragment key={index}>
                        <p className="text-sm font-light">{chi?.title}</p>
                        {index < strategic_pillars.length - 1 && <span>,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-[400]">Measure of Success :</p>
                    <div className="flex gap-[5px] items-center">
                      {(success_measures as any[])?.map((chi, index) => (
                        <React.Fragment key={index}>
                          <p className="text-sm font-light">{chi?.measure}</p>
                          {index < success_measures.length - 1 && (
                            <span>,</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <p className="font-[400]">{`${formatToReadableDate(
                    start_date
                  )} - ${formatToReadableDate(end_date)}`}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
      <>
        {impliedTask ? (
          <div className="flex flex-col gap-3">
            {specifiedTasksData?.map((chi, idx) => {
              const { implied_tasks, task: specifiedTask } = chi;
              return (
                <div key={idx} className="flex flex-col gap-1">
                  <p className="text-primary font-medium">{`Implied Task ${
                    idx + 1
                  }`}</p>
                  <div>
                    {(implied_tasks as any[])?.map((chi, idx) => {
                      const {
                        task,
                        expected_outcome,
                        weight,
                        percentage,
                        resources,
                        start_date,
                        end_date,
                      } = chi;
                      return (
                        <div key={idx}>
                          <p>{`- ${specifiedTask}`}</p>
                          <div className="flex gap-[5px] items-center">
                            <p>Specified Task:</p>
                            <p>{` ${task}`}</p>
                          </div>
                          <div className="flex gap-[5px] items-center">
                            <p className="font-[400]">Expected Outcome :</p>
                            {(expected_outcome as any[])?.map((chi, index) => (
                              <React.Fragment key={index}>
                                <p className="text-sm font-light">{chi}</p>
                                {index < expected_outcome.length - 1 && (
                                  <span>,</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          <div className="flex gap-[5px] items-center mt-2">
                            <p className="font-[400]">Weight :</p>
                            <p className="text-sm font-light">{weight}</p>
                          </div>
                          <div className="flex gap-[5px] items-center mt-2">
                            <p className="font-[400]">Percentage :</p>
                            <p className="text-sm font-light">{`${percentage}%`}</p>
                          </div>
                          <div className="flex gap-[5px] items-center">
                            <p className="font-[400]">Resource :</p>
                            <div className="flex gap-[5px] items-center">
                              {(resources as any[])?.map((chi, index) => (
                                <React.Fragment key={index}>
                                  <p className="text-sm font-light">
                                    {chi?.name}
                                  </p>
                                  {index < resources.length - 1 && (
                                    <span>,</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                          <p className="font-[400]">{`${formatToReadableDate(
                            start_date
                          )} - ${formatToReadableDate(end_date)}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
      <>
        {boundaries ? (
          <div className="flex flex-col gap-2">
            {boundariesData?.map((chi, idx) => {
              const { freedoms, constraints } = chi;
              return (
                <div key={idx} className="flex flex-col gap-3">
                  <div>
                    <p className="text-primary font-medium">Freedom</p>
                    <div className="flex flex-col gap-2 mt-2">
                      {(freedoms as string[])?.map((chi) => (
                        <p
                          key={idx}
                          className="text-sm font-light"
                        >{`- ${chi}`}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-primary font-medium">Constraints</p>
                    <div className="flex flex-col gap-2 mt-2">
                      {(constraints as string[])?.map((chi) => (
                        <p
                          key={idx}
                          className="text-sm font-light"
                        >{`- ${chi}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    </div>
  );
};

export default MissionItems;
