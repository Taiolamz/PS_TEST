/* eslint-disable react-hooks/exhaustive-deps */
import CustomCheckbox from "@/components/custom-checkbox";
import CustomDateInput from "@/components/custom-date-input";
import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ErrorMessage,
  FieldArray,
  FormikProvider,
  FormikTouched,
  useFormik,
} from "formik";
import { LucidePlusCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { specifiedTaskSchema } from "@/utils/schema/mission-plan";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Dictionary } from "@/@types/dictionary";
import { removeCharFromString } from "@/utils/helpers";
import { toast } from "sonner";
import routesPath from "@/utils/routes";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import {
  useCreateSpecifiedTaskMutation,
  useLazyGetMyMissionPlanQuery,
} from "@/redux/services/mission-plan/missionPlanApi";
import { Checkbox } from "@/components/ui/checkbox";
import { PageLoader } from "@/components/custom-loader";
import { CustomMultipleSelect } from "@/components/inputs/custom-multiple-select";

const { ADMIN } = routesPath;

export const EFFORT_DATA = [
  {
    id: 1,
    label: "Main Effort",
    name: "Main Effort",
    isChecked: false,
  },
];

const options = [
  { label: "React", value: "React", color: "#61dafb" },
  { label: "Vue", value: "Vue", color: "#42b883" },
  { label: "Svelte", value: "Svelte", color: "#ff3e00" },
];

interface Task {
  id: string;
  start_date: string;
  weight: string;
  end_date: string;
  task?: string;
  strategic_pillars?: [];
  success_measures?: [];
}

interface Data {
  tasks: Task[];
  mission_plan_id: string;
  strategic_intent_id: string;
}

const SpecifiedTask = () => {
  const router = useRouter();
  const location = usePathname();
  const dispatch = useAppDispatch();

  const uuidRef = useRef(uuidv4());

  const [initialValues, setInitialValues] = useState<any>();
  const [mainEffort, setMainEffort] = useState(EFFORT_DATA);

  const { mission_plan: mission_plan_info } = useAppSelector(
    (state) => state.mission_plan
  );

  const FISCAL_YEAR_ID = mission_plan_info?.active_fy_info?.id || "";

  const [
    getMyMissionPlan,
    {
      data: mission_plan,
      isLoading: isLoadingMissionPlan,
      isFetching: isFetchingMissionPlan,
      isSuccess: fetchedMissionPlan,
    },
  ] = useLazyGetMyMissionPlanQuery({});

  const handleGetMyMissionPlan = async () => {
    const payload = { id: FISCAL_YEAR_ID };
    getMyMissionPlan(payload)
      .unwrap()
      .then((payload) => {});
  };

  useEffect(() => {
    handleGetMyMissionPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FISCAL_YEAR_ID]);

  useEffect(() => {
    if (fetchedMissionPlan) {
      dispatch(
        updateMissionPlanDetails({
          slug: "mission_plan",
          data: mission_plan?.data?.mission_plan,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission_plan, fetchedMissionPlan]);

  const [createSpecifiedTask, { isLoading }] = useCreateSpecifiedTaskMutation();
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

  const endDate = new Date(active_fy_info?.end_date);
  const startDate = new Date(active_fy_info?.start_date);

  const mappedStrategicPillars = useMemo(
    () =>
      active_fy_info
        ? active_fy_info?.strategic_pillars?.map((item: any) => {
            return {
              label: item.title,
              id: item.id,
              value: item.id,
              color: "default",
            };
          })
        : [],
    [active_fy_info]
  );

  const mappedSuccessMeasures = useMemo(
    () =>
      mission_plan
        ? mission_plan_info?.mission_plan?.measure_of_success?.map(
            (item: any) => {
              return {
                label: `${item.measure} - ${item.target} (${item.unit})`,
                id: item.id,
                value: item.id,
                color: "default",
              };
            }
          )
        : [],
    [mission_plan]
  );

  // This sets the intial saved values
  useEffect(() => {
    const tasks = mission_plan_info?.mission_plan?.specified_tasks.map(
      (task: any) => ({
        id: task.id || uuidv4(),
        task: task.task,
        weight: task.weight,
        strategic_pillars: mappedStrategicPillars
          .filter((itemA: { id: any }) =>
            task.strategic_pillars.some(
              (itemB: { id: any }) => itemB.id === itemA.id
            )
          )
          .map((item: { id: any }) => item.id),
        success_measures: mappedSuccessMeasures
          ?.filter((itemA: { id: any }) =>
            task.success_measures.some(
              (itemB: { id: any }) => itemB.id === itemA.id
            )
          )
          .map((item: { id: any }) => item.id),
        start_date: task.start_date,
        end_date: task.end_date,
        is_main_effort: task.is_main_effort ? true : false,
      })
    );

    setInitialValues(tasks);
  }, [mappedStrategicPillars, mappedSuccessMeasures, mission_plan_info]);

  // This prevents an infinite loop by memoizing the values
  const initialVals = useMemo(() => {
    if (initialValues?.length > 0) {
      return {
        tasks: initialValues,
        mission_plan_id: mission_plan_info?.mission_plan?.id || "",
      };
    }
    return {
      tasks: [
        {
          id: uuidRef.current,
          task: "",
          weight: "",
          strategic_pillars: [],
          success_measures: [],
          start_date: "",
          end_date: "",
          is_main_effort: false,
        },
      ],
      mission_plan_id: mission_plan_info?.mission_plan?.id || "",
    };
  }, [initialValues]);

  const handleFormSubmit = async (values: Data) => {
    const updatedData = {
      ...values,
      tasks: values.tasks.map(
        ({ id, success_measures, strategic_pillars, ...rest }) => ({
          ...rest,
          id: id.includes("-") ? "" : id,
          success_measures: success_measures,
          strategic_pillars: strategic_pillars,
        })
      ),
    };

    // Count how many tasks have is_main_effort set to true or a truthy value
    const mainEffortCount = updatedData.tasks.filter(
      (task: any) => !!task.is_main_effort
    ).length;

    try {
      if (mainEffortCount > 1) {
        toast.error("You can set only one item as main effort.");
      } else {
        createSpecifiedTask(updatedData)
          .unwrap()
          .then(() => {
            toast.success("Specified Task Addedd Successfully");
            router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=implied-task`);
          });
      }
    } catch (error) {}
  };

  const formik = useFormik<any>({
    initialValues: initialVals,
    onSubmit: handleFormSubmit,
    validationSchema: specifiedTaskSchema(endDate, startDate),
    validateOnMount: true,
    enableReinitialize: true,
  });

  const handleChange = (value: string, index: number, name: string) => {
    formik.setFieldValue(`tasks.${index}.${name}`, value);
  };

  const handleCheckClick = useCallback(
    (index: string | number) => {
      formik.setFieldValue(
        `tasks.${index}.is_main_effort`,
        !formik.values.tasks[index].is_main_effort
      );
    },
    [formik]
  );

  const touchedTasks = formik.touched.tasks as
    | FormikTouched<Task>[]
    | undefined;

  const errorTasks = formik.errors.tasks as any;

  useEffect(() => {
    dispatch(
      updateMissionPlanDetails({
        slug: "specified_intent",
        data: formik.values,
      })
    );
  }, [formik.values]);

  useEffect(() => {
    if (formik.errors.tasks && typeof formik.errors.tasks === "string") {
      {
        toast.error(formik.errors.tasks);
      }
    }
  }, [formik.errors]);

  return (
    <div>
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-x-2 mb-8">
            <h1 className="text-[#3E4345]">Set Specified Task</h1>
            <span>
              <BsFillInfoCircleFill color="#84919A" />
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
              <FieldArray name="tasks">
                {({ insert, remove, push }) => (
                  <div>
                    {formik.values.tasks?.length > 0 &&
                      formik.values.tasks.map(
                        (
                          task: { id: React.Key | null | undefined },
                          index: number
                        ) => (
                          <div
                            key={task.id}
                            className="grid gap-y-3 items-center space-x-2 relative"
                          >
                            <h2 className="text-grayText font-semibold text-sm">
                              Task {index + 1}
                            </h2>
                            <div className="max-w-4xl flex flex-col md:flex-row gap-x-3 gap-y-5 justify-between lg:mb-8 items-start relative !ml-0">
                              <div className="w-full flex-1">
                                <Input
                                  type="text"
                                  id="task"
                                  name={`tasks.${index}.task`}
                                  label="Title"
                                  error={errorTasks?.[index]?.task}
                                  touched={touchedTasks?.[index]?.task}
                                  onBlur={formik.handleBlur}
                                  placeholder="Input Task"
                                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                  onChange={(e) =>
                                    handleChange(e.target.value, index, "task")
                                  }
                                  value={formik.values.tasks[index].task}
                                />
                              </div>

                              <div className="flex-1 w-[100%]">
                                <CustomMultipleSelect
                                  options={mappedStrategicPillars}
                                  onValueChange={(values: any) =>
                                    formik.setFieldValue(
                                      `tasks.${index}.strategic_pillars`,
                                      values
                                    )
                                  }
                                  label="Select Pillars"
                                  name={`tasks.${index}.strategic_pillars`}
                                  defaultValue={
                                    formik.values.tasks[index].strategic_pillars
                                  }
                                  placeholder="Select Pillars"
                                  badgeClassName={`rounded-[20px] text-[10px] font-normal`}
                                  triggerClassName={`min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm`}
                                  placeholderClass={`font-light text-sm text-[#6E7C87] opacity-70`}
                                  labelClass={`block text-xs text-[#6E7C87] font-normal mt-1 p-0 pb-[11px]`}
                                  error={errorTasks?.[index]?.strategic_pillars}
                                  touched={
                                    touchedTasks?.[index]?.strategic_pillars
                                  }
                                  maxCount={6}
                                  onBlur={() =>
                                    formik.setFieldTouched(
                                      `tasks.${index}.strategic_pillars`,
                                      true
                                    )
                                  }
                                />
                              </div>
                              <div className="w-full flex-1">
                                <Input
                                  type="text"
                                  id="weight"
                                  name={`tasks.${index}.weight`}
                                  label="Weight %"
                                  error={errorTasks?.[index]?.weight}
                                  touched={touchedTasks?.[index]?.weight}
                                  onBlur={formik.handleBlur}
                                  placeholder="Input Weight(%)"
                                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      index,
                                      "weight"
                                    )
                                  }
                                  value={formik.values.tasks[index].weight}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 hover:text-red-700 absolute right-[-6%] md:right-[-3%] top-10"
                              >
                                <Icon
                                  name="remove"
                                  width={14.28}
                                  height={18.63}
                                />
                              </button>
                            </div>
                            <div className="max-w-5xl !ml-0 flex flex-col lg:flex-row gap-y-3 gap-x-3 justify-between mb-2 items-start">
                              <div className="ml-0">
                                <CustomMultipleSelect
                                  onValueChange={(values) =>
                                    formik.setFieldValue(
                                      `tasks.${index}.success_measures`,
                                      values
                                    )
                                  }
                                  options={mappedSuccessMeasures}
                                  label="Select Measure of Success"
                                  name={`tasks.${index}.success_measures`}
                                  defaultValue={
                                    formik.values.tasks[index].success_measures
                                  }
                                  placeholder="Select Multiple"
                                  badgeClassName={`rounded-[20px] text-[10px] font-normal`}
                                  triggerClassName={`min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm p-1`}
                                  placeholderClass={`font-light text-sm text-[#6E7C87] opacity-70`}
                                  labelClass={`block text-xs text-[#6E7C87] font-normal mt-0 p-0 pb-2`}
                                  error={errorTasks?.[index]?.success_measures}
                                  touched={
                                    touchedTasks?.[index]?.success_measures
                                  }
                                  maxCount={6}
                                  onBlur={() =>
                                    formik.setFieldTouched(
                                      `tasks.${index}.success_measures`,
                                      true
                                    )
                                  }
                                />
                              </div>
                              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 justify-between">
                                <div
                                  className="w-full"
                                  onBlur={() =>
                                    formik.setFieldTouched(
                                      `tasks.${index}.start_date`,
                                      true
                                    )
                                  }
                                >
                                  <CustomDateInput
                                    labelClass="pb-2"
                                    className="relative p-4"
                                    placeholder="DD/MM/YYYY"
                                    id={`tasks.${index}.start_date`}
                                    name={`tasks.${index}.start_date`}
                                    selected={
                                      formik?.values?.tasks[index]
                                        ?.start_date as any
                                    }
                                    label="Start Date"
                                    inputClass="text-[.75rem] p-[9px]"
                                    handleChange={(date) =>
                                      formik.setFieldValue(
                                        `tasks.${index}.start_date`,
                                        date?.format("YYYY-MM-DD")
                                      )
                                    }
                                    touched={touchedTasks?.[index]?.start_date}
                                    error={errorTasks?.[index]?.start_date}
                                  />
                                </div>
                                <div
                                  className="w-full"
                                  onBlur={() =>
                                    formik.setFieldTouched(
                                      `tasks.${index}.end_date`,
                                      true
                                    )
                                  }
                                >
                                  <CustomDateInput
                                    id={`tasks.${index}.end_date`}
                                    name={`tasks.${index}.end_date`}
                                    label="End Date"
                                    placeholder="DD/MM/YYYY"
                                    selected={
                                      formik?.values?.tasks[index]
                                        ?.end_date as any
                                    }
                                    handleChange={(date) =>
                                      formik.setFieldValue(
                                        `tasks.${index}.end_date`,
                                        date?.format("YYYY-MM-DD")
                                      )
                                    }
                                    labelClass="pb-2"
                                    className="relative"
                                    inputClass="w-full text-[.75rem] p-[9px]"
                                    //   value={formik.values.tasks[index].end_date}
                                    touched={touchedTasks?.[index]?.end_date}
                                    error={errorTasks?.[index]?.end_date}
                                  />
                                </div>
                                <div className="mt-6 w-full">
                                  {mainEffort.map(({ id, label, name }) => (
                                    <div
                                      className="flex items-center mt-2"
                                      key={name}
                                    >
                                      <Checkbox
                                        key={id}
                                        className=""
                                        name={name}
                                        onCheckedChange={() =>
                                          handleCheckClick(index)
                                        }
                                        checked={
                                          formik.values.tasks[index]
                                            .is_main_effort
                                        }
                                      />
                                      <label className="ml-2 block text-sm text-[var(--primary-color)]">
                                        {label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          id: uuidv4(),
                          task: "",
                          weight: "",
                          strategic_pillars: [],
                          success_measures: [],
                          start_date: "",
                          end_date: "",
                          is_main_effort: false,
                        })
                      }
                      className="flex items-center gap-2 mt-5 text-[var(--primary-color)] text-sm px-1"
                    >
                      <LucidePlusCircle
                        style={{ color: "var(--primary-color)" }}
                        size={20}
                      />
                      Add new specified task
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="mt-8 flex gap-x-2 items-center">
                <Button
                  variant="outline"
                  className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
                >
                  Back
                </Button>

                <Button
                  disabled={!(formik.isValid && formik.dirty) || isLoading}
                  type="submit"
                  loading={isLoading}
                  loadingText="Save & Continue"
                  className={"py-5 px-2"}
                >
                  Save & Continue
                </Button>
              </div>
            </FormikProvider>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpecifiedTask;
