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
import { useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { format, parse, isValid } from "date-fns";

export const EFFORT_DATA = [
  {
    id: 1,
    title: "Main Effort",
    isChecked: false,
  },
];

// Custom date validation function
const isValidDate = (dateString: string | any) => {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  return isValid(parsedDate) && dateString.length === 10;
};

const validationSchemaTask = Yup.object().shape({
  tasks: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string().required("Title is required"),
      pillars: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
            color: Yup.string().required(),
          })
        )
        .min(1, "At least one pillar is required"),
      measures: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
            color: Yup.string().required(),
          })
        )
        .min(1, "At least one measure is required"),

      start_date: Yup.string()
        .required("Start date is required")
        .typeError("Start date must be a valid date")
        .test(
          "is-valid-date",
          "Start date must be a valid date in DD/MM/YYYY format",
          (value) => isValidDate(value)
        ),
      end_date: Yup.string()
        .required("End date is required")
        .typeError("End date must be a valid date")
        .test(
          "is-valid-date",
          "End date must be a valid date in DD/MM/YYYY format",
          (value) => isValidDate(value)
        ),
    })
  ),
});

const options = [
  { label: "React", value: "react", color: "#61dafb" },
  { label: "Vue", value: "vue", color: "#42b883" },
  { label: "Svelte", value: "svelte", color: "#ff3e00" },
];

interface Task {
  start_date: string;
  end_date: string;
}

const SpecifiedTask = () => {
  const location = usePathname();
  const router = useRouter();

  const [mainEffort, setMainEffort] = useState(EFFORT_DATA);

  const formik = useFormik<any>({
    initialValues: {
      tasks: [
        {
          id: uuidv4(),
          title: "",
          pillars: [],
          measures: [],
          start_date: "",
          end_date: "",
          main_efforts: false,
        },
      ],
      mission_plan_id: "",
      strategic_intent_id: "",
    },
    onSubmit: () => console.log("Submit"),
    validationSchema: validationSchemaTask,
  });

  const handleChange = (value: string, index: number) => {
    const newTasks = [...formik.values.tasks];
    newTasks[index].title = value;
    formik.setFieldValue("tasks", newTasks);
  };

  const touchedTasks = formik.touched.tasks as
    | FormikTouched<Task>[]
    | undefined;

  const errorTasks = formik.errors.tasks as any;

  console.log(formik.values);
  return (
    <div>
      <div className="flex items-center gap-x-2 mb-8">
        <h1 className="text-[#3E4345]">Specified Task</h1>
        <span>
          <BsFillInfoCircleFill color="#84919A" />
        </span>
      </div>
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
                            id="title"
                            name={`tasks.${index}.title`}
                            label="Title"
                            onBlur={formik.handleBlur}
                            placeholder="Input Task"
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            value={formik.values.tasks[index].title}
                          />

                          <ErrorMessage
                            name={`tasks.${index}.title`}
                            className="text-red-500 text-xs mt-1"
                            component={"div"}
                          />
                        </div>

                        <div className="flex-1 w-[100%]">
                          <CustomMultiSelect
                            values={formik.values.tasks[index].pillars}
                            onValuesChange={(values) =>
                              formik.setFieldValue(
                                `tasks.${index}.pillars`,
                                values
                              )
                            }
                            options={options}
                            label="Select Pillars"
                            labelClass="block text-xs text-[#6E7C87] font-normal m-0 p-0 pb-1"
                            onBlur={() =>
                              formik.setFieldTouched(
                                `tasks.${index}.pillars`,
                                true
                              )
                            }
                            triggerClass="rounded-md border bg-transparent text-sm bg-[#F6F8F9] focus-visible:ring-1 file:border-0 file:bg-transparent file:text-sm border-gray-300 shadow-sm py-[7px]"
                            placeholder="Select Pillars"
                            inputClass="py-0 flex transition-colors placeholder:font-light placeholder:text-sm placeholder:text-#6E7C87 file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-#6E7C87"
                            errorClass="text-red-500 text-xs mt-1"
                            itemValue=""
                            name={`tasks.${index}.pillars`}
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
                            values={formik.values.tasks[index].measures}
                            onValuesChange={(values) =>
                              formik.setFieldValue(
                                `tasks.${index}.measures`,
                                values
                              )
                            }
                            options={options}
                            label="Select Measure of Success"
                            labelClass="block text-xs text-[#6E7C87] font-normal m-0 p-0"
                            onBlur={() =>
                              formik.setFieldTouched(
                                `tasks.${index}.measures`,
                                true
                              )
                            }
                            triggerClass="rounded-md border bg-transparent text-sm bg-[#F6F8F9] focus-visible:ring-1 file:border-0 file:bg-transparent file:text-sm border-gray-300 shadow-sm py-[7px] min-w-[20rem]"
                            placeholder="Select Multiple"
                            inputClass="py-0 flex transition-colors placeholder:font-light placeholder:text-sm placeholder:text-#6E7C87 file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-#6E7C87"
                            errorClass="text-red-500 text-xs mt-1"
                            name={`tasks.${index}.measures`}
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
                    title: "",
                    pillars: [],
                    measures: [],
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

          <Button
            type="submit"
            //   disabled={isLoadingStrategicIntent}
            //   loading={isLoadingStrategicIntent}
            onClick={() => router.push(`${location}?ui=implied-task`)}
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
          </Button>
        </div>
      </FormikProvider>
    </div>
  );
};

export default SpecifiedTask;
