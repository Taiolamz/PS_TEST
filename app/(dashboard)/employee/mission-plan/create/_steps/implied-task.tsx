"use client";

import * as yup from "yup";
import { CustomAccordion } from "@/components/custom-accordion";
import CustomDateInput from "@/components/custom-date-input";
import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/helpers/date-formatter";
import {
  ErrorMessage,
  Field,
  FieldArray,
  FormikProvider,
  useFormik,
} from "formik";
import { LucidePlusCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { v4 as uuidv4 } from "uuid";
import { useCreateImpliedTaskMutation } from "@/redux/services/mission-plan/impliedTaskApi";
import { toast } from "sonner";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { useLazyGetMyMissionPlanQuery } from "@/redux/services/mission-plan/missionPlanApi";
import {
  useGetAllDownlinersQuery,
  useGetAllEmployeesQuery,
} from "@/redux/services/employee/employeeApi";
import { PageLoader } from "@/components/custom-loader";
import { CustomMultipleSelect } from "@/components/inputs/custom-multiple-select";
import { isValid, parse } from "date-fns";

interface SubItem {
  task: string;
  user_id: string;
  specified_task_id: string;
  implied_task_id: string;
  weight: string;
  percentage: string;
  start_date: string;
  end_date: string;
  resources: string[];
  expected_outcomes: string[];
}

type ImpliedTaskType = {
  implied_tasks?: any[];
  title?: string;
  task: string;
  user_id: string;
  specified_task_id: string;
  implied_task_id: string;
  weight: string;
  percentage: string;
  start_date: string;
  end_date: string;
  resources: string[];
  expected_outcomes?: string[];
  expected_outcome?: string[];
  id?: string;
  is_main_effort?: boolean;
  mission_plan_id?: string;
  subItems?: SubItem[];
  strategic_pillars?: {
    label: string;
    id: string;
    value: string;
    color: string;
  }[];
};

// const validationSchema = yup.object({
//   tasks: yup.array().of(
//     yup.object({
//       task: yup.string().required("Task is required"),
//       specified_task_id: yup.string(),
//       weight: yup.string().required("Weight is required"),
//       percentage: yup.string().required("Percentage is required"),
//       start_date: yup
//         .string()
//         .required("Start date is required")
//         .test("valid-date", "Start date must be a valid date", (value) => {
//           const formattedDate = formatDate(value);
//           const parsedDate = parse(formattedDate, "yyyy-MM-dd", new Date());
//           return isValid(parsedDate);
//         }),
//       end_date: yup
//         .string()
//         .required("End date is required")
//         .test("valid-date", "End date must be a valid date", (value) => {
//           const formattedDate = formatDate(value);
//           const parsedDate = parse(formattedDate, "yyyy-MM-dd", new Date());
//           return isValid(parsedDate);
//         })
//         .test(
//           "is-greater",
//           "End date must be after start date",
//           function (value) {
//             const { start_date } = this.parent;
//             const formattedEndDate = formatDate(value);
//             const formattedStartDate = formatDate(start_date);
//             const parsedEndDate = parse(
//               formattedEndDate,
//               "yyyy-MM-dd",
//               new Date()
//             );
//             const parsedStartDate = parse(
//               formattedStartDate,
//               "yyyy-MM-dd",
//               new Date()
//             );

//             return (
//               isValid(parsedEndDate) &&
//               isValid(parsedStartDate) &&
//               parsedEndDate > parsedStartDate
//             );
//           }
//         ),
//       expected_outcomes: yup
//         .array()
//         .of(yup.string().required("Expected outcome is required")),
//       resources: yup
//         .array()
//         .of(yup.string().required("Resource ID is required"))
//         .min(1, "At least one resource is required")
//         .required("Resource is required"),
//     })
//   ),
// });

const subItemSchema = yup.object().shape({
  task: yup.string().required("Task is required"),
  // user_id: yup.string().required("User ID is required"),
  // specified_task_id: yup.string().required("Specified Task ID is required"),
  // implied_task_id: yup.string().required("Implied Task ID is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Weight must be a positive number"),
  percentage: yup
    .number()
    .typeError("Percentage must be a number")
    .required("Percentage is required")
    .min(0, "Percentage cannot be negative")
    .max(100, "Percentage cannot exceed 100"),
  start_date: yup.date().required("Start Date is required"),
  end_date: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("start_date"), "End Date cannot be before Start Date"),
  resources: yup
    .array()
    .of(yup.string().required("Resource ID is required"))
    .min(1, "At least one resource is required")
    .required("Resource is required"),

  // expected_outcomes: yup.array()
  //   .of(yup.string().required("Expected outcome is required"))
  //   .min(1, "At least one expected outcome is required")
  //   .required("Expected outcomes are required"),
});

const taskSchema = yup.object().shape({
  subItems: yup.array().of(subItemSchema).required("Sub-items are required"),
});

// const taskSchema = yup.object().shape({
//   subItems: yup
//     .array()
//     .of(subItemSchema)
//     .required("Sub-items are required")
//     .test("weights-sum", "Total weight must be equal to 100%", function (task) {
//       const weights = ((task as any).subItems as any[]).map((subItem) => subItem.weight);
//       const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
//       return totalWeight === 100;
//     }),
// });

// Define the schema for the entire form
const validationSchema = yup.object().shape({
  tasks: yup.array().of(taskSchema).required("Tasks are required"),
});

const { ADMIN } = routesPath;

const ImpliedTask = () => {
  const [createImpliedTask, { isLoading: isCreatingImpliedTask }] =
    useCreateImpliedTaskMutation();
  const router = useRouter();
  const [
    getMyMissionPlan,
    {
      data: mission_plan,
      isLoading: isLoadingMissionPlan,
      isFetching: isFetchingMissionPlan,
      isSuccess: fetchedMissionPlan,
    },
  ] = useLazyGetMyMissionPlanQuery({});

  const handleSubmit = async () => {
    // const payload = {
    //   ...formik.values,
    //   mission_plan_id: mission_plan?.data?.mission_plan?.id,
    //   tasks: formik.values.tasks.map((task) => ({
    //     task: task.task,
    //     resources: task.resources,
    //     specified_task_id: task.specified_task_id || "",
    //     implied_task_id: task.implied_task_id || "",
    //     weight: String(task.weight),
    //     percentage: String(task.percentage),
    //     start_date: task.start_date,
    //     end_date: task.end_date,
    //     expected_outcomes: task.expected_outcomes,
    //     subItems: [],
    //   })),
    // };
    const payload = { ...formik.values };

    await createImpliedTask(payload)
      .unwrap()
      .then(() => {
        toast.success("Implied Task Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=boundaries`);
            // router.push(ADMIN);
          }, 2000);
        });
      });
  };

  const { mission_plan: mission_plan_info } = useAppSelector(
    (state) => state.mission_plan
  );

  const FISCAL_YEAR_ID = mission_plan_info?.active_fy_info?.id || "";
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllDownlinersQuery();

  const formattedEmployeesDrop = useMemo(() => {
    return (
      (employeesData as Downliners[])?.map((chi) => ({
        ...chi,
        label: chi?.name,
        value: chi?.id,
        id: chi?.id,
      })) || []
    );
  }, [employeesData]);

  const handleGetMyMissionPlan = async () => {
    const payload = { id: FISCAL_YEAR_ID };
    getMyMissionPlan(payload)
      .unwrap()
      .then((payload) => {
        // console.log("testing", payload);
        if (payload?.data?.mission_plan?.specified_tasks?.length > 0) {
          const impliedTasks = payload?.data?.mission_plan?.specified_tasks;
          const mappedTasks = formattedData(impliedTasks);
          formik.setFieldValue("tasks", mappedTasks);
        }
      });
  };

  const formattedData = (items: ImpliedTaskType[]) => {
    const newData = items?.flatMap((item: any) => {
      if (!item?.implied_tasks?.length) {
        return [
          {
            title: item.task || "",
            task: "",
            user_id: "",
            specified_task_id: item.id || "",
            implied_task_id: "",
            weight: "",
            percentage: item.percentage || "",
            start_date: "",
            end_date: "",
            resources: item.resources || [],
            subItems: [],
          },
        ];
      }
      return item.implied_tasks.map((chi: any) => {
        return {
          title: item?.task || "",
          task: chi?.task || "",
          user_id: "",
          specified_task_id: item?.id || "",
          implied_task_id: chi?.id || "",
          weight: chi?.weight || "",
          percentage: chi?.percentage || "",
          start_date: chi?.start_date || chi?.start_date || "",
          end_date: chi?.end_date || chi?.end_date || "",
          resources: (chi?.resources || [])?.map(
            (resource: { staff_member_id: string }) => resource?.staff_member_id
          ),
          expected_outcomes: chi?.expected_outcome || "",
          subItems: [],
        };
      });
    });
    return newData;
  };

  interface Task {
    task: string;
    weight: number;
    percentage: number;
    resources: any[];
    start_date: string;
    end_date: string;
    subItems: SubItem[];
  }
  const initialValues: {
    tasks: any[];
  } = {
    tasks: [
      {
        specified_task_id: "",
        subItems: [
          {
            task: "",
            user_id: "",
            implied_task_id: "",
            weight: "",
            percentage: "",
            start_date: "",
            end_date: "",
            resources: [],
            expected_outcomes: [""],
          },
        ],
      },
    ],
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    handleGetMyMissionPlan();
  }, [FISCAL_YEAR_ID]);

  const errorTasks = formik.errors.tasks as any;
  const touchedTasks = formik.touched.tasks as any;

  console.log(errorTasks, "error check");

  // const [impliedTasks, setImpliedTasks] = useState(formik.values.tasks);

  // console.log(impliedTasks, "state tasks");
  // console.log(formik.values.tasks, "formik tasks");

  const formatImpliedTasks = () => {
    const newData = formik.values.tasks?.map((chi) => {
      return {
        ...chi,
        subItems: [],
      };
    });
    return newData;
  };

  // const handleAddMoreImpliedTasks = (index: number) => {
  //   formik.setFieldValue("tasks", (prevData: any) => {
  //     const newData = [...prevData];
  //     const targetItem = newData[index];
  //     newData[index] = {
  //       ...targetItem,
  //       subItems: [
  //         ...targetItem.subItems,
  //         {
  //           task: "",
  //           user_id: "",
  //           specified_task_id: "",
  //           implied_task_id: "",
  //           weight: "",
  //           percentage: "",
  //           start_date: "",
  //           end_date: "",
  //           resources: [],
  //           expected_outcomes: [""],
  //         },
  //       ],
  //     };
  //     return newData;
  //   });
  // };
  console.log(formik.errors, "formik errors");

  const handleAddMoreImpliedTasks = (index: number) => {
    const currentSubItems = formik.values.tasks[index].subItems || [];
    const newSubItem = {
      task: "",
      user_id: "",
      specified_task_id: "",
      implied_task_id: "",
      weight: "",
      percentage: "",
      start_date: "",
      end_date: "",
      resources: [],
      expected_outcomes: [""],
    };

    const updatedSubItems = [...currentSubItems, newSubItem];

    // Update the Formik field value
    formik.setFieldValue(`tasks.${index}.subItems`, updatedSubItems);
  };

  const handleDeleteSubItem = (taskIndex: number, subItemIndex: number) => {
    // Get the current subItems array
    const currentSubItems = formik.values.tasks[taskIndex].subItems || [];

    // Remove the subItem at the given index
    const updatedSubItems = (currentSubItems as any[]).filter(
      (_, index) => index !== subItemIndex
    );

    // Log for debugging

    // Update Formik values
    formik.setFieldValue(`tasks.${taskIndex}.subItems`, updatedSubItems);
  };
  console.log(formik.values.tasks, "formik");
  console.log(touchedTasks, "touching things");
  // const [data, setData] = useState<any[]>([
  //   {
  //     name: "hassan",
  //     id: "2",
  //     score: 3,
  //     subItems: [], // Initialize with an empty array for subItems
  //   },
  //   {
  //     name: "taiwo",
  //     id: "4",
  //     score: 9,
  //     subItems: [], // Initialize with an empty array for subItems
  //   },
  //   {
  //     name: "micha",
  //     id: "9",
  //     score: 9,
  //     subItems: [], // Initialize with an empty array for subItems
  //   },
  // ]);

  // const handleAddMore = (index: number) => {
  //   setData((prevData) => {
  //     // Clone the current data
  //     const newData = [...prevData];
  //     // Get the target item
  //     const targetItem = newData[index];

  //     // Add a new subItem to the target item's subItems array
  //     newData[index] = {
  //       ...targetItem,
  //       subItems: [
  //         ...targetItem.subItems,
  //         {
  //           title: "",
  //           id: "",
  //           score: "",
  //           add_more: "",
  //         },
  //       ],
  //     };

  //     return newData;
  //   });
  // };

  // const handleDeleteSubItem = (itemIndex: number, subItemIndex: number) => {
  //   setData((prevData) => {
  //     const newData = [...prevData];
  //     const targetItem = newData[itemIndex];

  //     newData[itemIndex] = {
  //       ...targetItem,
  //       subItems: (targetItem.subItems as any[]).filter(
  //         (_, i) => i !== subItemIndex
  //       ),
  //     };

  //     return newData;
  //   });
  // };

  return (
    <>
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div className="pr-4">
          <h2>Implied Task</h2>

          <form onSubmit={formik.handleSubmit} className="mt-7">
            <FormikProvider value={formik}>
              <FieldArray name="tasks">
                {({ insert, remove, push }) => (
                  <div>
                    {formik.values.tasks &&
                      formik.values.tasks.length > 0 &&
                      formik.values.tasks?.map(
                        (task: ImpliedTaskType, index: number) => (
                          <div
                            key={task.implied_task_id}
                            className="grid gap-y-5 items-center space-x-2 w-full mb-5 relative"
                          >
                            <p
                              className="text-red-500 text-xs ml-auto cursor-pointer"
                              onClick={() => remove(index)}
                            >
                              Remove Specified task
                            </p>
                            <CustomAccordion
                              key={task.implied_task_id}
                              triggerClass="border border-custom-divider px-4 py-2 rounded-sm mb-4"
                              className="mb-4 rounded w-full flex flex-col gap-1"
                              contentClass="border border-custom-divider px-5 py-6 rounded-sm"
                              contentWrapperClass="overflow-visible"
                              title={
                                <p className="font-medium text-sm text-graySecondary">
                                  {/* Achieve $1 Billion in Company Revenue for the
                            Financial year */}
                                  {/* the title should come from another array */}
                                  {task?.title ||
                                    `${index + 1}. Specified task`}
                                </p>
                              }
                              content={
                                <div className="flex flex-col gap-3">
                                  {/* <div> */}
                                  {/* <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4">
                                      <div>
                                        <Input
                                          type="text"
                                          id={`tasks.${index}.task`}
                                          label={`Task ${index + 1}`}
                                          labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                          onBlur={formik.handleBlur}
                                          onChange={formik.handleChange}
                                          name={`tasks.${index}.task`}
                                          placeholder="Input Task"
                                          className="mr-2 w-full"
                                          value={
                                            formik.values.tasks[index].task
                                          }
                                        />
                                      </div>
                                      <div>
                                        <Input
                                          type="number"
                                          id={`tasks.${index}.weight`}
                                          label="Input Weight"
                                          labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                          onBlur={formik.handleBlur}
                                          onChange={formik.handleChange}
                                          name={`tasks.${index}.weight`}
                                          placeholder="Input Weight"
                                          className="mr-2 w-full"
                                          value={
                                            formik.values.tasks[index].weight
                                          }
                                        />
                                        <ErrorMessage
                                          name={`intents.${index}.behaviours.value`}
                                          className="text-red-500 text-xs mt-1"
                                          component={"div"}
                                        />
                                      </div>
                                      <div>
                                        <Input
                                          type="number"
                                          id={`tasks.${index}.percentage`}
                                          label="Input Percentage"
                                          labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                          onBlur={formik.handleBlur}
                                          onChange={formik.handleChange}
                                          name={`tasks.${index}.percentage`}
                                          placeholder="Input Percentage"
                                          className="mr-2 w-full"
                                          value={
                                            formik.values.tasks[index]
                                              .percentage
                                          }
                                        />
                                        <ErrorMessage
                                          name={`intents.${index}.behaviours.value`}
                                          className="text-red-500 text-xs mt-1"
                                          component={"div"}
                                        />
                                      </div>
                                    </div> */}
                                  <>
                                    <div className="grid lg:grid-cols-3 gap-x-3 mt-2 ">
                                      {/* <div className="mt-1">
                                          <CustomMultipleSelect
                                            randomBadgeColor
                                            options={formattedEmployeesDrop}
                                            onValueChange={(values) =>
                                              formik.setFieldValue(
                                                `tasks.${index}.resources`,
                                                values
                                              )
                                            }
                                            label="Select Resources"
                                            name={`tasks.${index}.resources`}
                                            defaultValue={
                                              formik.values.tasks[index]
                                                .resources
                                            }
                                            placeholder="Select Resources"
                                            badgeClassName={`rounded-[20px] text-[10px] font-normal`}
                                            triggerClassName={`min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm p-1`}
                                            placeholderClass={`font-light text-sm text-[#6E7C87] opacity-70`}
                                            labelClass={`block text-xs text-[#6E7C87] font-normal mt-1 p-0 pb-[9px]`}
                                            error={
                                              errorTasks?.[index]?.resources
                                            }
                                            touched={
                                              touchedTasks?.[index]?.resources
                                            }
                                            maxCount={6}
                                            onBlur={() =>
                                              formik.setFieldTouched(
                                                `tasks.${index}.resources`,
                                                true
                                              )
                                            }
                                          />
                                        </div> */}
                                      {/* <div className="grid col-span-2 grid-cols-2 gap-3 w-[60%]">
                                        <CustomDateInput
                                          id={`tasks.${index}.start_date`}
                                          label="Start Date"
                                          selected={
                                            formik.values.tasks[index]
                                              .start_date as any
                                          }
                                          handleChange={(date) =>
                                            formik.setFieldValue(
                                              `tasks.${index}.start_date`,
                                              formatDate(date)
                                            )
                                          }
                                          error={""}
                                          className="relative pr-8 w-full"
                                          iconClass="top-[2.7rem] right-3"
                                          inputClass=" "
                                          isRequired
                                        />
                                        <CustomDateInput
                                          id={`tasks.${index}.end_date`}
                                          label="End Date"
                                          selected={
                                            formik.values.tasks[index]
                                              .end_date as any
                                          }
                                          handleChange={(date) =>
                                            formik.setFieldValue(
                                              `tasks.${index}.end_date`,
                                              formatDate(date)
                                            )
                                          }
                                          error={""}
                                          className="relative pr-8"
                                          iconClass="top-[2.7rem] right-3"
                                          isRequired
                                        />
                                      </div> */}
                                    </div>
                                  </>
                                  <div className="flex flex-col gap-5">
                                    {task.subItems &&
                                      task.subItems.length > 0 &&
                                      (task.subItems as SubItem[]).map(
                                        (subItem, subIndex) => {
                                          console.log("SubItem:", subItem);

                                          return (
                                            <div key={subIndex} className=" ">
                                              <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4">
                                                <div className="relative">
                                                  <Input
                                                    type="text"
                                                    id={`tasks.${index}.subItems.${subIndex}.task`}
                                                    label={`Task ${
                                                      subIndex + 1
                                                    }`}
                                                    // label={`Subtask ${
                                                    //   subIndex + 1
                                                    // }`}
                                                    labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                    onBlur={formik.handleBlur}
                                                    onChange={
                                                      formik.handleChange
                                                    }
                                                    name={`tasks.${index}.subItems.${subIndex}.task`}
                                                    placeholder="Input task"
                                                    className="mr-2 w-full"
                                                    value={
                                                      formik.values.tasks[index]
                                                        .subItems[subIndex].task
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name={`tasks.${index}.subItems.${subIndex}.task`}
                                                    className="text-red-500 text-xs mt-1 absolute"
                                                    component={"div"}
                                                  />
                                                </div>
                                                <div className="relative">
                                                  <Input
                                                    type="number"
                                                    id={`tasks.${index}.subItems.${subIndex}.weight`}
                                                    label="Input Weight"
                                                    labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                    onBlur={formik.handleBlur}
                                                    onChange={
                                                      formik.handleChange
                                                    }
                                                    name={`tasks.${index}.subItems.${subIndex}.weight`}
                                                    placeholder="Input Weight"
                                                    className="mr-2 w-full"
                                                    value={
                                                      formik.values.tasks[index]
                                                        .subItems[subIndex]
                                                        .weight
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name={`tasks.${index}.subItems.${subIndex}.weight`}
                                                    className="text-red-500 text-xs mt-1 absolute"
                                                    component={"div"}
                                                  />
                                                </div>
                                                <div className="relative">
                                                  <Input
                                                    type="number"
                                                    id={`tasks.${index}.subItems.${subIndex}.percentage`}
                                                    label="Input Percentage"
                                                    labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                    onBlur={formik.handleBlur}
                                                    onChange={
                                                      formik.handleChange
                                                    }
                                                    name={`tasks.${index}.subItems.${subIndex}.percentage`}
                                                    placeholder="Input Percentage"
                                                    className="mr-2 w-full"
                                                    value={
                                                      formik.values.tasks[index]
                                                        .subItems[subIndex]
                                                        .percentage
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name={`tasks.${index}.subItems.${subIndex}.percentage`}
                                                    className="text-red-500 text-xs mt-1 absolute"
                                                    component={"div"}
                                                  />
                                                </div>
                                              </div>
                                              <div className="grid lg:grid-cols-3 gap-x-3 mt-6 ">
                                                <div className="mt-1 relative">
                                                  <CustomMultipleSelect
                                                    options={
                                                      formattedEmployeesDrop
                                                    }
                                                    onValueChange={(values) =>
                                                      formik.setFieldValue(
                                                        `tasks.${index}.subItems.${subIndex}.resources`,
                                                        values
                                                      )
                                                    }
                                                    label="Select Resources"
                                                    name={`tasks.${index}.subItems.${subIndex}.resources`}
                                                    defaultValue={
                                                      formik.values.tasks[index]
                                                        .subItems[subIndex]
                                                        .resources
                                                    }
                                                    placeholder="Select Resources"
                                                    badgeClassName={`rounded-[20px] text-[10px] font-normal`}
                                                    triggerClassName={`min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm p-1`}
                                                    placeholderClass={`font-light text-sm text-[#6E7C87] opacity-70`}
                                                    labelClass={`block text-xs text-[#6E7C87] font-normal mt-1 p-0 pb-[9px]`}
                                                    error={
                                                      errorTasks?.[index]
                                                        ?.subItems?.[subIndex]
                                                        ?.resources
                                                    }
                                                    touched={
                                                      touchedTasks?.[index]
                                                        ?.subItems?.[subIndex]
                                                        ?.resources
                                                    }
                                                    maxCount={6}
                                                    onBlur={() =>
                                                      formik.setFieldTouched(
                                                        `tasks.${index}.subItems.${subIndex}.resources`,
                                                        true
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="grid col-span-2 grid-cols-2 gap-3 w-[60%] relative place-items-center">
                                                  <div className="flex flex-col gap-1">
                                                    <CustomDateInput
                                                      onBlur={() =>
                                                        formik.setFieldTouched(
                                                          `tasks.${index}.subItems.${subIndex}.start_date`,
                                                          true
                                                        )
                                                      }
                                                      id={`tasks.${index}.subItems.${subIndex}.start_date`}
                                                      label="Start Date"
                                                      selected={
                                                        formik.values.tasks[
                                                          index
                                                        ].subItems[subIndex]
                                                          .start_date as any
                                                      }
                                                      handleChange={(date) =>
                                                        formik.setFieldValue(
                                                          `tasks.${index}.subItems.${subIndex}.start_date`,
                                                          formatDate(date)
                                                        )
                                                      }
                                                      //   <ErrorMessage
                                                      //   name={`tasks.${index}.subItems.${subIndex}.task`}
                                                      //   className="text-red-500 text-xs mt-1"
                                                      //   component={"div"}
                                                      // />
                                                      // error={`tasks.${index}.subItems.${subIndex}.start_date`}
                                                      error={
                                                        errorTasks?.[index]
                                                          ?.subItems?.[subIndex]
                                                          ?.start_date
                                                      }
                                                      touched={
                                                        touchedTasks?.[index]
                                                          ?.subItems?.[subIndex]
                                                          ?.start_date
                                                      }
                                                      className="relative pr-8 w-full"
                                                      iconClass="top-[2.7rem] right-3"
                                                      inputClass=" "
                                                      isRequired
                                                    />

                                                    {/* {touchedTasks?.[index]
                                                      ?.subItems?.[subIndex]
                                                      ?.start_date ? (
                                                      <p className="text-red-500 text-xs mt-1">
                                                        {
                                                          errorTasks?.[index]
                                                            ?.subItems?.[
                                                            subIndex
                                                          ]?.start_date
                                                        }
                                                      </p>
                                                    ) : null} */}
                                                  </div>

                                                  <div className="flex flex-col gap-1">
                                                    <CustomDateInput
                                                      id={`tasks.${index}.subItems.${subIndex}.end_date`}
                                                      label="End Date"
                                                      selected={
                                                        formik.values.tasks[
                                                          index
                                                        ].subItems[subIndex]
                                                          .end_date as any
                                                      }
                                                      handleChange={(date) =>
                                                        formik.setFieldValue(
                                                          `tasks.${index}.subItems.${subIndex}.end_date`,
                                                          formatDate(date)
                                                        )
                                                      }
                                                      onBlur={() =>
                                                        formik.setFieldTouched(
                                                          `tasks.${index}.subItems.${subIndex}.end_date`,
                                                          true
                                                        )
                                                      }
                                                      // error={`tasks.${index}.subItems.${subIndex}.end_date`}
                                                      error={
                                                        errorTasks?.[index]
                                                          ?.subItems?.[subIndex]
                                                          ?.end_date
                                                      }
                                                      touched={
                                                        touchedTasks?.[index]
                                                          ?.subItems?.[subIndex]
                                                          ?.end_date
                                                      }
                                                      className="relative pr-8"
                                                      iconClass="top-[2.7rem] right-3"
                                                      isRequired
                                                    />
                                                    {/* <p className="text-red-500 text-xs mt-1">
                                                      {
                                                        errorTasks?.[index]
                                                          ?.subItems?.[subIndex]
                                                          ?.end_date
                                                      }
                                                    </p> */}
                                                  </div>
                                                </div>
                                                <div
                                                  className="absolute right-0 mr-5 cursor-pointer"
                                                  onClick={() =>
                                                    handleDeleteSubItem(
                                                      index,
                                                      subIndex
                                                    )
                                                  }
                                                >
                                                  <Icon
                                                    name="remove"
                                                    width={14.28}
                                                    height={18.63}
                                                  />
                                                </div>
                                              </div>
                                              {/* <button
                                                type="button"
                                                // onClick={() =>
                                                //   handleDeleteSubItem(
                                                //     index,
                                                //     subIndex
                                                //   )
                                                // }
                                                className="mt-2 text-red-500 hover:text-red-700"
                                              >
                                                Delete Subitem
                                              </button> */}
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>

                                  <div className="flex gap-2 items-center mt-3 ">
                                    <div
                                      className="flex gap-2 items-center cursor-pointer"
                                      onClick={() =>
                                        handleAddMoreImpliedTasks(index)
                                      }
                                    >
                                      <LucidePlusCircle
                                        size={28}
                                        className="mr-2 text-primary"
                                      />
                                      <p className="text-primary">
                                        Add new Task
                                      </p>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </div>
                              }
                            />

                            {/* <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 absolute -right-6 top-2"
                            >
                              <Icon
                                name="remove"
                                width={14.28}
                                height={18.63}
                              />
                            </button> */}
                          </div>
                        )
                      )}

                    <button
                      type="button"
                      onClick={() =>
                        push({
                          task: "",
                          user_id: "",
                          specified_task_id: "",
                          implied_task_id: uuidv4(),
                          weight: "",
                          percentage: "",
                          start_date: "",
                          end_date: "",
                          resources: [],
                          expected_outcomes: [""],
                          subItems: [
                            {
                              task: "",
                              user_id: "",
                              specified_task_id: "",
                              implied_task_id: "",
                              weight: "",
                              percentage: "",
                              start_date: "",
                              end_date: "",
                              resources: [],
                              expected_outcomes: [""],
                            },
                          ],
                        })
                      }
                      className="flex items-center gap-2 mt-8 text-primary text-sm"
                    >
                      Add more level
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="mt-8 flex gap-x-2 items-center">
                <Button
                  type="button"
                  variant="outline"
                  className={`text-primary py-5 px-2 rounded-sm bg-transparent border border-primary min-w-28`}
                  onClick={router.back}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isCreatingImpliedTask}
                  loading={isCreatingImpliedTask}
                  loadingText="Save & Continue"
                  className={cn(
                    "w-full",
                    !formik.isValid || !formik.dirty
                      ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm "
                      : "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
                  )}
                >
                  Save & Continue
                </Button>
              </div>
            </FormikProvider>
          </form>
          <div>
            {/* {data.map((item, index) => (
              <div key={index}>
                <h3>{item.name}</h3>
                <p>ID: {item.id}</p>
                <p>Score: {item.score}</p>
                <button onClick={() => handleAddMore(index)}>Add More</button>
                {(item.subItems as any[]).map((subItem, subIndex) => (
                  <div key={subIndex} style={{ marginLeft: "20px" }}>
                    <p>Subitem Name: {subItem.name}</p>
                    <p>Subitem ID: {subItem.id}</p>
                    <p>Subitem Score: {subItem.score}</p>
                    <p>Subitem Add More: {subItem.add_more}</p>
                    <button
                      onClick={() => handleDeleteSubItem(index, subIndex)}
                    >
                      Delete Subitem
                    </button>
                  </div>
                ))}
              </div>
            ))} */}
          </div>
          <div className="mt-7"></div>
        </div>
      )}
    </>
  );
};

export default ImpliedTask;
