import CustomCheckbox from "@/components/custom-checkbox";
import CustomDateInput from "@/components/custom-date-input";
import CustomMultiSelect from "@/components/inputs/custom-multiselect";
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
import { useEffect, useMemo, useState } from "react";
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
import { useCreateSpecifiedTaskMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { isValid } from "date-fns";

const { ADMIN } = routesPath;

export const EFFORT_DATA = [
  {
    id: 1,
    title: "Main Effort",
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
  const [createSpecifiedTask, { isLoading }] = useCreateSpecifiedTaskMutation();
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

  const location = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values: Data) => {
    const updatedData = {
      ...values,
      tasks: values.tasks.map(
        ({ id, success_measures, strategic_pillars, ...rest }) => ({
          ...rest,
          success_measures: success_measures?.map(
            (measure: { value: any }) => measure.value
          ),
          strategic_pillars: strategic_pillars?.map(
            (pillar: { id: string }) => pillar.id
          ),
        })
      ),
    };

    console.log(updatedData);
    try {
      createSpecifiedTask(updatedData)
        .unwrap()
        .then(() => {
          toast.success("Specified Task Addedd Successfully");
          router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=implied-task`);
        });
    } catch (error) {}
  };

  const [mainEffort, setMainEffort] = useState(EFFORT_DATA);

  const formik = useFormik<any>({
    initialValues: {
      tasks: [
        {
          id: uuidv4(),
          task: "",
          strategic_pillars: [],
          success_measures: [],
          start_date: "",
          end_date: "",
          main_efforts: false,
        },
      ],
      mission_plan_id: active_fy_info?.id,
      strategic_intent_id: "",
    },
    onSubmit: handleFormSubmit,
    validationSchema: specifiedTaskSchema,
    validateOnMount: true,
  });

  const handleChange = (value: string, index: number) => {
    // const newTasks = [...formik.values.tasks];

    // newTasks[index].title = value;
    // console.log(value);
    // formik.setFieldValue("tasks", newTasks);

    formik.setFieldValue(`tasks.${index}.task`, value);
  };

  const touchedTasks = formik.touched.tasks as
    | FormikTouched<Task>[]
    | undefined;

  const errorTasks = formik.errors.tasks as any;

  const mappedStrategicPillars = useMemo(
    () =>
      active_fy_info
        ? active_fy_info?.strategic_pillars?.map((item: any) => {
            return {
              label: item.title,
              id: item.id,
              value: item.title,
              color: "default",
            };
          })
        : [],
    [active_fy_info]
  );

  useEffect(() => {
    dispatch(
      updateMissionPlanDetails({
        slug: "specified_intent",
        data: formik.values,
      })
    );
  }, [formik.values]);

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-8">
        <h1 className="text-[#3E4345]">Specified Task</h1>
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
                        <div className="max-w-4xl flex flex-col md:flex-row gap-x-3 gap-y-5 justify-between lg:mb-8 items-start relative">
                          <div className="w-full flex-1">
                            <Input
                              type="text"
                              id="task"
                              name={`tasks.${index}.task`}
                              label="Title"
                              error={errorTasks?.[index].task}
                              touched={touchedTasks?.[index].task}
                              onBlur={formik.handleBlur}
                              placeholder="Input Task"
                              className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              onChange={(e) =>
                                handleChange(e.target.value, index)
                              }
                              value={formik.values.tasks[index].task}
                            />
                          </div>

                          <div className="flex-1 w-[100%]">
                            <CustomMultiSelect
                              values={
                                formik.values.tasks[index].strategic_pillars
                              }
                              onValuesChange={(values) =>
                                formik.setFieldValue(
                                  `tasks.${index}.strategic_pillars`,
                                  values
                                )
                              }
                              options={mappedStrategicPillars}
                              label="Select Pillars"
                              labelClass="block text-xs text-[#6E7C87] font-normal m-0 p-0 pb-1"
                              onBlur={() =>
                                formik.setFieldTouched(
                                  `tasks.${index}.strategic_pillars`,
                                  true
                                )
                              }
                              triggerClass={`rounded-md border bg-transparent text-sm bg-[#F6F8F9] focus-visible:ring-1 file:border-0 file:bg-transparent file:text-sm border-gray-300 shadow-sm py-[7px]`}
                              placeholder="Select Pillars"
                              inputClass="py-0 flex transition-colors placeholder:font-light placeholder:text-sm placeholder:text-#6E7C87 file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-#6E7C87"
                              errorClass="text-red-500 text-xs mt-1 relative bottom-3"
                              itemValue=""
                              name={`tasks.${index}.strategic_pillars`}
                              error={errorTasks?.[index].strategic_pillars}
                              touched={touchedTasks?.[index].strategic_pillars}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 absolute right-[-6%] md:right-[-3%] top-10"
                          >
                            <Icon name="remove" width={14.28} height={18.63} />
                          </button>
                        </div>
                        <div className="max-w-5xl !ml-0 flex flex-col lg:flex-row gap-y-3 gap-x-3 justify-between mb-4 items-start">
                          <div className="ml-0">
                            <CustomMultiSelect
                              values={
                                formik.values.tasks[index].success_measures
                              }
                              onValuesChange={(values) =>
                                formik.setFieldValue(
                                  `tasks.${index}.success_measures`,
                                  values
                                )
                              }
                              options={options}
                              label="Select Measure of Success"
                              labelClass="block text-xs text-[#6E7C87] font-normal m-0 p-0"
                              onBlur={() =>
                                formik.setFieldTouched(
                                  `tasks.${index}.success_measures`,
                                  true
                                )
                              }
                              triggerClass="rounded-md border bg-transparent text-sm bg-[#F6F8F9] focus-visible:ring-1 file:border-0 file:bg-transparent file:text-sm border-gray-300 shadow-sm py-[7px] min-w-[20rem]"
                              placeholder="Select Multiple"
                              inputClass="py-0 flex transition-colors placeholder:font-light placeholder:text-sm placeholder:text-#6E7C87 file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-#6E7C87"
                              errorClass="text-red-500 text-xs mt-1 relative bottom-3"
                              name={`tasks.${index}.success_measures`}
                              error={errorTasks?.[index].success_measures}
                              touched={touchedTasks?.[index].success_measures}
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
                                className="relative"
                                placeholder="DD/MM/YYYY"
                                format="DD/MM/YYYY"
                                id={`tasks.${index}.start_date`}
                                name={`tasks.${index}.start_date`}
                                label="Start Date"
                                inputClass="text-[.75rem]"
                                handleChange={(date) =>
                                  formik.setFieldValue(
                                    `tasks.${index}.start_date`,
                                    date?.format("DD/MM/YYYY")
                                  )
                                }
                                //   value={formik.values.tasks[index].start_date}
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
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                handleChange={(date) =>
                                  formik.setFieldValue(
                                    `tasks.${index}.end_date`,
                                    date?.format("DD/MM/YYYY")
                                  )
                                }
                                labelClass="pb-2"
                                className="relative"
                                inputClass="w-full text-[.75rem]"
                                //   value={formik.values.tasks[index].end_date}
                                touched={touchedTasks?.[index]?.end_date}
                                error={errorTasks?.[index]?.end_date}
                              />
                            </div>
                            <div className="mt-8 w-full">
                              {mainEffort.map(({ id, title, isChecked }) => (
                                <CustomCheckbox
                                  key={id}
                                  id={`tasks.${index}.main_efforts`}
                                  name={`tasks.${index}.main_efforts`}
                                  label={title}
                                  labelClass="text-sm w-full text-[var(--primary-color)]"
                                  isChecked={
                                    formik.values.tasks[index].main_efforts
                                  }
                                  itemId={id}
                                  handleClick={() =>
                                    formik.setFieldValue(
                                      `tasks.${index}.main_efforts`,
                                      !formik.values.tasks[index].main_efforts
                                    )
                                  }
                                />
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
                      strategic_pillars: [],
                      success_measures: [],
                      start_date: "",
                      end_date: "",
                      main_efforts: false,
                    })
                  }
                  className="flex items-center gap-2 mt-5 text-[var(--primary-color)] text-sm px-1"
                >
                  <LucidePlusCircle
                    style={{ color: "var(--primary-color)" }}
                    size={20}
                  />
                  Add new Specific Task
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

            {/* <Button
            type="submit"
            //   disabled={isLoadingStrategicIntent}
            //   loading={isLoadingStrategicIntent}
            loadingText="Save & Continue"
            className={cn(
              "w-full",
              // !formik.isValid || isLoadingStrategicIntent
              //   ? "opacity-50 cursor-not-allowed w-max py-5 px-2"
              //   :
              "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
            )}
            // className={`text-white py-5 px-2 rounded-sm bg-primary border border-primary min-w-28`}
          >
            Save & Continue
          </Button> */}

            <Button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              className=""
              type="submit"
              loading={isLoading}
              loadingText="Save & Continue"
            >
              Save & Continue
            </Button>
          </div>
        </FormikProvider>
      </form>
    </div>
  );
};

export default SpecifiedTask;
