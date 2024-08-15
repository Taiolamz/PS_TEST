import { taskData } from "@/utils/data/dashboard/missionplan/dummy";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";

const Tasks = () => {
  return (
    <div className="border-[0.0313rem] border-[#f7f7f7] shadow-md w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem]">
      <section className="">
        {" "}
        <h2 className="text-primary font-medium text-2xl">
          Specified/Implied Task
        </h2>
        <div className="w-[77%] mx-auto overflow-x-auto">
          <div>
            {/* Table */}
            <div className="p-4 overflow-scroll">
              {taskData.map((task) => (
                <div key={task.id} className="mb-9">
                  <div className="grid grid-cols-5 bg-[#0080800D] px-[0.5625rem] py-3.5 min-w-full">
                    <p className="col-span-1 justify-self-start text-primary text-xs font-medium">
                      {task.id}
                    </p>
                    <h3 className="col-span-4  justify-self-start 2xl:justify-self-center text-primary text-sm font-medium whitespace-nowrap">
                      {task.goal}
                    </h3>
                  </div>{" "}
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="bg-[#F4F4F4] text-left">
                        <th className="px-4 py-2 border-b">S/N</th>
                        <th className="px-4 py-2 border-b">Pillars</th>
                        <th className="px-4 py-2 border-b">Implied Tasks</th>
                        <th className="px-4 py-2 border-b">Resources</th>
                        <th className="px-4 py-2 border-b">Start Date</th>
                        <th className="px-4 py-2 border-b">End Date</th>
                      </tr>
                    </thead>
                    <tbody className="border-b border-[#E5E9EB]">
                      {task.items.map((item, index) => (
                        <tr
                          key={item.sn}
                          className={`border-x border-[#E5E9EB] hover:bg-gray-50 text-left ${
                            index % 2 === 0
                              ? "bg-white border-r border-[#E5E9EB]"
                              : "bg-[#F4F4F4]"
                          }`}
                        >
                          <td className="px-4 py-2 border-r border-[#E5E9EB] ">
                            {item.sn}
                          </td>
                          <td className="px-4 py-2 flex gap-3 items-center bg-white border-r border-[#E5E9EB]">
                            <DotFilledIcon className="w-6 h-6" />
                            {item.pillar}
                          </td>
                          <td
                            className={` px-4 py-2 ${
                              index % 2 === 0 && "border-r border-[#E5E9EB]"
                            }`}
                          >
                            {item.task}
                          </td>
                          <td
                            className={` px-4 py-2 ${
                              index % 2 === 0 && "border-r border-[#E5E9EB]"
                            }`}
                          >
                            {item.resources}
                          </td>
                          <td
                            className={`px-4 py-2 ${
                              index % 2 === 0 && "border-r border-[#E5E9EB]"
                            }`}
                          >
                            {item.startDate}
                          </td>
                          <td
                            className={`px-4 py-2 ${
                              index % 2 === 0 && "border-r border-[#E5E9EB]"
                            }`}
                          >
                            {item.endDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
