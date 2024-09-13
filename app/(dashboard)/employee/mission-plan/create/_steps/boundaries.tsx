import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MissionDetailPreview from "./preview";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { LucidePlusCircle } from "lucide-react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { LiaTimesSolid } from "react-icons/lia";
import Icon from "@/components/icon/Icon";
import { boundariesSchema } from "@/utils/schema/mission-plan";
import { useAppSelector } from "@/redux/store";
import {
  useCreateBoundariesMutation,
  useLazyGetMyMissionPlanQuery,
} from "@/redux/services/mission-plan/missionPlanApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { PageLoader } from "@/components/custom-loader";

interface myComponentProps {
  onNextStep?: () => void;
}

const Boundaries = ({ onNextStep }: myComponentProps) => {
  const { mission_plan: mission_plan_info } = useAppSelector(
    (state) => state.mission_plan
  );

  const [
    getMyMissionPlan,
    {
      data: mission_plan,
      isLoading: isLoadingMissionPlan,
      isFetching: isFetchingMissionPlan,
      isSuccess: fetchedMissionPlan,
    },
  ] = useLazyGetMyMissionPlanQuery({});

  const initialValues = {
    constraints: [""],
    freedoms: [""],
    mission_plan_id: mission_plan?.data?.mission_plan?.id,
  };

  const [createBoundaries, { isLoading: isCreatingBoundaries }] =
    useCreateBoundariesMutation();
  const router = useRouter();
  const location = usePathname();
  const step = useSearchParams().get("step");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: boundariesSchema,
    onSubmit: async (values) => {
      const obj = {
        ...values,
        mission_plan_id: mission_plan?.data?.mission_plan?.id,
        fiscal_year_id:
        mission_plan_info?.mission_plan?.fiscal_year_id ||
        mission_plan_info?.active_fy_info?.id ||
        "",
      };
      await createBoundaries(obj)
        .unwrap()
        .then(() => {
          toast.success("Freedom and Constraints Created Successfully");
          setTimeout(() => {
            toast.dismiss();
            onNextStep && onNextStep();
            // router.push(`${location}?ui=boundaries&step=preview`);
          }, 2000);
        });
    },
  });

  const FISCAL_YEAR_ID = mission_plan_info?.active_fy_info?.id || "";

  const handleGetMyMissionPlan = async () => {
    const payload = { id: FISCAL_YEAR_ID };
    getMyMissionPlan(payload)
      .unwrap()
      .then((payload) => {
        console.log(payload, "payload");
        if (payload?.data?.mission_plan?.boundaries?.length > 0) {
          const boundary = payload?.data?.mission_plan?.boundaries[0];
          console.log(boundary, "boundaries");
          formik.setValues({
            constraints:
              boundary.constraints.length > 0 ? boundary.constraints : [""],
            freedoms: boundary.freedoms.length > 0 ? boundary.freedoms : [""],
            mission_plan_id: boundary.mission_plan_id,
          });
        }
      });
  };

  useEffect(() => {
    handleGetMyMissionPlan();
  }, [FISCAL_YEAR_ID]);

   // check -------------------
   const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  useEffect(() => {
    if (
      !active_fy_info?.template?.boundaries &&
      Object?.keys(active_fy_info)?.length > 0
    ) {
      router?.back();
    }
  }, [active_fy_info]);

  return (
    <>
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <>
          {step !== "preview" && (
            <FormikProvider value={formik}>
              <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                className="space-y-8"
              >
                {/* Constraints */}
                <div>
                  <div className="flex items-center gap-x-2 mb-8">
                    <h2 className="text-[#3E4345]">Constraint</h2>
                    <span>
                      <BsFillInfoCircleFill color="#84919A" />
                    </span>
                  </div>
                  <FieldArray name="constraints">
                    {({ push, remove }) => (
                      <div className="max-w-5xl grid grid-cols-2 gap-y-4 items-center gap-x-5 relative">
                        {formik.values.constraints.map((_, index) => (
                          <div key={index} className="w-full">
                            <div className="relative">
                              <Input
                                type="text"
                                id={`constraints.${index}`}
                                name={`constraints.${index}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.constraints[index]}
                                placeholder="Input constraint"
                                label={`Constraint ${index + 1}`}
                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-[var(--input-bg)]"
                              />
                              {index > 1 && (
                                <span
                                  onClick={() => remove(index)}
                                  className=""
                                >
                                  <Icon
                                    name="remove"
                                    width={14.28}
                                    height={18.63}
                                    className="absolute cursor-pointer text-red-600 right-[20px] bottom-[10px]"
                                  />
                                </span>
                              )}
                            </div>
                            <div className="text-red-500 text-xs mt-1">
                              {formik.touched.constraints &&
                              formik.errors.constraints?.[index]
                                ? formik.errors.constraints[index]
                                : null}
                            </div>
                          </div>
                        ))}
                        <div className="w-full">
                          <button
                            type="button"
                            onClick={() => push("")}
                            className="flex items-center gap-2 mt-8 text-[var(--primary-color)] text-sm"
                          >
                            <LucidePlusCircle
                              style={{ color: "var(--primary-color)" }}
                              size={20}
                            />
                            Add new Constraints
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* Freedoms */}
                <div>
                  <div className="flex items-center gap-x-2 mb-8">
                    <h2 className="text-[#3E4345]">Freedoms</h2>
                    <span>
                      <BsFillInfoCircleFill color="#84919A" />
                    </span>
                  </div>
                  <FieldArray name="freedoms">
                    {({ push, remove }) => (
                      <div className="max-w-5xl grid grid-cols-2 gap-y-4 items-center gap-x-5 relative">
                        {formik.values.freedoms.map((_, index) => (
                          <div key={index} className="w-full">
                            <div className="relative">
                              <Input
                                type="text"
                                id={`freedoms.${index}`}
                                name={`freedoms.${index}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.freedoms[index]}
                                label={`Freedom ${index + 1}`}
                                placeholder="Input freedom"
                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-[var(--input-bg)]"
                              />
                              {index > 1 && (
                                <span
                                  onClick={() => remove(index)}
                                  className=""
                                >
                                  <Icon
                                    name="remove"
                                    width={14.28}
                                    height={18.63}
                                    className="absolute cursor-pointer text-red-600 right-[20px] bottom-[10px]"
                                  />
                                </span>
                              )}
                            </div>
                            <div className="text-red-500 text-xs mt-1">
                              {formik.touched.freedoms &&
                              formik.errors.freedoms?.[index]
                                ? formik.errors.freedoms[index]
                                : null}
                            </div>
                          </div>
                        ))}
                        <div className="w-full">
                          <button
                            onClick={() => push("")}
                            type="button"
                            className="flex items-center gap-2 mt-8 text-[var(--primary-color)] text-sm"
                          >
                            <LucidePlusCircle
                              style={{ color: "var(--primary-color)" }}
                              size={20}
                            />
                            Add new Freedom
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* Button */}
                <div className="mt-8 flex gap-x-2 items-center">
                  <Button
                    variant="outline"
                    className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
                    type="button"
                    onClick={router.back}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreatingBoundaries}
                    loading={isCreatingBoundaries}
                    loadingText="Save & Continue"
                    className={cn(
                      "w-full",
                      !formik.isValid || !formik.dirty
                        ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm"
                        : "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
                    )}
                  >
                    Save & Continue
                  </Button>
                </div>
              </form>
            </FormikProvider>
          )}
          {step === "preview" && (
            <MissionDetailPreview
              isFetchingMissionPlan={isFetchingMissionPlan}
              missionDetails={mission_plan?.data?.mission_plan}
            />
          )}
        </>
      )}
    </>
  );
};

export default Boundaries;
