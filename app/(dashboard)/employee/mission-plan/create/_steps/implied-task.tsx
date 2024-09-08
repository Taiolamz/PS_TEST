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
import DashboardModal from "@/app/(dashboard)/admin/branches/_components/checklist-dashboard-modal";
import DeleteSpecifiedTask from "./delete-specified-task";
import useDisclosure from "@/utils/hooks/useDisclosure";
import DeleteImpliedTaskModal from "./delete-implied-task";
import TransferSpecifiedTask from "./transfer-specified-task";
import ImpliedTaskNotify from "./implied-task-notify";
import TransferImpliedTaskOrWeight from "./transfer-implied-task";

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

const subItemSchema = yup.object().shape({
  task: yup.string().required("Task is required"),
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
});

const taskSchema = yup.object().shape({
  subItems: yup.array().of(subItemSchema).required("Sub-items are required"),
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
    const payload = { ...formik.values };

    await createImpliedTask(payload)
      .unwrap()
      .then(() => {
        toast.success("Implied Task Created Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            onNextStep && onNextStep();
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
    getMyMissionPlan(payload)
      .unwrap()
      .then((payload) => {
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

  const formatImpliedTasks = () => {
    const newData = formik.values.tasks?.map((chi) => {
      return {
        ...chi,
        subItems: [],
      };
    });
    return newData;
  };

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
    isOpen: openNotifyModal,
    open: onOpenNotifyModal,
    close: closeNotifyModal,
  } = useDisclosure();

  const {
    isOpen: openTransferImpliedTask,
    open: onOpenTransferImpliedTask,
    close: closeTransferImpliedTask,
  } = useDisclosure();

  const handleNotifyModal = () => {
    onOpenNotifyModal();
    if (openNotifyModal) {
      closeNotifyModal();
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
    formik.setFieldValue(`tasks.${index}.subItems`, updatedSubItems);
  };

  const handleDeleteSubItem = (taskIndex: number, subItemIndex: number) => {
    const currentSubItems = formik.values.tasks[taskIndex].subItems || [];
    const updatedSubItems = (currentSubItems as any[]).filter(
      (_, index) => index !== subItemIndex
    );
    formik.setFieldValue(`tasks.${taskIndex}.subItems`, updatedSubItems);
  };

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
                      formik.values.tasks?.map(
                        (task: ImpliedTaskType, index: number) => (
                          <div
                            key={task.implied_task_id}
                            className="grid gap-y-5 items-center space-x-2 w-full mb-5 relative"
                          >
                            <div className="flex justify-between">
                              <p className="text-[#6E7C87] text-xs font-normal">
                                {index + 1}. Specified task
                              </p>
                              <p
                                className="text-red-500 text-xs ml-auto cursor-pointer"
                                // onClick={() => remove(index)}
                                onClick={onOpenDeleteModal}
                              >
                                Remove Specified task
                              </p>
                            </div>
                            <CustomAccordion
                              key={task.implied_task_id}
                              triggerClass="border border-custom-divider px-4 py-2 rounded-sm mb-4"
                              className="mb-4 rounded w-full flex flex-col gap-1"
                              contentClass="border border-custom-divider px-5 py-6 rounded-sm"
                              contentWrapperClass="overflow-visible"
                              title={
                                <p className="font-medium text-sm text-graySecondary">
                                  {task?.title ||
                                    `${index + 1}. Specified task`}
                                </p>
                              }
                              content={
                                <div className="flex flex-col gap-3">
                                  <>
                                    <div className="grid lg:grid-cols-3 gap-x-3 mt-2 "></div>
                                  </>
                                  <div className="flex flex-col gap-5">
                                    {task.subItems &&
                                      task.subItems.length > 0 &&
                                      (task.subItems as SubItem[]).map(
                                        (subItem, subIndex) => {
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
                                                  </div>
                                                </div>
                                                <div
                                                  className="absolute right-0 mr-5 cursor-pointer"
                                                  onClick={
                                                    onOpenDeleteImpliedTask
                                                  }
                                                  // onClick={() =>
                                                  //   handleDeleteSubItem(
                                                  //     index,
                                                  //     subIndex
                                                  //   )
                                                  // }
                                                >
                                                  <Icon
                                                    name="remove"
                                                    width={14.28}
                                                    height={18.63}
                                                  />
                                                </div>
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
                                      <p className="text-primary">
                                        Add new Task
                                      </p>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </div>
                              }
                            />
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
          }}
          onDelete={() => console.log("delete specified task")}
        />
      </DashboardModal>

      {/* delete implied modal */}
      <DashboardModal
        className={"w-[500px] max-w-full"}
        open={openDeleteImpliedTask}
        onOpenChange={handleDeleteImpliedTaskDialog}
      >
        <DeleteImpliedTaskModal
          onCancel={handleDeleteImpliedTaskDialog}
          onDelete={() => {
            console.log("delete implied task");
          }}
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
          }}
          onTaskTransfer={() => {
            handleTransferSpecifiedTask();
            handleTransferImpliedTask();
          }}
        />
      </DashboardModal>

      {/* notify task modal */}
      <DashboardModal
        className={"w-[500px] max-w-full"}
        open={openNotifyModal ? false : true}
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
          onProceed={() => {
            console.log("proceed");
          }}
          onCancel={handleTransferImpliedTask}
        />
      </DashboardModal>
    </>
  );
};

export default ImpliedTask;
