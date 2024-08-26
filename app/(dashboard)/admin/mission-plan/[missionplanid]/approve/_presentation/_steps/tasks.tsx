import React, { Fragment, useState } from "react";
import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";
import {
  formatToReadableDate,
  formatToReadableDateShort,
} from "@/utils/helpers/date-formatter";
import StatusBadge from "@/components/status-badge";

type Props = {
  data: SpecifiedTasksType[];
  isLoading: boolean;
};
const Tasks = ({ data, isLoading }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const { primaryColorHexValue } = React.useContext(ActionContext);
  const colorWithAlpha = primaryColorHexValue
    ? addAlphaToHex(primaryColorHexValue, 0.05)
    : "";
  return (
    <section className="">
      <h2 className="text-primary font-medium text-2xl text-center mb-10 ">
        Specified/Implied Task
      </h2>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin mr-1" />
        </div>
      ) : (
        <div>
          {data?.length ? (
            data.map((specifiedTask, index) => (
              <div
                className="border rounded-[0.5rem] w-full mb-10 px-[1.375rem] py-8 text-sm"
                key={specifiedTask?.id}
              >
                <div className="flex justify-between items-center mb-[1.4375rem]">
                  <h2>Specified Task {index + 1}</h2>
                  <div className="flex gap-[3.125rem] items-center">
                    <StatusBadge status={specifiedTask?.status ?? ""} />
                    {showMore ? (
                      <ChevronUp
                        className="text-primary"
                        onClick={() => setShowMore(false)}
                      />
                    ) : (
                      <ChevronDown
                        className="text-primary"
                        onClick={() => setShowMore(true)}
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-[1.095rem] text-[#1E1E1E] ">
                  {specifiedTask?.task}
                </h3>
                {showMore && (
                  <div className="transition-all duration-500 ease-in-out">
                    <hr className="my-[1.4375rem]" />
                    <div>
                      <div className="flex justify-between">
                        <div className="flex gap-4 items-center text-wrap">
                          <p className="text-[#6E7C87] font-medium">
                            Measures of success
                          </p>
                          {specifiedTask?.success_measures?.map((item) => (
                            <p
                              className="p-2 rounded-[0.625rem] text-[#6B51DF] bg-[#FCF0FF80] text-xs font-bold"
                              key={item?.id}
                            >
                              {item?.measure}
                            </p>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <p>Specified Task Weight</p>
                          <p className="text-base fot-bold text-[#015858]">
                            {specifiedTask.weight
                              ? specifiedTask?.weight + "%"
                              : "--"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-[1.4375rem]">
                        <div className="flex items-center gap-4">
                          <p className="text-[#6E7C87] font-medium">Pillars</p>
                          {specifiedTask?.strategic_pillars?.map((pillar) => (
                            <p
                              className="rounded-[0.625rem] p-[0.3125rem] text-[#FFC043] bg-[#FFFCC266] text-xs font-bold"
                              key={pillar?.id}
                            >
                              {pillar.title}
                            </p>
                          ))}
                        </div>
                        <p className="text-[#5A5B5F]">
                          {formatToReadableDateShort(specifiedTask?.start_date)}{" "}
                          - {formatToReadableDateShort(specifiedTask?.end_date)}
                        </p>
                      </div>
                    </div>
                    <hr className="my-[1.4375rem]" />

                    {/* Implied Tasks */}
                    <div>
                      {specifiedTask?.implied_tasks?.length ? (
                        specifiedTask?.implied_tasks?.map(
                          (impliedTask, index) => (
                            <div
                              className="flex w-full justify-between gap-10 text-sm"
                              key={impliedTask?.id}
                            >
                              <p className="text-primary text-sm font-medium">
                                Implied Task {index + 1}
                              </p>
                              <div className="grid grid-cols-6 flex-grow">
                                <div className="col-span-3">
                                  <div className="mb-[2.1875rem]">
                                    <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                      Task title
                                    </p>
                                    <p className="text-[#5A5B5F] font-medium">
                                      {impliedTask?.task}
                                    </p>
                                  </div>
                                  {/* Resource */}
                                  <div>
                                    <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                      Resource
                                    </p>
                                    <div className="flex items-center gap-2">
                                      {impliedTask?.resources?.length
                                        ? impliedTask?.resources.map(
                                            (resource) => (
                                              <p
                                                className="p-[0.3125rem] text-primary text-xs capitalize rounded-[0.625rem]"
                                                style={{
                                                  backgroundColor:
                                                    colorWithAlpha,
                                                }}
                                                key={resource?.staff_member_id}
                                              >
                                                {resource.name}
                                              </p>
                                            )
                                          )
                                        : "no resource assigned."}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-2">
                                  <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                    Duration
                                  </p>
                                  <p className="text-[#5A5B5F] font-medium">
                                    {formatToReadableDateShort(
                                      impliedTask.start_date
                                    )}{" "}
                                    -{" "}
                                    {formatToReadableDateShort(
                                      impliedTask.start_date
                                    )}
                                  </p>
                                </div>

                                <div className="col-span-1">
                                  <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                                    Weight
                                  </p>
                                  <p className="text-xl text-[#015858] font-medium">
                                    {impliedTask?.weight
                                      ? impliedTask?.weight
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-center text-sm">
                          no implied tasks found.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-sm">no data found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Tasks;
