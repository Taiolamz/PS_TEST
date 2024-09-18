"use client";

import * as yup from "yup";
import { CustomAccordion } from "@/components/custom-accordion";
import CustomDateInput from "@/components/custom-date-input";
import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/helpers/date-formatter";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  useCreateImpliedTaskMutation,
  useDeleteImpliedTaskMutation,
  // useReAssignImpliedTaskMutation,
} from "@/redux/services/mission-plan/impliedTaskApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import {
  useDeleteSpecifiedTaskMutation,
  useLazyGetMyMissionPlanQuery,
} from "@/redux/services/mission-plan/missionPlanApi";
import { useGetAllDownlinersQuery } from "@/redux/services/employee/employeeApi";
import { PageLoader } from "@/components/custom-loader";
import { CustomMultipleSelect } from "@/components/inputs/custom-multiple-select";
import DashboardModal from "@/app/(dashboard)/admin/branches/_components/checklist-dashboard-modal";
import DeleteSpecifiedTask from "./delete-specified-task";
import useDisclosure from "@/utils/hooks/useDisclosure";
import DeleteImpliedTaskModal from "./delete-implied-task";
import TransferSpecifiedTask from "./transfer-specified-task";
import ImpliedTaskNotify from "./implied-task-notify";
import TransferImpliedTaskOrWeight from "./transfer-implied-task";
import routesPath from "@/utils/routes";

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

const taskWeightNumber = (weightString: string) =>
  parseFloat(weightString) || 0;

const implied_taskschema = yup.object().shape({
  tasks: yup.array().of(
    yup.object().shape({
      implied_tasks: yup
        .array()
        .of(
          yup.object().shape({
            weight: yup
              .number()
              .required("Weight is required")
              .max(100, "Weight must not exceed 100"),
            percentage: yup
              .array()
              .of(yup.number().required("Percentage is required")),
          })
        )
        .test(
          "sum-not-exceed",
          "Total weight must not exceed task weight",
          function (impliedTasks: any) {
            const taskWeight = taskWeightNumber(this.parent.weight);
            const totalWeight = impliedTasks.reduce(
              (sum: any, item: any) => sum + (item.weight || 0),
              0
            );
            return totalWeight <= taskWeight;
          }
        ),
    })
  ),
  task: yup.string().required("Task is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .max(100, "Weight cannot be more than 100"),
  // percentage: yup
  //   .number()
  //   .typeError("Percentage must be a number")
  //   .required("Percentage is required")
  //   .min(0, "Percentage cannot be negative")
  //   .max(100, "Percentage cannot exceed 100"),
  start_date: yup.date().required("Start Date is required"),
  end_date: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("start_date"), "End Date cannot be before Start Date"),
  percentage: yup
    .array()
    .of(yup.number().min(0).max(100))
    .test("sum", "The sum of percentages must be exactly 100", (value: any) => {
      if (!value) return true;
      const total = value.reduce(
        (acc: number, curr: number) => acc + (curr || 0),
        0
      );
      return total === 100; // Check if the total is exactly 100
    }),
  // resources: yup
  //   .array()
  //   .of(yup.string().required("Resource ID is required"))
  //   .min(1, "At least one resource is required")
  //   .required("Resource is required"),
});

const taskSchema = yup.object().shape({
  implied_tasks: yup
    .array()
    .of(implied_taskschema)
    .required("Sub-items are required"),
});

const validationSchema = yup.object().shape({
  tasks: yup.array().of(taskSchema).required("Tasks are required"),
});

// const { ADMIN } = routesPath;

interface myComponentProps {
  onNextStep?: () => void;
}

const ImpliedTask = ({ onNextStep }: myComponentProps) => {
  const [createImpliedTask, { isLoading: isCreatingImpliedTask }] =
    useCreateImpliedTaskMutation();

  const [deleteImpliedTask, { isLoading: isDeletingImpliedTask }] =
    useDeleteImpliedTaskMutation();

  const [deleteSpecifiedTask, { isLoading: isDeletingSpecifiedTask }] =
    useDeleteSpecifiedTaskMutation();

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

  const infoIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00001C14.6673 4.31811 11.6825 1.33334 8.00065 1.33334C4.31875 1.33334 1.33398 4.31811 1.33398 8.00001C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z"
        fill="#84919A"
      />
      <path
        d="M8.9215 4.59995C9.38293 4.59995 9.61365 4.914 9.61365 5.27385C9.61365 5.72323 9.21282 6.13887 8.69112 6.13887C8.25414 6.13887 7.99932 5.8806 8.01137 5.4536C8.01137 5.09444 8.31474 4.59995 8.9215 4.59995ZM7.50173 11.487C7.1374 11.487 6.87052 11.2625 7.12535 10.2735L7.54339 8.52007C7.61605 8.23977 7.6281 8.12717 7.54339 8.12717C7.43423 8.12717 6.96178 8.32069 6.68182 8.51181L6.5 8.20878C7.38568 7.45602 8.40462 7.0149 8.84195 7.0149C9.20593 7.0149 9.26654 7.45326 9.08472 8.12717L8.60572 9.97015C8.52101 10.2956 8.55717 10.4078 8.64223 10.4078C8.75139 10.4078 9.10951 10.2728 9.46144 9.99219L9.66806 10.2725C8.80648 11.1496 7.86536 11.487 7.50173 11.487Z"
        fill="white"
      />
    </svg>
  );

  const { user } = useAppSelector((state) => state.auth);

  const missionPlanData =
    mission_plan?.data?.mission_plan?.specified_tasks ?? [];
  const missionPlanID = mission_plan?.data?.mission_plan?.id;

  const [isWeightValid, setIsWeightValid] = useState(true);
  const [taskName, setTaskName] = useState("");

  const { ADMIN } = routesPath;

  const handleSubmit = async () => {
    // console.log({ ...formik.values }, "initial values");
    if (!isWeightValid) {
      toast.error(
        `Implied Task Weight must sum up to the specified task weight for (${taskName}) `
      );
      return;
    }
    const obj = {
      mission_plan_id: formik?.values?.mission_plan_id,
      tasks: formik?.values?.tasks.flatMap((task) => {
        return (task.implied_tasks as any[]).map((impliedTask) => ({
          start_date: impliedTask.start_date,
          end_date: impliedTask.end_date,
          task: impliedTask.task,
          weight: impliedTask.weight,
          implied_task_id: impliedTask.implied_task_id,
          // resources: impliedTask.resources.map((resource: any) => resource.id),
          resources: impliedTask.resources.map(
            (resource: any, idx: number) => ({
              staff_member_id: resource.id,
              percentage: impliedTask.percentage[idx],
            })
          ),
          specified_task_id: task.specified_task_id,
        }));
      }),
    };
    // console.log(obj, "objective");
    // return;
    await createImpliedTask(obj)
      .unwrap()
      .then(() => {
        toast.success("Implied Task Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            onNextStep && onNextStep();
            router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=boundaries`);
            // router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=boundaries`);
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
    getMyMissionPlan(payload).unwrap();
  };

  const handleFormatImpliedTask = () => {
    const newData = (missionPlanData as any[])?.map((task) => ({
      specified_task_id: task?.id || "",
      task: task?.task,
      weight: task?.weight,
      implied_tasks: task?.implied_tasks?.map((impliedTask: any) => ({
        task: impliedTask?.task || "",
        user_id: "",
        implied_task_id: impliedTask?.id || "",
        weight: impliedTask.weight || "",
        // percentage: impliedTask?.percentage || [],
        percentage:
          (impliedTask?.resources as any[])?.map((chi) => chi.percentage) || [],
        start_date: impliedTask?.start_date || "",
        end_date: impliedTask?.end_date || "",
        resources: (impliedTask?.resources as any[])?.map((chi) => ({
          id: chi?.staff_member_id || "",
          name: chi?.name || "",
          percentage: chi?.percentage || "",
        })),
        expected_outcomes: [""],
      })),
    }));
    return newData;
  };

  const initialValues = {
    mission_plan_id: missionPlanID,
    tasks: handleFormatImpliedTask(),

    // tasks:
    //   handleFormatImpliedTask().length > 0
    //     ? handleFormatImpliedTask()
    //     : [
    //         {
    //           task: "",
    //           specified_task_id: "",
    //           implied_tasks: [
    //             {
    //               task: "",
    //               user_id: "",
    //               implied_task_id: "",
    //               weight: "",
    //               // percentage: "",
    //               start_date: "",
    //               end_date: "",
    //               // percentage: [],
    //               resources: [],
    //               expected_outcomes: [""],
    //             },
    //           ],
    //         },
    //       ],
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

  // console.log(errorTasks, "errors");

  const [childData, setChildData] = useState<any>({});
  const [isWeightTransfer, setIsWeightTransfer] = useState(false);

  // modal handlers
  const {
    isOpen: openDeleteModal,
    open: onOpenDeleteModal,
    close: closeDeleteModal,
  } = useDisclosure();

  const {
    isOpen: openDeleteImpliedTask,
    open: onOpenDeleteImpliedTask,
    close: closeDeleteImpliedTask,
  } = useDisclosure();

  const {
    isOpen: openTransferModal,
    open: onOpenTransferModal,
    close: closeTransferModal,
  } = useDisclosure();

  const {
    isOpen: openTransferImpliedTask,
    open: onOpenTransferImpliedTask,
    close: closeTransferImpliedTask,
  } = useDisclosure();

  const handleNotifyModal = () => {
    if (weightNotify) {
      setWeightNotify(false);
    }
  };
  const handleDeleteDialog = () => {
    onOpenDeleteModal();
    if (openDeleteModal) {
      closeDeleteModal();
    }
  };
  const handleTransferImpliedTask = () => {
    onOpenTransferImpliedTask();
    if (openTransferImpliedTask) {
      closeTransferImpliedTask();
    }
  };

  const handleDeleteImpliedTaskDialog = () => {
    onOpenDeleteImpliedTask();
    if (openDeleteImpliedTask) {
      closeDeleteImpliedTask();
    }
  };

  const handleTransferSpecifiedTask = () => {
    onOpenTransferModal();
    if (openTransferModal) {
      closeTransferModal();
    }
  };

  const handleAddMoreImpliedTasks = (index: number) => {
    const currentimplied_tasks = formik.values.tasks[index].implied_tasks || [];
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

    const updatedimplied_tasks = [...currentimplied_tasks, newSubItem];
    formik.setFieldValue(`tasks.${index}.implied_tasks`, updatedimplied_tasks);
  };

  const handleDeleteSpecifiedTask = async (taskIndex?: number, id?: string) => {
    if (!id) {
      const updatedTasks = formik.values.tasks.filter(
        (_, tIndex) => tIndex !== taskIndex
      );
      formik.setFieldValue("tasks", updatedTasks);
      handleDeleteDialog();
    } else {
      await deleteSpecifiedTask(id)
        .unwrap()
        .then(() => {
          toast.success(`Specified Task Deleted Successfully`);
          new Promise(() => {
            setTimeout(() => {
              handleDeleteDialog();
              toast.dismiss();
            }, 1000);
          });
        });
    }
  };

  const [weightNotify, setWeightNotify] = useState(false);
  const handleDeleteImpliedTask = async (
    id: string,
    taskIndex?: number,
    impliedTaskIndex?: number
  ) => {
    if (!id) {
      const updatedTasks = formik.values.tasks.map((task, tIndex) => {
        if (tIndex === taskIndex) {
          return {
            ...task,
            implied_tasks: (task.implied_tasks as any[]).filter(
              (_, iIndex) => iIndex !== impliedTaskIndex
            ),
          };
        }
        return task;
      });
      formik.setFieldValue("tasks", updatedTasks);
      handleDeleteImpliedTaskDialog();
    } else {
      await deleteImpliedTask(id)
        .unwrap()
        .then(() => {
          toast.success(`Implied Task Deleted Successfully`);
          new Promise(() => {
            setTimeout(() => {
              handleDeleteImpliedTaskDialog();
              toast.dismiss();
            }, 1000);
          });
        });
    }
  };

  const handleWeightChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    subIndex: number
  ) => {
    let { value } = e.target;
    let newWeight = value === "" ? "" : Number(value);

    if ((newWeight as number) > 100) {
      newWeight = 100;
    }

    formik.setFieldValue(e.target.name, newWeight);

    const taskWeight = Number(formik.values.tasks[index].weight) || 0;
    const taskName = formik.values.tasks[index].task;
    const totalWeight = formik.values.tasks[index].implied_tasks.reduce(
      (sum: any, item: any, i: any) =>
        i === subIndex
          ? sum + (newWeight || 0)
          : sum + (Number(item.weight) || 0),
      0
    );

    if (totalWeight !== taskWeight) {
      formik.setFieldValue(
        e.target.name,
        formik.values.tasks[index].implied_tasks[subIndex].weight
      );
      toast.error("The total weight exceeds the task weight.");
    }

    setIsWeightValid(totalWeight === 100);
    setTaskName(taskName);
  };

  const handlePercentChange = (
    e: ChangeEvent<HTMLInputElement>,
    formik: any
  ) => {
    const { value } = e.target;
    const sanitizedValue = Math.min(100, Math.max(0, Number(value) || 0));

    formik.setFieldValue(e.target.name, sanitizedValue);
  };

  // const handleResourceChange = (
  //   values: string[],
  //   index: number,
  //   subIndex: number
  // ) => {
  //   const currentResources =
  //     formik.values.tasks[index].implied_tasks[subIndex].resources;
  //   const currentPercentages =
  //     formik.values.tasks[index].implied_tasks[subIndex].percentage;

  //   // const resourceIdToIndexMap = new Map(
  //   //   currentResources.map((res: any, idx: number) => [res.id, idx])
  //   // );

  //   const newResourceIdSet = new Set(values);

  //   const removedResourceIds = currentResources
  //     .filter((resource: any) => !newResourceIdSet.has(resource.id))
  //     .map((resource: any) => resource.id);

  //   const updatedResources = values.map((value) => {
  //     const selectedResource = formattedEmployeesDrop.find(
  //       (opt) => opt.id === value
  //     );
  //     return {
  //       id: value,
  //       name: selectedResource?.name || "",
  //     };
  //   });

  //   formik.setFieldValue(
  //     `tasks.${index}.implied_tasks.${subIndex}.resources`,
  //     updatedResources
  //   );
  //   if (currentPercentages) {
  //     const updatedPercentages = currentPercentages?.filter(
  //       (_: any, idx: number) =>
  //         !removedResourceIds.includes(currentResources[idx]?.id)
  //     );
  //     formik.setFieldValue(
  //       `tasks.${index}.implied_tasks.${subIndex}.percentage`,
  //       updatedPercentages
  //     );
  //   }
  // };
  const handleResourceChange = (
    values: string[],
    index: number,
    subIndex: number
  ) => {
    const currentResources =
      formik.values.tasks[index].implied_tasks[subIndex].resources;
    const currentPercentages =
      formik.values.tasks[index].implied_tasks[subIndex].percentage;

    const newResourceIdSet = new Set(values);

    const removedResourceIds = currentResources
      .filter((resource: any) => !newResourceIdSet.has(resource.id))
      .map((resource: any) => resource.id);

    const updatedResources = values.map((value) => {
      const selectedResource = formattedEmployeesDrop.find(
        (opt) => opt.id === value
      );
      return {
        id: value,
        name: selectedResource?.name || "",
      };
    });

    formik.setFieldValue(
      `tasks.${index}.implied_tasks.${subIndex}.resources`,
      updatedResources
    );

    if (values.length === 1) {
      formik.setFieldValue(
        `tasks.${index}.implied_tasks.${subIndex}.percentage`,
        [100]
      );
    } else if (currentPercentages) {
      const updatedPercentages = currentPercentages.filter(
        (_: any, idx: number) =>
          !removedResourceIds.includes(currentResources[idx]?.id)
      );
      formik.setFieldValue(
        `tasks.${index}.implied_tasks.${subIndex}.percentage`,
        updatedPercentages
      );
    }
  };

  return (
    <>
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div className="pr-4">
          <div className="flex gap-2">
            <h2>Set Implied Task</h2>
            <figure>{infoIcon}</figure>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-7">
            <FormikProvider value={formik}>
              <FieldArray name="tasks">
                {({ insert, remove, push }) => (
                  <div>
                    {formik.values.tasks &&
                      formik.values.tasks.length > 0 &&
                      formik.values.tasks?.map((task: any, index: number) => (
                        <div
                          key={task.id}
                          className="grid gap-y-5 items-center space-x-2 w-full mb-5 relative"
                        >
                          <div className="flex justify-between">
                            <p className="text-[#6E7C87] text-xs font-normal">
                              {index + 1}. Specified Task
                            </p>
                            {user?.role === "ceo" ||
                            (user as any)?.is_line_manager ? (
                              <p
                                className="text-red-500 text-xs ml-auto cursor-pointer"
                                onClick={() => {
                                  setChildData({
                                    taskIndex: index,
                                    ...task,
                                  });
                                  onOpenDeleteModal();
                                }}
                              >
                                Remove Specified task
                              </p>
                            ) : null}
                          </div>
                          <CustomAccordion
                            type="multiple"
                            defaultValue={["item-1"]}
                            key={task.implied_task_id}
                            triggerClass="border border-custom-divider px-4 py-2 rounded-sm mb-4"
                            className="mb-4 rounded w-full flex flex-col gap-1"
                            contentClass="border border-custom-divider px-5 py-6 rounded-sm"
                            contentWrapperClass="overflow-visible"
                            title={
                              <p className="font-medium text-sm text-graySecondary">
                                {`${index + 1}. ${
                                  task?.task + " " + `| (${task?.weight}%)` ||
                                  "Specified Task"
                                } `}
                              </p>
                            }
                            content={
                              <div className="flex flex-col gap-3 mr-10 relative">
                                <div className="flex flex-col gap-5">
                                  {task.implied_tasks &&
                                    task.implied_tasks.length > 0 &&
                                    (task.implied_tasks as SubItem[]).map(
                                      (subItem, subIndex) => {
                                        return (
                                          <div key={subIndex}>
                                            <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4">
                                              <div className="col-span-full">
                                                <Input
                                                  type="text"
                                                  id={`tasks.${index}.implied_tasks.${subIndex}.task`}
                                                  label={`Implied Task ${
                                                    subIndex + 1
                                                  }`}
                                                  labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                  onBlur={formik.handleBlur}
                                                  onChange={formik.handleChange}
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.task`}
                                                  placeholder="Input task"
                                                  className="mr-2 w-full"
                                                  value={
                                                    formik.values.tasks[index]
                                                      .implied_tasks[subIndex]
                                                      .task
                                                  }
                                                  isRequired
                                                />
                                                <ErrorMessage
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.task`}
                                                  className="text-red-500 text-xs mt-1 absolute"
                                                  component={"div"}
                                                />
                                              </div>
                                              <div className="relative">
                                                <Input
                                                  type="number"
                                                  id={`tasks.${index}.implied_tasks.${subIndex}.weight`}
                                                  label="Input Weight (%)"
                                                  labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                  onBlur={formik.handleBlur}
                                                  // onChange={(e) => {
                                                  //   const { value } = e.target;
                                                  //   if (Number(value) <= 100) {
                                                  //     formik.handleChange(e);
                                                  //   }
                                                  // }}
                                                  onChange={(e) =>
                                                    handleWeightChange(
                                                      e,
                                                      index,
                                                      subIndex
                                                      // formik
                                                    )
                                                  }
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.weight`}
                                                  placeholder="Input Weight"
                                                  className="mr-2 w-full"
                                                  value={
                                                    formik.values.tasks[index]
                                                      .implied_tasks[subIndex]
                                                      .weight
                                                  }
                                                  isRequired
                                                  max={100}
                                                />
                                                <ErrorMessage
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.weight`}
                                                  className="text-red-500 text-xs mt-1 absolute"
                                                  component={"div"}
                                                />
                                              </div>
                                              {/* <div className="relative">
                                                <Input
                                                  type="number"
                                                  id={`tasks.${index}.implied_tasks.${subIndex}.percentage`}
                                                  label="Input Percentage (%)"
                                                  labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                  onBlur={formik.handleBlur}
                                                  onChange={formik.handleChange}
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.percentage`}
                                                  placeholder="Input Percentage"
                                                  className="mr-2 w-full"
                                                  value={
                                                    formik.values.tasks[index]
                                                      .implied_tasks[subIndex]
                                                      .percentage
                                                  }
                                                  isRequired
                                                />
                                                <ErrorMessage
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.percentage`}
                                                  className="text-red-500 text-xs mt-1 absolute"
                                                  component={"div"}
                                                />
                                              </div> */}
                                              <div className="mt-1 relative">
                                                <CustomMultipleSelect
                                                  options={
                                                    formattedEmployeesDrop
                                                  }
                                                  // onValueChange={(values) =>
                                                  //   formik.setFieldValue(
                                                  //     `tasks.${index}.implied_tasks.${subIndex}.resources`,
                                                  //     values.map((value) => {
                                                  //       const selectedResource =
                                                  //         formattedEmployeesDrop.find(
                                                  //           (opt) =>
                                                  //             opt.id === value
                                                  //         );
                                                  //       return {
                                                  //         id: value,
                                                  //         name:
                                                  //           selectedResource?.name ||
                                                  //           "",
                                                  //       };
                                                  //     })
                                                  //   )
                                                  // }
                                                  onValueChange={(values) =>
                                                    handleResourceChange(
                                                      values,
                                                      index,
                                                      subIndex
                                                    )
                                                  }
                                                  label="Select Resources"
                                                  name={`tasks.${index}.implied_tasks.${subIndex}.resources`}
                                                  defaultValue={formik.values.tasks[
                                                    index
                                                  ].implied_tasks[
                                                    subIndex
                                                  ].resources.map(
                                                    (resource: any) =>
                                                      resource.id
                                                  )}
                                                  placeholder="Select Resources"
                                                  badgeClassName="rounded-[20px] text-[10px] font-normal"
                                                  triggerClassName="min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm p-1"
                                                  placeholderClass="font-light text-sm text-[#6E7C87] opacity-70"
                                                  labelClass="block text-xs text-[#6E7C87] font-normal  p-0 pb-[9px]"
                                                  error={
                                                    errorTasks?.[index]
                                                      ?.implied_tasks?.[
                                                      subIndex
                                                    ]?.resources?.id
                                                  }
                                                  touched={
                                                    touchedTasks?.[index]
                                                      ?.implied_tasks?.[
                                                      subIndex
                                                    ]?.resources?.id
                                                  }
                                                  maxCount={6}
                                                  onBlur={() =>
                                                    formik.setFieldTouched(
                                                      `tasks.${index}.implied_tasks.${subIndex}.resources`,
                                                      true
                                                    )
                                                  }
                                                  isRequired
                                                />
                                              </div>
                                              {subItem.resources.map(
                                                (resource: any, idx) => (
                                                  <div
                                                    className="relative"
                                                    key={idx}
                                                  >
                                                    <Input
                                                      type="number"
                                                      id={`tasks.${index}.implied_tasks.${subIndex}.percentage[${idx}]`}
                                                      label={`Input task percentage (%) (${
                                                        resource.name ||
                                                        "Resource"
                                                      })`}
                                                      labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                                      onBlur={formik.handleBlur}
                                                      // onChange={(e) => {
                                                      //   const { value } =
                                                      //     e.target;
                                                      //   if (
                                                      //     Number(value) <= 100
                                                      //   ) {
                                                      //     formik.handleChange(
                                                      //       e
                                                      //     );
                                                      //   }
                                                      // }}
                                                      // onChange={(e) => {
                                                      //   const { value } =
                                                      //     e.target;
                                                      //   const sanitizedValue =
                                                      //     Math.max(
                                                      //       0,
                                                      //       Number(value) || 0
                                                      //     ); // Ensure value is non-negative
                                                      //   formik.setFieldValue(
                                                      //     e.target.name,
                                                      //     sanitizedValue
                                                      //   ); // Update Formik value
                                                      // }}
                                                      onChange={(e) =>
                                                        handlePercentChange(
                                                          e,
                                                          formik
                                                        )
                                                      }
                                                      name={`tasks.${index}.implied_tasks.${subIndex}.percentage[${idx}]`}
                                                      placeholder="Input Percentage"
                                                      className="mr-2 w-full"
                                                      value={
                                                        formik.values.tasks[
                                                          index
                                                        ].implied_tasks[
                                                          subIndex
                                                        ].percentage[idx] || ""
                                                      }
                                                      isRequired
                                                    />
                                                    <ErrorMessage
                                                      name={`tasks.${index}.implied_tasks.${subIndex}.percentage`}
                                                      className="text-red-500 text-xs mt-1 absolute"
                                                      component="div"
                                                    />
                                                  </div>
                                                )
                                              )}

                                              <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col gap-1">
                                                  <CustomDateInput
                                                    onBlur={() =>
                                                      formik.setFieldTouched(
                                                        `tasks.${index}.implied_tasks.${subIndex}.start_date`,
                                                        true
                                                      )
                                                    }
                                                    id={`tasks.${index}.implied_tasks.${subIndex}.start_date`}
                                                    label="Start Date"
                                                    labelClass="-mt-1"
                                                    selected={
                                                      formik.values.tasks[index]
                                                        .implied_tasks[subIndex]
                                                        .start_date as any
                                                    }
                                                    handleChange={(date) =>
                                                      formik.setFieldValue(
                                                        `tasks.${index}.implied_tasks.${subIndex}.start_date`,
                                                        formatDate(date)
                                                      )
                                                    }
                                                    error={
                                                      errorTasks?.[index]
                                                        ?.implied_tasks?.[
                                                        subIndex
                                                      ]?.start_date
                                                    }
                                                    touched={
                                                      touchedTasks?.[index]
                                                        ?.implied_tasks?.[
                                                        subIndex
                                                      ]?.start_date
                                                    }
                                                    className="relative pr-8 w-full "
                                                    iconClass="top-[2.7rem] right-3"
                                                    inputClass=" "
                                                    isRequired
                                                  />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                  <CustomDateInput
                                                    id={`tasks.${index}.implied_tasks.${subIndex}.end_date`}
                                                    label="End Date"
                                                    selected={
                                                      formik.values.tasks[index]
                                                        .implied_tasks[subIndex]
                                                        .end_date as any
                                                    }
                                                    labelClass="-mt-1"
                                                    handleChange={(date) =>
                                                      formik.setFieldValue(
                                                        `tasks.${index}.implied_tasks.${subIndex}.end_date`,
                                                        formatDate(date)
                                                      )
                                                    }
                                                    onBlur={() =>
                                                      formik.setFieldTouched(
                                                        `tasks.${index}.implied_tasks.${subIndex}.end_date`,
                                                        true
                                                      )
                                                    }
                                                    error={
                                                      errorTasks?.[index]
                                                        ?.implied_tasks?.[
                                                        subIndex
                                                      ]?.end_date
                                                    }
                                                    touched={
                                                      touchedTasks?.[index]
                                                        ?.implied_tasks?.[
                                                        subIndex
                                                      ]?.end_date
                                                    }
                                                    className="relative pr-8"
                                                    iconClass="top-[2.7rem] right-3"
                                                    isRequired
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div
                                              className="absolute -right-11 -mt-7 cursor-pointer"
                                              onClick={() => {
                                                setChildData({
                                                  taskIndex: index,
                                                  impliedTaskIndex: subIndex,
                                                  ...subItem,
                                                });
                                                onOpenDeleteImpliedTask();
                                              }}
                                            >
                                              <Icon
                                                name="remove"
                                                width={14.28}
                                                height={18.63}
                                              />
                                            </div>
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
                                    <p className="text-primary">Add new Task</p>
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </div>
                      ))}
                    {/* 
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          task: "",
                          user_id: "",
                          specified_task_id: "",
                          implied_task_id: "", //uuidv4()
                          weight: "",
                          percentage: "",
                          start_date: "",
                          end_date: "",
                          resources: [],
                          expected_outcomes: [""],
                          implied_tasks: [
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
                    </button> */}
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
                  disabled={
                    isCreatingImpliedTask || !formik.isValid || !formik.dirty
                  }
                  loading={isCreatingImpliedTask}
                  loadingText="Save & Continue"
                  className={cn(
                    "w-full",
                    !formik.isValid || !formik.dirty || isCreatingImpliedTask
                      ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm "
                      : "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
                  )}
                >
                  Save & Continue
                </Button>
              </div>
            </FormikProvider>
          </form>
          <div></div>
          <div className="mt-7"></div>
        </div>
      )}

      {/* delete specified modal */}
      <DashboardModal
        className={"w-[600px] max-w-full"}
        open={openDeleteModal}
        onOpenChange={handleDeleteDialog}
      >
        <DeleteSpecifiedTask
          onReAssign={() => {
            handleDeleteDialog();
            handleTransferSpecifiedTask();
            setChildData(childData);
          }}
          data={childData}
          isLoading={isDeletingSpecifiedTask}
          onDelete={() =>
            handleDeleteSpecifiedTask(
              childData.taskIndex,
              childData?.specified_task_id
            )
          }
        />
      </DashboardModal>

      {/* delete implied modal */}
      <DashboardModal
        className={"w-[500px] max-w-full"}
        open={openDeleteImpliedTask}
        onOpenChange={handleDeleteImpliedTaskDialog}
      >
        <DeleteImpliedTaskModal
          data={childData}
          onCancel={handleDeleteImpliedTaskDialog}
          onDelete={() =>
            handleDeleteImpliedTask(
              childData?.implied_task_id,
              childData.taskIndex,
              childData.impliedTaskIndex
            )
          }
          // onDelete={() => handleDeleteImpliedTask(childData?.implied_task_id)}
          isLoading={isDeletingImpliedTask}
        />
      </DashboardModal>

      {/* transfer specified task modal */}
      <DashboardModal
        className={"w-[600px] max-w-full"}
        open={openTransferModal}
        onOpenChange={handleTransferSpecifiedTask}
      >
        <TransferSpecifiedTask
          onTaskWeightTransfer={() => {
            handleTransferSpecifiedTask();
            handleTransferImpliedTask();
            setChildData(childData);
            setIsWeightTransfer(true);
          }}
          data={childData}
          onTaskTransfer={() => {
            handleTransferSpecifiedTask();
            handleTransferImpliedTask();
            setChildData(childData);
          }}
        />
      </DashboardModal>

      {/* notify task modal */}
      <DashboardModal
        className={"w-[500px] max-w-full"}
        open={weightNotify}
        // open={openNotifyModal ? false : true}
        onOpenChange={handleNotifyModal}
      >
        <ImpliedTaskNotify onProceed={handleNotifyModal} />
      </DashboardModal>

      {/* transfer implied modal */}
      <DashboardModal
        className={"w-[950px] max-w-full"}
        open={openTransferImpliedTask}
        onOpenChange={handleTransferImpliedTask}
      >
        <TransferImpliedTaskOrWeight
          onCloseModal={handleTransferImpliedTask}
          isWeightTransfer={isWeightTransfer}
          data={childData}
          onWeightNotify={setWeightNotify}
          // onProceed={() => {
          //   console.log("proceed");
          // }}
          allSpecifiedTask={formik.values.tasks}
          onCancel={handleTransferImpliedTask}
        />
      </DashboardModal>
    </>
  );
};

export default ImpliedTask;
