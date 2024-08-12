import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import { LiaTimesSolid } from "react-icons/lia";
import React, { useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
// import { useAddStrategicIntentMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MEASURE_OF_SUCCESS_UNITS } from "../_data";
import { measureSuccessSchema } from "@/utils/schema/mission-plan";
import {
  useCreateMeasureOfSuccessMutation,
  useGetMyMissionPlanQuery,
} from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { toast } from "sonner";

const { ADMIN } = routesPath;

const MeasureofSuccess = () => {
  const [createMeasureOfSuccess, { isLoading, isSuccess }] =
    useCreateMeasureOfSuccessMutation();
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

  const { data: my_mission_plan } = useGetMyMissionPlanQuery({});

  console.log(my_mission_plan);
  const location = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  //   const [addStrategicIntent, { isLoading: isLoadingStrategicIntent }] =
  //     useAddStrategicIntentMutation();

  const handleFormSubmit = async () => {
    // const { intents, mission_plan_id, strategic_intent_id } = formik.values;
    // const transformedIntents = {
    //   intents: intents.map(
    //     (intent: { intent: any; behaviours: { value: any }[] }) => ({
    //       intent: intent.intent,
    //       behaviours: intent.behaviours.map(
    //         (behaviour: { value: any }) => behaviour.value
    //       ),
    //     })
    //   ),
    //   mission_plan_id,
    //   strategic_intent_id,
    // };

    try {
      // console.log(formik.values);
      await createMeasureOfSuccess(formik.values);
      if (isSuccess) {
        router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=strategic-intent`);
        toast.success("Measure of Success Created Successfully");
      }
    } catch (error) {}
  };

  const handleChange = (
    value: string,
    index: number,
    field: "measure" | "unit" | "target"
  ) => {
    formik.setFieldValue(`measures.${index}.${field}`, value);
  };

  const formik = useFormik({
    initialValues: {
      mission_plan_id: active_fy_info?.id,
      measures: [
        {
          id: "",
          measure: "",
          unit: "",
          target: "",
        },
      ],
    },
    validationSchema: measureSuccessSchema,
    onSubmit: handleFormSubmit,
    validateOnMount: true,
  });

  const errorAllSuccess = formik.errors.measures as any;

  console.log(active_fy_info);

  useEffect(() => {
    dispatch(
      updateMissionPlanDetails({
        slug: "measure_of_success",
        data: formik.values,
      })
    );
  }, [formik.values]);

  return (
    <div className="pr-4">
      <div className="flex items-center gap-x-2 mb-8">
        <h1 className="text-[#3E4345]">Measure of Success</h1>
        <span>
          <BsFillInfoCircleFill color="#84919A" />
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <FieldArray name="measures">
            {({ insert, remove, push }) => (
              <div>
                {formik.values.measures?.length > 0 &&
                  formik.values.measures.map((measure: any, index: number) => (
                    <div
                      key={measure.id}
                      className="w-full mb-5 gap-y-5 relative"
                    >
                      <div className="grid lg:grid-cols-2 items-center space-x-2 w-full  relative">
                        <div className="!ml-0">
                          <Input
                            id={`measure-${measure.id}`}
                            label={`Measure of Success ${index + 1}`}
                            labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                            placeholder="Input measure of success"
                            name={`measures.${index}.measure`}
                            error={errorAllSuccess?.measure}
                            onChange={(e) =>
                              handleChange(e.target.value, index, "measure")
                            }
                            className="border p-2 bg-[#F6F8F9]"
                            value={formik.values.measures[index].measure}
                          />
                          <ErrorMessage
                            name={`measures.${index}.measure`}
                            className="text-red-500 text-xs"
                            component={"div"}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-x-2">
                          <div className="col-span-1 -mb-1 pb-0 mt-2">
                            <Label
                              htmlFor={`unit-${measure.id}`}
                              className="text-[#6E7C87] text-[13px] mb-[6px]"
                            >
                              Unit
                            </Label>
                            <Select>
                              <SelectTrigger
                                className="border p-2 outline-0 bg-[#F6F8F9]"
                                error={errorAllSuccess?.measure}
                              >
                                <SelectValue
                                  placeholder={
                                    formik.values.measures[index].unit ||
                                    "Select Unit"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <RadioGroup
                                  onValueChange={(e) =>
                                    handleChange(e, index, "unit")
                                  }
                                  className="flex flex-col space-y-1"
                                  value={formik.values.measures[index].unit}
                                  id={`success-${measure.id}`}
                                  name={`measures.${index}.intent`}
                                >
                                  {MEASURE_OF_SUCCESS_UNITS?.map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center space-x-3 space-y-0"
                                    >
                                      <RadioGroupItem value={item} id={item} />
                                      <Label
                                        htmlFor={item}
                                        className="text-[#6E7C87] text-[13px] cursor-pointer"
                                      >
                                        {item}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </SelectContent>
                            </Select>
                            <ErrorMessage
                              name={`measures.${index}.unit`}
                              className="text-red-500 text-xs"
                              component={"div"}
                            />
                          </div>
                          <div className="col-span-1">
                            <Input
                              id={`target-${measure.id}`}
                              label={`Target`}
                              placeholder="Input number"
                              labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                              name={`measures.${index}.target`}
                              error={errorAllSuccess?.target}
                              onChange={(e) =>
                                handleChange(e.target.value, index, "target")
                              }
                              className="border p-2 bg-[#F6F8F9]"
                              value={formik.values.measures[index].target}
                            />
                            <ErrorMessage
                              name={`measures.${index}.target`}
                              className="text-red-500 text-xs"
                              component={"div"}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 absolute right-0 -bottom-6 xl:-right-6 xl:bottom-3"
                      >
                        <Icon name="remove" width={14.28} height={18.63} />
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={() =>
                    push({
                      id: "",
                      measure: "",
                      unit: "",
                      target: "",
                    })
                  }
                  className="flex items-center gap-2 mt-8 text-[var(--primary-color)] text-sm"
                >
                  <LucidePlusCircle color="var(--primary-color)" size={20} />
                  Add more level
                </button>
              </div>
            )}
          </FieldArray>
          <div className="mt-8 flex gap-x-2 items-center">
            <Button
              variant="outline"
              type="button"
              className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              loading={isLoading}
              loadingText="Save & Continue"
              className={""}
            >
              Save & Continue
            </Button>
          </div>
        </FormikProvider>
      </form>
    </div>
  );
};

export default MeasureofSuccess;
