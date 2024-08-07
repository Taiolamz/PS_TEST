import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import { LiaTimesSolid } from "react-icons/lia";
import React, { useEffect, useMemo, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import {
  useAddStrategicIntentMutation,
} from "@/redux/services/mission-plan/missionPlanApi";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { setStrategicIntentsSchema } from "@/utils/schema/mission-plan";

interface StrategicIntentProps {
  currentMissionPlan?: CurrentMissionPlanData[] | any;
}

const StrategicIntent = ({ currentMissionPlan }: StrategicIntentProps) => {
  const location = usePathname();
  const router = useRouter();

  const [addStrategicIntent, { isLoading: isLoadingStrategicIntent }] =
    useAddStrategicIntentMutation();

  const [initialValues, setInitialValues] = useState();

  const handleSaveStrategicIntent = async () => {
    const { intents, mission_plan_id, strategic_intent_id } = formik.values;

    const transformedIntents = {
      intents: intents.map(
        (intent: { intent: any; behaviours: { value: any }[] }) => ({
          intent: intent.intent,
          behaviours: intent.behaviours.map(
            (behaviour: { value: any }) => behaviour.value
          ),
        })
      ),
      mission_plan_id,
      strategic_intent_id,
    };
    try {
      await addStrategicIntent(transformedIntents).unwrap();
      router.push(`${location}?ui=specified-intent`);
      toast.success("Strategic intent saved successfully");
    } catch (error) {}
  };

  const handleChange = (
    value: string,
    index: number,
    behaviourIndex?: number | undefined
  ) => {
    if (typeof behaviourIndex === "undefined") {
      formik.setFieldValue(`intents.${index}.intent`, value);
    } else {
      formik.setFieldValue(
        `intents.${index}.behaviours.${behaviourIndex}.value`,
        value
      );
    }
  };

  // This sets the intial saved values
  useEffect(() => {
    const intents = currentMissionPlan?.strategic_intents.map(
      (intent: any) => ({
        intent: intent.intent,
        behaviours: JSON.parse(intent.behaviours).map((behaviour: string) => ({
          id: uuidv4(),
          value: behaviour,
        })),
      })
    );

    setInitialValues(intents);
  }, [currentMissionPlan]);

  // This prevents an infinite loop by memoizing the values
  const initialVals = useMemo(() => {
    if (initialValues) {
      return initialValues;
    }
    return {
      intents: [
        {
          intent: "",
          behaviours: [{ id: uuidv4(), value: "" }],
        },
      ],
      mission_plan_id: "",
      strategic_intent_id: "",
    };
  }, [initialValues]);

  const formik = useFormik<any>({
    initialValues: {
      intents: [
        {
          intent: "",
          behaviours: [{ id: uuidv4(), value: "" }],
        },
      ],
      mission_plan_id: currentMissionPlan?.mission_statement?.mission_plan_id,
      strategic_intent_id: "",
    },
    onSubmit: handleSaveStrategicIntent,
    validationSchema: setStrategicIntentsSchema,
    // enableReinitialize: true,
  });

  const errorIntents = formik.errors.intents as any;
  const touchedIntents = formik.touched.intents as any;

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-8">
        <h1 className="text-[#3E4345]">Set Strategic Intent</h1>
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
                      key={intent?.id}
                      className="grid gap-y-5 items-center space-x-2 w-full mb-5 relative max-w-4xl"
                    >
                      <div className="!ml-0">
                        <Textarea
                          rows={4}
                          placeholder="Input Statement"
                          id={`intent-${intent?.id}`}
                          onBlur={formik.handleBlur}
                          label={`Strategic Intent ${index + 1}`}
                          labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                          name={`intents.${index}.intent`}
                          error={errorIntents?.[index].intent}
                          touched={touchedIntents?.[index].intent}
                          onChange={(e) => handleChange(e.target.value, index)}
                          className="border p-2 md:min-w-[27rem] lg:min-w-[37rem] bg-[#F6F8F9]"
                          value={formik?.values?.intents[index]?.intent}
                        />
                      </div>

                      <FieldArray name={`intents.${index}.behaviours`}>
                        {({ insert, remove: removeBehaviour, push }) => (
                          <div className="grid md:grid-cols-2 items-start gap-x-6 gap-y-3 relative !ml-0 justify-between w-max">
                            {intent?.behaviours?.length > 0 &&
                              intent?.behaviours.map(
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
                                      touched={
                                        touchedIntents?.[index]?.behaviours?.[
                                          behaviourIndex
                                        ]?.value
                                      }
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
                                      placeholder="Input Behaviour"
                                      className="mr-2 w-full md:w-[12rem] lg:w-[20rem] "
                                      value={
                                        formik.values.intents[index].behaviours[
                                          behaviourIndex
                                        ].value
                                      }
                                    />

                                    <button
                                      type="button"
                                      onClick={() =>
                                        behaviourIndex !== 0 &&
                                        removeBehaviour(behaviourIndex)
                                      }
                                      className={`text-red-600 absolute left-[180px] md:left-[170px] lg:left-[290px] top-[39px] ${
                                        behaviourIndex === 0 && "cursor-default"
                                      }`}
                                    >
                                      {behaviourIndex !== 0 && (
                                        <LiaTimesSolid />
                                      )}
                                    </button>
                                  </div>
                                )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ id: uuidv4(), value: "" })}
                              className="text-left flex items-center gap-x-2 relative mt-4 md:mt-8 text-[var(--primary-color)] text-sm"
                            >
                              <LucidePlusCircle
                                style={{ color: "var(--primary-color)" }}
                                size={20}
                              />
                              Add new Behaviour
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
                  className="flex items-center gap-2 mt-8 text-[var(--primary-color)] text-sm"
                >
                  <LucidePlusCircle
                    style={{ color: "var(--primary-color)" }}
                    size={20}
                  />
                  Add new Strategic intent
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
              disabled={isLoadingStrategicIntent}
              loading={isLoadingStrategicIntent}
              // onClick={() => router.push(`${location}?ui=specified-intent`)}
              loadingText="Save & Continue"
              className={cn(
                "w-full",
                !formik.isValid || isLoadingStrategicIntent
                  ? "opacity-50 cursor-not-allowed w-max py-5 px-2"
                  : "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
              )}
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
