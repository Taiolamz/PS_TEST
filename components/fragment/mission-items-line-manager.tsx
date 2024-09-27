import { formatBehaviours } from "@/utils/helpers";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";
import React from "react";

interface dataProp {
  data?: any;
  type?: string;
}

const MissionItemsLineManager = ({ data, type }: dataProp) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      {type === "specifiedTasks" ? (
        <div className="flex flex-col gap-3">
          {data?.map(
            (
              chi: {
                task: any;
                success_measures: any;
                strategic_pillars: any;
                start_date: any;
                end_date: any;
              },
              idx: number
            ) => {
              const {
                task,
                success_measures,
                strategic_pillars,
                start_date,
                end_date,
              } = chi;

              return (
                <div
                  key={idx}
                  className="flex flex-col gap-1 border rounded-[5px] p-[22px] w-full text-sm  bg-white"
                >
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
            }
          )}
        </div>
      ) : null}

      <>
        {type === "specifiedTasks" ? (
          <div className="flex flex-col gap-3">
            {data?.map(
              (chi: { implied_tasks: any; task: any }, idx: number) => {
                const { implied_tasks, task: specifiedTask } = chi;
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 border rounded-[5px] p-[22px] w-full text-sm  bg-white"
                  >
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
                              {(expected_outcome as any[])?.map(
                                (chi, index) => (
                                  <React.Fragment key={index}>
                                    <p className="text-sm font-light">{chi}</p>
                                    {index < expected_outcome.length - 1 && (
                                      <span>,</span>
                                    )}
                                  </React.Fragment>
                                )
                              )}
                            </div>
                            <div className="flex gap-[5px] items-center mt-2">
                              <p className="font-[400]">Weight :</p>
                              <p className="text-sm font-light">{weight}</p>
                            </div>
                            <div className="flex gap-[5px] items-center mt-2">
                              <p className="font-[400]">Percentage :</p>
                              <p className="text-sm font-light">{percentage ? `${percentage}%` : '---'}</p>
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
              }
            )}
          </div>
        ) : null}
      </>
    </div>
  );
};

export default MissionItemsLineManager;
