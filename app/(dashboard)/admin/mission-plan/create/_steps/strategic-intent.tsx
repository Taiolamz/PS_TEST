import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import { LiaTimesSolid } from "react-icons/lia";
import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { cn } from "@/lib/utils";

const validationSchema = Yup.object().shape({
  // mission_plan_id: Yup.string().required("Mission Plan ID is required"),
  // strategic_intent_id: Yup.string().required("Strategic Intent ID is required"),
  intents: Yup.array().of(
    Yup.object().shape({
      intent: Yup.string().required("Intent is required"),
      behaviours: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().required(),
          value: Yup.string().required("Behaviour is required"),
        })
      ),
    })
  ),
});

const StrategicIntent = () => {
  //   const [
  //     createMissionPlanStrategicIntent,
  //     { isLoading: isLoadingStrategicIntent },
  //   ] = useCreateMissionPlanStrategicIntentMutation();

  //   const handleSaveStrategicIntent = async () => {
  //     const { intents, mission_plan_id, strategic_intent_id } = formik.values;

  //     const transformedIntents = {
  //       intents: intents.map(
  //         (intent: { intent: any; behaviours: { value: any }[] }) => ({
  //           intent: intent.intent,
  //           behaviours: intent.behaviours.map(
  //             (behaviour: { value: any }) => behaviour.value
  //           ),
  //         })
  //       ),
  //       mission_plan_id,
  //       strategic_intent_id,
  //     };

  //     await createMissionPlanStrategicIntent(transformedIntents);
  //   };

  const handleChange = (
    value: string,
    intentIndex: number,
    behaviourIndex?: number
  ) => {
    if (typeof behaviourIndex === "number") {
      formik.setFieldValue(
        `intents.${intentIndex}.behaviours.${behaviourIndex}.value`,
        value
      );
    } else {
      formik.setFieldValue(`intents.${intentIndex}.intent`, value);
    }
  };

  const formik = useFormik<any>({
    initialValues: {
      intents: [
        {
          intent: "",
          behaviours: [{ id: uuidv4(), value: "" }],
        },
      ],
      mission_plan_id: "",
      strategic_intent_id: "",
    },
    onSubmit: async () => null,
    validationSchema: validationSchema,
  });

  const errorIntents = formik.errors.intents as any;

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-5 px-1">
        <h1 className="text-[#3E4345]">Strategic Intent</h1>
        <span>
          <BsFillInfoCircleFill color="#84919A" />
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <FieldArray name="intents">
            {({ insert, remove, push }) => (
              <div>
                {formik.values.intents?.length > 0 &&
                  formik.values.intents.map((intent: any, index: number) => (
                    <div
                      key={index}
                      className="grid gap-y-5 items-center space-x-2 w-full mb-5 relative"
                    >
                      <div>
                        <Textarea
                          rows={4}
                          id="vision"
                          label="Strategic Intent 1"
                          labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                          name={`intents.${index}.intent`}
                          // onChange={(e) => handleChange(e.target.value, index)}
                          error={errorIntents?.intent}
                          onChange={(e) => handleChange(e.target.value, index)}
                          className="border p-2 w-full bg-[#F6F8F9]"
                          value={formik.values.intents.intent}
                        />
                        <ErrorMessage
                          name={`intents.${index}.intent`}
                          className="text-red-500 text-xs"
                          component={"div"}
                        />
                      </div>

                      <FieldArray name={`intents.${index}.behaviours`}>
                        {({ insert, remove: removeBehaviour, push }) => (
                          <div className="grid md:grid-cols-2 items-start gap-x-6 gap-y-3 relative !ml-0 justify-between w-max">
                            {intent.behaviours?.length > 0 &&
                              intent.behaviours.map(
                                (behaviour: any, behaviourIndex: number) => (
                                  <div
                                    key={behaviour.id}
                                    className="items-center w-full relative"
                                  >
                                    <Input
                                      type="text"
                                      id=""
                                      label="Behaviour"
                                      labelClass="text-[#6E7C87] text-[13px] pb-[6px]"
                                      onBlur={formik.handleBlur}
                                      error={
                                        errorIntents?.[index]?.behaviours?.[
                                          behaviourIndex
                                        ]?.value
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e.target.value,
                                          index,
                                          behaviourIndex
                                        )
                                      }
                                      name={`intents.${index}.behaviours.${behaviourIndex}.value`}
                                      placeholder="Behaviour Value"
                                      className="mr-2 w-full md:w-[12rem] lg:w-[20rem] "
                                      value={
                                        formik.values.intents[index].behaviours[
                                          behaviourIndex
                                        ].value
                                      }
                                    />
                                    <ErrorMessage
                                      name={`intents.${index}.behaviours.${behaviourIndex}.value`}
                                      className="text-red-500 text-xs mt-1"
                                      component={"div"}
                                    />

                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeBehaviour(behaviourIndex)
                                      }
                                      className="text-red-600 absolute left-[180px] md:left-[170px] lg:left-[290px] top-[39px]"
                                    >
                                      <LiaTimesSolid />
                                    </button>
                                  </div>
                                )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ id: uuidv4(), value: "" })}
                              className="text-left flex items-center gap-x-2 relative mt-4 md:mt-8 text-primary text-sm"
                            >
                              <LucidePlusCircle color="#04ACAC" size={20} />
                              Add Behaviour
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 absolute -right-6 top-16"
                      >
                        <Icon name="remove" width={14.28} height={18.63} />
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={() =>
                    push({
                      intent: "",
                      behaviours: [""],
                    })
                  }
                  className="flex items-center gap-2 mt-8 text-primary text-sm"
                >
                  <LucidePlusCircle color="#04ACAC" size={20} />
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
              loadingText="Save & Continue"
              className={cn(
                "w-full",
                // !formik.isValid || isLoadingStrategicIntent
                //   ? "opacity-50 cursor-not-allowed w-max"
                //   :
                "cursor-pointer text-white py-5 px-2 rounded-sm bg-primary border border-primary w-max"
              )}
              // className={`text-white py-5 px-2 rounded-sm bg-primary border border-primary min-w-28`}
            >
              Save & Continue
            </Button>
          </div>
        </FormikProvider>
      </form>
    </div>
  );
};

export default StrategicIntent;
