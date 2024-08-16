"use client";

import * as yup from "yup";
import { CustomAccordion } from "@/components/custom-accordion";
import CustomDateInput from "@/components/custom-date-input";
import Icon from "@/components/icon/Icon";
import CustomMultiSelect from "@/components/inputs/custom-multiselect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/helpers/date-formatter";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
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
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { PageLoader } from "@/components/custom-loader";

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
  strategic_pillars?: {
    label: string;
    id: string;
    value: string;
    color: string;
  }[];
};

const validationSchema = yup.object({
  tasks: yup.array().of(
    yup.object({
      task: yup.string().required("Task is required"),
      specified_task_id: yup.string(),
      weight: yup.string().required("Weight is required"),
      percentage: yup.string().required("Percentage is required"),
      start_date: yup.string().required("Start date is required"),
      end_date: yup.string().required("End date is required"),
      expected_outcomes: yup
        .array()
        .of(yup.string().required("Expected outcome is required")),
      resources: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string().required("Resource ID is required"),
            label: yup.string().required("Resource label is required"),
            value: yup.string().required("Resource value is required"),
          })
        )
        .min(1, "At least one resource is required"),
    })
  ),
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
    const payload = {
      ...formik.values,
      mission_plan_id: mission_plan?.data?.mission_plan?.id,
      tasks: formik.values.tasks.map((task) => ({
        task: task.task,
        resources: task.resources.map(
          (resource: { id: string }) => resource.id
        ),
        specified_task_id: task.specified_task_id || "",
        implied_task_id: task.implied_task_id || "",
        weight: task.weight,
        percentage: task.percentage,
        start_date: task.start_date,
        end_date: task.end_date,
        expected_outcomes: task.expected_outcomes,
      })),
    };

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
    useGetAllEmployeesQuery();

  const formattedEmployeesDrop = useMemo(() => {
    return (
      (employeesData as AllStaff[])?.map((chi) => ({
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
          const mappedTasks = formatTasks(impliedTasks);
          formik.setFieldValue("tasks", mappedTasks);
        }
      });
  };

  const initialValues = {
    tasks: [
      {
        task: "",
        user_id: "",
        specified_task_id: "",
        implied_task_id: "", // Using uuid to generate a unique ID
        weight: "",
        percentage: "",
        start_date: "",
        end_date: "",
        resources: [],
        expected_outcomes: [""],
      },
    ],
    mission_plan_id: mission_plan_info?.mission_plan?.id || "",
  };

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: handleSubmit,
  //   enableReinitialize: true,
  // });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const formatTasks = (tasks: ImpliedTaskType[]) => {
    const formattedTasks: any[] = [];

    tasks.forEach((task) => {
      if (Array.isArray(task?.implied_tasks)) {
        task.implied_tasks.forEach((chi) => {
          formattedTasks.push({
            title: task?.task || "",
            task: chi?.task || "",
            user_id: "",
            specified_task_id: task?.id || "",
            implied_task_id: chi?.id || "",
            weight: chi?.weight || "",
            percentage: chi?.percentage || "",
            start_date: chi?.start_date || "",
            resources:
              (chi?.resources || []).map((resource: any) => ({
                value: resource?.staff_member_id,
                label: resource?.name,
                id: resource?.staff_member_id,
              })) || [],
            end_date: chi?.end_date || "",
            expected_outcomes: chi?.expected_outcome,
            id: chi?.id || "",
            is_main_effort: chi?.is_main_effort || 0,
            strategic_pillars: chi?.strategic_pillars || [],
          });
        });
      } else {
        console.warn(
          "Expected implied_tasks to be an array, got:",
          task.implied_tasks
        );
      }
    });

    return formattedTasks;
  };

  useEffect(() => {
    handleGetMyMissionPlan();
  }, [FISCAL_YEAR_ID]);

  return (
    <>
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div className="pr-4">
          <h1>Implied Task</h1>

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
                                  {task?.title || `${index + 1}. Implied task`}
                                </p>
                              }
                              content={
                                <div>
                                  <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4">
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
                                        value={formik.values.tasks[index].task}
                                      />
                                    </div>
                                    <div>
                                      <Input
                                        type="text"
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
                                        type="text"
                                        id={`tasks.${index}.percentage`}
                                        label="Input Percentage"
                                        labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        name={`tasks.${index}.percentage`}
                                        placeholder="Input Percentage"
                                        className="mr-2 w-full"
                                        value={
                                          formik.values.tasks[index].percentage
                                        }
                                      />
                                      <ErrorMessage
                                        name={`intents.${index}.behaviours.value`}
                                        className="text-red-500 text-xs mt-1"
                                        component={"div"}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid lg:grid-cols-3 gap-x-3 mt-6">
                                    <div className="mt-1">
                                      <CustomMultiSelect
                                        values={
                                          formik.values.tasks[index].resources
                                        }
                                        onValuesChange={(values) =>
                                          formik.setFieldValue(
                                            `tasks.${index}.resources`,
                                            values
                                          )
                                        }
                                        options={formattedEmployeesDrop}
                                        // options={options}
                                        label="Select Resources"
                                        labelClass="block text-xs text-[#6E7C87] font-normal m-0 p-0 pb-1"
                                        onBlur={() =>
                                          formik.setFieldTouched(
                                            `tasks.${index}.resources`,
                                            true
                                          )
                                        }
                                        triggerClass="rounded-sm border showdow-none !border-[#E5E9EB] bg-transparent text-sm bg-[#F6F8F9] focus-visible:ring-1 file:border-0 file:bg-transparent file:text-sm border-gray-300 shadow-sm py-[7px]"
                                        placeholder="Select Resources"
                                        inputClass="py-0 flex transition-colors placeholder:font-light placeholder:text-sm placeholder:text-#6E7C87 file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-#6E7C87"
                                        errorClass="text-red-500 text-xs mt-1"
                                        itemValue=""
                                        name={`tasks.${index}.resources`}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6">
                                      <CustomDateInput
                                        id={`tasks.${index}.start_date`}
                                        label="Start date"
                                        selected={
                                          formik.values.tasks[index]
                                            .start_date as any
                                        }
                                        handleChange={(date) =>
                                          formik.setFieldValue(
                                            `tasks.${index}.start_date`,
                                            formatDate(date)
                                            // formatRMDatePicker(date)
                                          )
                                        }
                                        error={""}
                                        className="relative"
                                        iconClass="top-[2.7rem]"
                                        isRequired
                                      />
                                      <CustomDateInput
                                        id={`tasks.${index}.end_date`}
                                        label="End date"
                                        selected={
                                          formik.values.tasks[index]
                                            .end_date as any
                                        }
                                        handleChange={(date) =>
                                          formik.setFieldValue(
                                            `tasks.${index}.end_date`,
                                            formatDate(date)
                                            // formatRMDatePicker(date)
                                          )
                                        }
                                        error={""}
                                        className="relative"
                                        iconClass="top-[2.7rem]"
                                        isRequired
                                      />
                                    </div>
                                  </div>

                                  {/* <FieldArray
                                    name={`tasks.${index}.expected_outcomes`}
                                  >
                                    {({
                                      remove: removeOutcome,
                                      push: pushOutcome,
                                    }) => (
                                      <div className="grid md:grid-cols-2 items-start gap-x-6 gap-y-3 relative !ml-0 justify-between w-max mt-4">
                                        {(Array.isArray(
                                          formik.values.tasks[index]
                                            .expected_outcomes
                                        )
                                          ? formik.values.tasks[index]
                                              .expected_outcomes
                                          : []
                                        ).map((outcome, outcomeIndex) => (
                                          <div
                                            key={outcomeIndex}
                                            className="items-center w-full relative"
                                          >
                                            <Input
                                              type="text"
                                              id={`tasks.${index}.expected_outcomes.${outcomeIndex}`}
                                              label="Expected Outcomes"
                                              labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                              onBlur={formik.handleBlur}
                                              onChange={formik.handleChange}
                                              name={`tasks.${index}.expected_outcomes.${outcomeIndex}`}
                                              placeholder="Input Expected Outcomes"
                                              className="mr-2 w-full md:w-[12rem] lg:w-[20rem]"
                                              value={outcome}
                                            />
                                            <ErrorMessage
                                              name={`tasks.${index}.expected_outcomes.${outcomeIndex}`}
                                              className="text-red-500 text-xs mt-1"
                                              component={"div"}
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeOutcome(outcomeIndex)
                                              }
                                              className="text-red-600 absolute left-[180px] md:left-[280px] lg:left-[285px] bottom-3 md:bottom-0 lg:bottom-3"
                                            >
                                              <LiaTimesSolid size={18} />
                                            </button>
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => pushOutcome("")}
                                          className="text-left flex items-center gap-x-2 relative mt-4 md:mt-8 text-primary text-sm"
                                        >
                                          <LucidePlusCircle
                                            size={28}
                                            className="mr-2"
                                          />
                                          <span className="text-[15px] font-normal whitespace-nowrap">
                                            Add Outcomes
                                          </span>
                                        </button>
                                      </div>
                                    )}
                                  </FieldArray> */}
                                  <FieldArray
                                    name={`tasks.${index}.expected_outcomes`}
                                  >
                                    {({
                                      remove: removeOutcome,
                                      push: pushOutcome,
                                    }) => (
                                      <div className="grid md:grid-cols-2 items-start gap-x-6 gap-y-3 relative !ml-0 justify-between w-max mt-4">
                                        {(Array.isArray(
                                          formik.values.tasks[index]
                                            .expected_outcomes
                                        )
                                          ? formik.values.tasks[index]
                                              .expected_outcomes
                                          : []
                                        ).map((outcome, outcomeIndex) => (
                                          <div
                                            key={outcomeIndex}
                                            className="items-center w-full relative"
                                          >
                                            <Input
                                              type="text"
                                              id={`tasks.${index}.expected_outcomes.${outcomeIndex}`}
                                              label="Expected Outcomes"
                                              labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                              onBlur={formik.handleBlur}
                                              onChange={formik.handleChange}
                                              name={`tasks.${index}.expected_outcomes.${outcomeIndex}`}
                                              placeholder="Input Expected Outcomes"
                                              className="mr-2 w-full md:w-[12rem] lg:w-[20rem]"
                                              value={outcome}
                                            />
                                            <ErrorMessage
                                              name={`tasks.${index}.expected_outcomes.${outcomeIndex}`}
                                              className="text-red-500 text-xs mt-1"
                                              component={"div"}
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeOutcome(outcomeIndex)
                                              }
                                              className="text-red-600 absolute left-[180px] md:left-[280px] lg:left-[285px] bottom-3 md:bottom-0 lg:bottom-3"
                                            >
                                              <LiaTimesSolid size={18} />
                                            </button>
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => pushOutcome("")}
                                          className="text-left flex items-center gap-x-2 relative mt-4 md:mt-8 text-primary text-sm"
                                        >
                                          <LucidePlusCircle
                                            size={28}
                                            className="mr-2"
                                          />
                                          <span className="text-[15px] font-normal whitespace-nowrap">
                                            Add Outcomes
                                          </span>
                                        </button>
                                      </div>
                                    )}
                                  </FieldArray>
                                </div>
                              }
                            />

                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 absolute -right-6 top-2"
                            >
                              <Icon
                                name="remove"
                                width={14.28}
                                height={18.63}
                              />
                            </button>
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
          <div className="mt-7"></div>
        </div>
      )}
    </>
  );
};

export default ImpliedTask;
