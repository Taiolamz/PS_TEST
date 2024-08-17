import React from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  data: SpecifiedTasksType[];
};

export type TaskRowsTemplateType = {
  id: number;
  goal?: string;
  strategic_pillars: {
    id: string;
    title: string;
  }[];
  implied_tasks: {
    sn: number;
    task: string;
    resources: {
      staff_member_id: string;
      name: string;
    }[];
    start_date: string;
    end_date: string;
  }[];
};

const Tasks = ({ data }: Props) => {
  const transformedMeasureOfSuccessRows = (
    mappedData: SpecifiedTasksType[]
  ): TaskRowsTemplateType[] => {
    return mappedData?.map((item, index) => ({
      id: index + 1,
      goal: item?.task,
      strategic_pillars: item.strategic_pillars,
      implied_tasks: item.implied_tasks.map((impliedTask, impliedIndex) => ({
        sn: impliedIndex + 1,
        task: impliedTask.task,
        resources: impliedTask.resources,
        start_date: impliedTask.start_date,
        end_date: impliedTask.end_date,
      })),
    }));
  };

  const taskData: TaskRowsTemplateType[] =
    transformedMeasureOfSuccessRows(data);

  return (
    <div className="border rounded-[0.5rem] w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem]">
      <section>
        <h2 className="text-primary font-medium text-2xl">
          Specified/Implied Task
        </h2>
        <div className="w-[77%] mx-auto overflow-x-auto">
          <div className="p-4 overflow-scroll">
            {taskData?.map((task) => (
              <div key={task.id} className="mb-9">
                <div className="grid grid-cols-5 bg-[#0080800D] px-[0.5625rem] py-3.5 min-w-full">
                  <p className="col-span-1 justify-self-start text-primary text-xs font-medium">
                    Task {task?.id}
                  </p>
                  <h3 className="col-span-4 justify-self-start 2xl:justify-self-center text-primary text-sm font-medium whitespace-nowrap">
                    {task?.goal}
                  </h3>
                </div>
                <table className="min-w-full text-xs w-full">
                  <thead>
                    <tr className="bg-[#F4F4F4] text-left w-full">
                      <th className="px-4 py-2 border-b w-12">S/N</th>
                      <th className="px-4 py-2 border-b">Pillars</th>
                      <th className="px-4 py-2 border-b">Implied Tasks</th>
                      <th className="px-4 py-2 border-b">Resources</th>
                      <th className="px-4 py-2 border-b">Start Date</th>
                      <th className="px-4 py-2 border-b">End Date</th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-[#E5E9EB] w-full">
                    {task.implied_tasks.map((impliedTask, index) => (
                      <tr
                        key={impliedTask.sn}
                        className={`w-full border-x border-[#E5E9EB] hover:bg-gray-50 text-left ${
                          index % 2 === 0
                            ? "bg-white border-r border-[#E5E9EB]"
                            : "bg-[#F4F4F4]"
                        }`}
                      >
                        <td className="px-4 py-2 border-r border-[#E5E9EB] w-12">
                          {impliedTask.sn}
                        </td>
                        <td className="px-4 py-2 flex gap-3 items-center justify-start bg-white border-r border-[#E5E9EB]">
                          <DotFilledIcon className="w-6 h-6" />
                          {task.strategic_pillars
                            .map((pillar) => pillar.title)
                            .join(", ")}
                        </td>
                        <td
                          className={` px-4 py-2 text-left capitalize ${
                            index % 2 === 0 && "border-r border-[#E5E9EB]"
                          }`}
                        >
                          {impliedTask.task}
                        </td>
                        <td
                          className={` px-4 py-2 ${
                            index % 2 === 0 && "border-r border-[#E5E9EB]"
                          }`}
                        >
                          {impliedTask.resources
                            .map((resource) => resource.name)
                            .join(", ")}
                        </td>
                        <td
                          className={`px-4 py-2 ${
                            index % 2 === 0 && "border-r border-[#E5E9EB]"
                          }`}
                        >
                          {impliedTask.start_date}
                        </td>
                        <td
                          className={`px-4 py-2 ${
                            index % 2 === 0 && "border-r border-[#E5E9EB]"
                          }`}
                        >
                          {impliedTask.end_date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
