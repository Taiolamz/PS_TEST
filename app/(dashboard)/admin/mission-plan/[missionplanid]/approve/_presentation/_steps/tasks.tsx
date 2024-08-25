import React from "react";
import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";
import { ChevronUp, Loader2 } from "lucide-react";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";

type Props = {
  data: SpecifiedTasksType[];
  isLoading: boolean;
};
const Tasks = ({ data, isLoading }: Props) => {
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
                    <div className="border border-[#119C2B] text-[#119C2B] bg-[#119C2B0D] px-2.5 py-[0.3125rem] rounded-[0.1875rem]">
                      Approved
                    </div>
                    <ChevronUp className="text-primary" />
                  </div>
                </div>
                <h3 className="text-[1.095rem] text-[#1E1E1E] ">
                  {specifiedTask?.task}
                </h3>
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
                      <p className="text-base fot-bold text-[#015858]">20%</p>
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
                      {formatToReadableDate(specifiedTask?.start_date)} -
                      {formatToReadableDate(specifiedTask?.end_date)}
                    </p>
                  </div>
                </div>
                <hr className="my-[1.4375rem]" />

                {/* Implied Tasks */}
                <div>
                  {specifiedTask?.implied_tasks?.length ? (
                    specifiedTask?.implied_tasks?.map((impliedTask, index) => (
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
                                  ? impliedTask?.resources.map((resource) => (
                                      <p
                                        className="p-[0.3125rem] text-primary text-xs capitalize rounded-[0.625rem]"
                                        style={{
                                          backgroundColor: colorWithAlpha,
                                        }}
                                        key={resource?.staff_member_id}
                                      >
                                        {resource.name}
                                      </p>
                                    ))
                                  : "no resource assigned."}
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                              Duration
                            </p>
                            <p className="text-[#5A5B5F] font-medium">
                              {formatToReadableDate(impliedTask.start_date)} -
                              {formatToReadableDate(impliedTask.start_date)}
                            </p>
                          </div>

                          <div className="col-span-1">
                            <p className="text-[#6E7C87] mb-[0.5625rem] font-medium">
                              Weight
                            </p>
                            <p className="text-xl text-[#015858] font-medium">
                              {impliedTask?.percentage
                                ? impliedTask?.percentage + "%"
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm">
                      no implied tasks found.
                    </p>
                  )}
                </div>
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

// import React from "react";
// import { DotFilledIcon } from "@radix-ui/react-icons";
// import { SpecifiedTasksType } from "@/@types/missionPlan/MissionPlanAprovables";
// import { formatToDDMMYYYY } from "@/utils/helpers/date-formatter";
// import { Loader2 } from "lucide-react";
// import ActionContext from "@/app/(dashboard)/context/ActionContext";
// import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";

// type Props = {
//   data: SpecifiedTasksType[];
//   isLoading: boolean;
// };

// export type TaskRowsTemplateType = {
//   id: number;
//   goal?: string;
//   strategic_pillars: {
//     id: string;
//     title: string;
//   }[];
//   implied_tasks: {
//     sn: number;
//     task: string;
//     resources: {
//       staff_member_id: string;
//       name: string;
//     }[];
//     start_date: string;
//     end_date: string;
//   }[];
// };

// const Tasks = ({ data, isLoading }: Props) => {
//   const { primaryColorHexValue } = React.useContext(ActionContext);
//   const colorWithAlpha = primaryColorHexValue
//     ? addAlphaToHex(primaryColorHexValue, 0.05)
//     : "";

//   const transformedMeasureOfSuccessRows = (
//     mappedData: SpecifiedTasksType[]
//   ): TaskRowsTemplateType[] => {
//     return mappedData?.map((item, index) => ({
//       id: index + 1,
//       goal: item?.task,
//       strategic_pillars: item.strategic_pillars,
//       implied_tasks: item.implied_tasks.map((impliedTask, impliedIndex) => ({
//         sn: impliedIndex + 1,
//         task: impliedTask.task,
//         resources: impliedTask.resources,
//         start_date: impliedTask.start_date,
//         end_date: impliedTask.end_date,
//       })),
//     }));
//   };

//   const taskData: TaskRowsTemplateType[] =
//     transformedMeasureOfSuccessRows(data);

//   return (
//     <div className="border rounded-[0.5rem] w-full mx-auto text-center mb-10 pb-[1.375rem] pt-[2.625rem]">
//       <section>
//         <h2 className="text-primary font-medium text-2xl">
//           Specified/Implied Task
//         </h2>
//         <div className="w-[77%] mx-auto overflow-x-auto">
//           {isLoading ? (
//             <div className="w-full flex justify-center items-center">
//               <Loader2 className="w-6 h-6 animate-spin mr-1" />
//             </div>
//           ) : (
//             <div className="p-4 overflow-scroll">
//               {taskData.length ? (
//                 taskData.map((task) => (
//                   <div key={task.id} className="mb-9">
//                     <div
//                       className="grid grid-cols-7 px-[0.5625rem] py-3.5 min-w-full"
//                       style={{ backgroundColor: colorWithAlpha }}
//                     >
//                       <p className="col-span-2 justify-self-start text-primary text-xs font-medium">
//                         Task {task.id}
//                       </p>
//                       <h3 className="col-span-5 justify-self-start text-primary text-sm font-medium whitespace-nowrap">
//                         {task.goal}
//                       </h3>
//                     </div>
//                     <table className="min-w-full text-xs w-full">
//                       <thead>
//                         <tr className="bg-[#F4F4F4] text-left w-full">
//                           <th className="px-4 py-2 border-b font-medium w-12">
//                             S/N
//                           </th>
//                           <th className="px-4 py-2 border-b capitalize font-medium">
//                             Pillars
//                           </th>
//                           <th className="px-4 py-2 border-b capitalize font-medium">
//                             Implied Tasks
//                           </th>
//                           <th className="px-4 py-2 border-b capitalize font-medium">
//                             Resources
//                           </th>
//                           <th className="px-4 py-2 border-b capitalize font-medium">
//                             Start Date
//                           </th>
//                           <th className="px-4 py-2 border-b capitalize font-medium">
//                             End Date
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="border-b border-[#E5E9EB] w-full">
//                         {task.implied_tasks.map((impliedTask, index) => (
//                           <tr
//                             key={impliedTask.sn}
//                             className={`w-full border-x border-[#E5E9EB] hover:bg-gray-50 text-left ${
//                               index % 2 === 0
//                                 ? "bg-white border-r border-[#E5E9EB]"
//                                 : "bg-[#F4F4F4]"
//                             }`}
//                           >
//                             <td className="px-4 py-2 font-medium border-r border-[#E5E9EB] w-12">
//                               {impliedTask.sn}
//                             </td>
//                             <td className="px-4 py-2 font-medium bg-white border-r border-[#E5E9EB]">
//                               <div className="flex gap-3 items-center justify-start capitalize">
//                                 <DotFilledIcon className="w-6 h-6" />
//                                 <span>
//                                   {task.strategic_pillars
//                                     .map((pillar) => pillar.title)
//                                     .join(", ")}
//                                 </span>
//                               </div>
//                             </td>
//                             <td
//                               className={`px-4 py-2 font-medium text-left capitalize w-[28%] ${
//                                 index % 2 === 0 && "border-r border-[#E5E9EB]"
//                               }`}
//                             >
//                               {impliedTask.task}
//                             </td>
//                             <td
//                               className={`px-4 py-2 font-medium w-[28%] capitalize ${
//                                 index % 2 === 0 && "border-r border-[#E5E9EB]"
//                               }`}
//                             >
//                               {impliedTask.resources
//                                 .map((resource) => resource.name)
//                                 .join(", ")}
//                             </td>
//                             <td
//                               className={`px-4 py-2 font-medium w-[6.75rem] ${
//                                 index % 2 === 0 && "border-r border-[#E5E9EB]"
//                               }`}
//                             >
//                               {formatToDDMMYYYY(impliedTask.start_date)}
//                             </td>
//                             <td
//                               className={`px-4 py-2 font-medium w-[6.75rem] ${
//                                 index % 2 === 0 && "border-r border-[#E5E9EB]"
//                               }`}
//                             >
//                               {formatToDDMMYYYY(impliedTask.end_date)}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center text-gray-500">No results.</div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Tasks;
