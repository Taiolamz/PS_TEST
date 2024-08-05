import { CustomAccordion } from "@/components/custom-accordion";
import CustomDateInput from "@/components/custom-date-input";
import Icon from "@/components/icon/Icon";
import CustomMultiSelect from "@/components/inputs/custom-multiselect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatRMDatePicker } from "@/utils/helpers/date-formatter";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { v4 as uuidv4 } from "uuid";

const ImpliedTask = () => {
  const options = [
    { label: "React", value: "react", color: "#61dafb" },
    { label: "Vue", value: "vue", color: "#42b883" },
    { label: "Svelte", value: "svelte", color: "#ff3e00" },
  ];

  const formik = useFormik<any>({
    initialValues: {
      tasks: [
        {
          task: "",
          user_id: "",
          specified_task_id: "",
          implied_task_id: "",
          weight: "",
          percentage: "",
          start_date: "",
          resources: [],
          end_date: "",
          expected_outcomes: [""],
        },
      ],
      mission_plan_id: "string",
    },
    onSubmit: async () => "",
    // validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="pr-4">
      <h1>Implied Task</h1>

      <form onSubmit={formik.handleSubmit} className="mt-7">
        <FormikProvider value={formik}>
          <FieldArray name="tasks">
            {({ insert, remove, push }) => (
              <div>
                {formik.values.tasks?.length > 0 &&
                  formik.values.tasks.map((tasks: any, index: number) => (
                    <div
                      key={tasks.id}
                      className="grid gap-y-5 items-center space-x-2 w-full mb-5 relative"
                    >
                      <CustomAccordion
                        key={tasks.id}
                        triggerClass="border border-custom-divider px-4 py-2 rounded-sm mb-4"
                        className="mb-4 rounded w-full flex flex-col gap-1"
                        contentClass="border border-custom-divider px-5 py-6 rounded-sm"
                        contentWrapperClass="overflow-visible"
                        title={
                          <p className="font-medium text-sm text-graySecondary">
                            Achieve $1 Billion in Company Revenue for the
                            Financial year
                          </p>
                        }
                        content={
                          <div>
                            <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4">
                              <div>
                                <Input
                                  type="text"
                                  id=""
                                  label="Task 1"
                                  labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                  onBlur={formik.handleBlur}
                                  error={""}
                                  onChange={(e) => ""}
                                  name={`tasks.${index}.value`}
                                  placeholder="Input Task"
                                  className="mr-2 w-full"
                                  value={formik.values.tasks[index].task.value}
                                />
                                {/* <ErrorMessage
                                  name={`intents.${index}.behaviours.value`}
                                  className="text-red-500 text-xs mt-1"
                                  component={"div"}
                                /> */}
                              </div>
                              <div>
                                <Input
                                  type="text"
                                  id=""
                                  label="Input Weight"
                                  labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                  onBlur={formik.handleBlur}
                                  error={""}
                                  onChange={(e) => ""}
                                  name={`tasks.${index}.value`}
                                  placeholder="Input Weight"
                                  className="mr-2 w-full"
                                  value={
                                    formik.values.tasks?.[index].weight.value
                                  }
                                />
                                {/* <ErrorMessage
                                  name={`intents.${index}.behaviours.value`}
                                  className="text-red-500 text-xs mt-1"
                                  component={"div"}
                                /> */}
                              </div>
                              <div>
                                <Input
                                  type="text"
                                  id=""
                                  label="Input Percentage"
                                  labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                  onBlur={formik.handleBlur}
                                  error={""}
                                  onChange={(e) => ""}
                                  name={`intents.${index}.value`}
                                  placeholder="Input Percentage"
                                  className="mr-2 w-full"
                                  value={
                                    formik.values.tasks[index].percentage.value
                                  }
                                />
                                {/* <ErrorMessage
                                  name={`intents.${index}.behaviours.value`}
                                  className="text-red-500 text-xs mt-1"
                                  component={"div"}
                                /> */}
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-x-3 mt-6">
                              <div className="mt-1">
                                <CustomMultiSelect
                                  values={
                                    formik.values.tasks?.[index].resources
                                  }
                                  onValuesChange={(values) =>
                                    formik.setFieldValue(
                                      `tasks.${index}.resources`,
                                      values
                                    )
                                  }
                                  options={options}
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
                                  id="start_date"
                                  label="Start date"
                                  selected={
                                    formik.values.tasks?.[index].start_date
                                      .value
                                  }
                                  handleChange={(date) =>
                                    formik.setFieldValue(
                                      "date_of_birth",
                                      formatRMDatePicker(date)
                                    )
                                  }
                                  error={""}
                                  className="relative"
                                  iconClass="top-[2.7rem]"
                                  isRequired
                                />
                                <CustomDateInput
                                  id="end_date"
                                  label="End date"
                                  selected={
                                    formik.values.tasks?.[index].end_date.value
                                  }
                                  handleChange={(date) =>
                                    formik.setFieldValue(
                                      "end_date",
                                      formatRMDatePicker(date)
                                    )
                                  }
                                  error={""}
                                  className="relative"
                                  iconClass="top-[2.7rem]"
                                  isRequired
                                />
                              </div>
                            </div>

                            <FieldArray
                              name={`tasks.${index}.expected_outcomes`}
                            >
                              {({ insert, remove: removeBehaviour, push }) => (
                                <div className="grid md:grid-cols-2 items-start gap-x-6 gap-y-3 relative !ml-0 justify-between w-max mt-4">
                                  {tasks.expected_outcomes?.length > 0 &&
                                    tasks.expected_outcomes.map(
                                      (
                                        expected_outcomes: any,
                                        expectedOutcomesIndex: number
                                      ) => (
                                        <div
                                          key={expected_outcomes.id}
                                          className="items-center w-full relative"
                                        >
                                          <Input
                                            type="text"
                                            id=""
                                            label="Expected Outcomes"
                                            labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                            onBlur={formik.handleBlur}
                                            error={
                                              "errorIntents?.[index]?.behaviours?.value"
                                            }
                                            onChange={(e) => ""}
                                            name={`tasks.${index}.expected_outcomes.${expectedOutcomesIndex}.value`}
                                            placeholder="Input Expected Outcomes"
                                            className="mr-2 w-full md:w-[12rem] lg:w-[20rem] "
                                            value={
                                              formik.values.tasks[index]
                                                .expected_outcomes[
                                                expectedOutcomesIndex
                                              ].value
                                            }
                                          />
                                          <ErrorMessage
                                            name={`tasks.${index}.expected_outcomes.${expectedOutcomesIndex}.value`}
                                            className="text-red-500 text-xs mt-1"
                                            component={"div"}
                                          />

                                          <button
                                            type="button"
                                            onClick={() =>
                                              expectedOutcomesIndex !== 0 &&
                                              removeBehaviour(
                                                expectedOutcomesIndex
                                              )
                                            }
                                            className={`text-red-600 absolute left-[180px] md:left-[170px] lg:left-[290px] top-[39px] ${
                                              expectedOutcomesIndex === 0 &&
                                              "cursor-default"
                                            }`}
                                          >
                                            <LiaTimesSolid />
                                          </button>
                                        </div>
                                      )
                                    )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      push({ id: uuidv4(), value: "" })
                                    }
                                    className="text-left flex items-center gap-x-2 relative mt-4 md:mt-8 text-primary text-sm"
                                  >
                                    <LucidePlusCircle
                                      size={20}
                                      style={{ color: "var(--primary-color)" }}
                                    />
                                    Add Expected Outcome
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
                        <Icon name="remove" width={14.28} height={18.63} />
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={() =>
                    push({
                      task: "",
                      weight: "",
                      percentage: "",
                      start_date: "",
                      resources: [],
                      end_date: "",
                      expected_outcomes: [""],
                    })
                  }
                  className="flex items-center gap-2 mt-8 text-primary text-sm"
                >
                  <LucidePlusCircle
                    size={20}
                    style={{ color: "var(--primary-color)" }}
                  />
                  Add more level
                </button>
              </div>
            )}
          </FieldArray>
          <div className="mt-8 flex gap-x-2 items-center">
            <Button
              variant="outline"
              className={`text-primary py-5 px-2 rounded-sm bg-transparent border border-primary min-w-28`}
            >
              Back
            </Button>
            <Button
              type="submit"
              //   disabled={isLoadingStrategicIntent}
              //   loading={isLoadingStrategicIntent}
              // onClick={() => router.push(`${location}?ui=specified-intent`)}
              loadingText="Save & Continue"
              className={cn(
                "w-full",
                // !formik.isValid || isLoadingStrategicIntent

                //   ?
                //    "opacity-50 cursor-not-allowed w-max py-5 px-2"
                //   :
                "cursor-pointer text-white py-5 px-2 rounded-sm bg-primary border border-primary w-max"
              )}
            >
              Save & Continue
            </Button>
          </div>
        </FormikProvider>
      </form>
      <div className="mt-7"></div>
    </div>
  );
};

export default ImpliedTask;
