import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import { LiaTimesSolid } from "react-icons/lia";
import React, { useEffect, useState } from "react";
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
// import {
//   useCreateMeasureOfSuccessMutation,
//   useGetMyMissionPlanQuery,
// } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { toast } from "sonner";
import {
  useCreateMeasureOfSuccessMutation,
  useLazyGetMyMissionPlanQuery,
} from "@/redux/services/mission-plan/missionPlanApi";
import { PageLoader } from "@/components/custom-loader";

// const { EMPLOYEE } = routesPath;

interface myComponentProps {
  onNextStep?: () => void;
}

const MeasureofSuccess = ({ onNextStep }: myComponentProps) => {
  const router = useRouter();
  const location = usePathname();
  const dispatch = useAppDispatch();

  const [initialValues, setInitialValues] = useState();

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

  const [createMeasureOfSuccess, { isLoading, isSuccess, isError }] =
    useCreateMeasureOfSuccessMutation();
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

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
  const handleFormSubmit = async () => {
    const obj = {
      ...formik.values,
      measures: formik.values.measures?.map((chi) => {
        return {
          ...chi,
          target: chi?.target ? Number(parseFloat(chi.target)) : chi.target,
        };
      }),
    };
    // return;
    await createMeasureOfSuccess(obj)
      .unwrap()
      .then(() => {
        onNextStep && onNextStep();
        toast.success("Measure of Success Created Successfully");
      });
    // try {
    //   await createMeasureOfSuccess(formik.values);
    //   // router.push(`${EMPLOYEE.CREATE_MISSION_PLAN}?ui=strategic-intent`);
    //   if (!isError) {
    //     onNextStep && onNextStep();
    //     toast.success("Measure of Success Created Successfully");
    //   }
    // } catch (error) {}
  };

  // This sets the intial saved values
  useEffect(() => {
    const measuresOfSuccess =
      mission_plan_info?.mission_plan?.measure_of_success?.map(
        (measure: any) => ({
          id: measure.id || "",
          measure: measure.measure || "",
          unit: measure.unit || "",
          target: measure.target || "",
          weight: Number(measure.weight) || "",
        })
      );
    setInitialValues(measuresOfSuccess);
  }, [mission_plan]);

  const handleChange = (
    value: string,
    index: number,
    field: "measure" | "unit" | "target" | "weight"
  ) => {
    formik.setFieldValue(`measures.${index}.${field}`, value);
  };

  const formik = useFormik({
    initialValues: {
      mission_plan_id: mission_plan_info?.mission_plan?.id || "",
      fiscal_year_id:
        mission_plan_info?.mission_plan?.fiscal_year_id ||
        mission_plan_info?.active_fy_info?.id ||
        "",
      measures: initialValues || [
        {
          id: "",
          measure: "",
          unit: "",
          target: "",
          weight: "",
        },
      ],
    },
    validationSchema: measureSuccessSchema,
    onSubmit: handleFormSubmit,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const errorAllSuccess = formik.errors.measures as any;

  // useEffect(() => {
  //   if (formik.errors.measures && typeof formik.errors.measures === "string") {
  //     {
  //       toast.error(formik.errors.measures);
  //     }
  //   }
  // }, [formik.errors]);

  useEffect(() => {
    dispatch(
      updateMissionPlanDetails({
        slug: "measure_of_success",
        data: formik.values,
      })
    );
  }, [formik.values]);

  // check -------------------
  useEffect(() => {
    if (
      !active_fy_info?.template?.success_measures &&
      Object?.keys(active_fy_info)?.length > 0
    ) {
      router?.back();
    }
  }, [active_fy_info]);

  return (
    <div className="pr-4">
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-x-2 mb-8">
            <h2 className="text-[#3E4345]">Measure of Success</h2>
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
                      formik.values.measures.map(
                        (measure: any, index: number) => (
                          <div
                            key={measure.id}
                            className="w-full mb-5 gap-y-5 relative"
                          >
                            <div className="grid lg:grid-cols-3 items-center space-x-2 w-full  relative">
                              <div className="!ml-0">
                                <Input
                                  id={`measure-${measure.id}`}
                                  label={`Measure of Success ${index + 1}`}
                                  labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                                  placeholder="Input measure of success"
                                  name={`measures.${index}.measure`}
                                  error={errorAllSuccess?.measure}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      index,
                                      "measure"
                                    )
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
                              <div className="grid grid-cols-3 col-span-2 gap-x-2">
                                <div className="col-span-1 -mb-1 pb-0 mt-0">
                                  <Label
                                    htmlFor={`unit-${measure.id}`}
                                    className="text-[#6E7C87] text-[13px]"
                                  >
                                    Unit
                                  </Label>
                                  <Select>
                                    <SelectTrigger
                                      className="border px-2 h-fit outline-0 bg-[#F6F8F9] mt-3"
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
                                        value={
                                          formik.values.measures[index].unit
                                        }
                                        id={`success-${measure.id}`}
                                        name={`measures.${index}.intent`}
                                      >
                                        {MEASURE_OF_SUCCESS_UNITS?.map(
                                          (item) => (
                                            <div
                                              key={item}
                                              className="flex items-center space-x-3 space-y-0"
                                            >
                                              <RadioGroupItem
                                                value={item}
                                                id={item}
                                              />
                                              <Label
                                                htmlFor={item}
                                                className="text-[#6E7C87] text-[13px] cursor-pointer"
                                              >
                                                {item}
                                              </Label>
                                            </div>
                                          )
                                        )}
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
                                    type="number"
                                    placeholder="Input number"
                                    labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                                    name={`measures.${index}.target`}
                                    error={errorAllSuccess?.target}
                                    onChange={(e) =>
                                      handleChange(
                                        e.target.value,
                                        index,
                                        "target"
                                      )
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
                                <div className="col-span-1">
                                  <Input
                                    id={`weight-${measure.id}`}
                                    label={`Weight(%)`}
                                    type="number"
                                    placeholder="Input weight%"
                                    labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                                    name={`measures.${index}.weight`}
                                    error={errorAllSuccess?.weight}
                                    onChange={(e) =>
                                      handleChange(
                                        e.target.value,
                                        index,
                                        "weight"
                                      )
                                    }
                                    className="border p-2 bg-[#F6F8F9]"
                                    value={formik.values.measures[index].weight}
                                  />
                                  <ErrorMessage
                                    name={`measures.${index}.weight`}
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
                              <Icon
                                name="remove"
                                width={14.28}
                                height={18.63}
                              />
                            </button>
                          </div>
                        )
                      )}
                    {formik.errors.measures &&
                      typeof formik.errors.measures === "string" && (
                        <span className="text-red-500 text-xs">
                          {" "}
                          {formik?.errors?.measures}{" "}
                        </span>
                      )}
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
                      <LucidePlusCircle
                        color="var(--primary-color)"
                        size={20}
                      />
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

export default MeasureofSuccess;
