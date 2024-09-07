import { Dictionary } from "@/@types/dictionary";
import Icon from "@/components/icon/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateFinancialYearDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useUpdateStrategicPillarsMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { FieldArray, Form, Formik } from "formik";
import { LucidePlusCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// import FinancialYearPreview from "./preview";

const { ADMIN } = routesPath;

const StrategicPillarUpdate = () => {
  const {
    active_fy_info: { strategic_pillars, id: FYID },
  } = useAppSelector((state) => state?.mission_plan?.mission_plan);
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const [initialValues, setInitialValues] = useState<{
    pillars: { id: string; title: string }[];
  }>({
    pillars: strategic_pillars || [{ id: "", title: "" }],
  });
  const [updateStrategicPillars, { isLoading }] =
    useUpdateStrategicPillarsMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const ui = useSearchParams().get("ui");
  const step = useSearchParams().get("step");

  const handleFormSubmit = async (values: Dictionary) => {
    dispatch(
      updateFinancialYearDetails({ slug: "strategic_pillars", data: values })
    );

    const pillars = values?.pillars?.map((d: any) => d.title);
    const obj = {
      strategic_pillars: pillars,
      id: FYID,
    };
    await updateStrategicPillars(obj)
      .unwrap()
      .then(() => {
        toast.success("Strategic Pillars Updated Successfully");
        // router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=timeline-reminder`);
        router.push(`${ADMIN.SINGLE_MISSION_PLAN}?id=${FYID}`);

        // router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=strategic-pillar&step=preview`)
      });
  };

  return (
    <>
      {step !== "preview" && (
        <div className="w-[30vw]">
          <h1>Strategic Pillar</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            enableReinitialize={true}
          >
            {(formik) => (
              <Form>
                <FieldArray name="pillars">
                  {({ insert, remove, push }) => (
                    <div className="flex flex-col gap-5">
                      {formik.values.pillars.length > 0 &&
                        formik.values.pillars.map((pillar, idx) => (
                          <div key={pillar.id || idx}>
                            <div className="relative">
                              <Input
                                label={`Pillar ${idx + 1}`}
                                id={`pillar-${idx}`}
                                name={`pillars[${idx}].title`}
                                value={pillar.title}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `pillars[${idx}].title`,
                                    e.target.value
                                  );
                                }}
                                placeholder="Input Strategic Pillar"
                                className="bg-white"
                              />

                              {formik.values.pillars.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(idx)}
                                  className="text-red-500 hover:text-red-700 absolute -right-5 top-8"
                                >
                                  <Icon
                                    name="remove"
                                    width={14.28}
                                    height={18.63}
                                  />
                                </button>
                              )}
                            </div>

                            {formik.values.pillars.length === idx + 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  push({
                                    id: "",
                                    title: "",
                                  });
                                }}
                                className="text-left flex items-center gap-x-2 relative mt-10 text-primary text-sm"
                              >
                                <LucidePlusCircle
                                  size={20}
                                  style={{ color: "var(--primary-color)" }}
                                />
                                Add New Pillar
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </FieldArray>
                <div className="mt-7 flex gap-4 items-center">
                  <Button
                    className="border border-[var(--primary-color)] text-[var(--primary-color)] px-10 shadow-none bg-white hover:bg-none"
                    type="button"
                    onClick={() =>
                      router.push(
                        `${ADMIN.KICK_START_MISSION_PLAN}?ui=mission-vision`
                      )
                    }
                  >
                    Back
                  </Button>
                  <Button
                    className="border"
                    type="submit"
                    disabled={
                      isLoading ||
                      formik.values.pillars.some(
                        (pillar) => pillar.title === ""
                      )
                    }
                    loading={isLoading}
                    loadingText="Save & Continue"
                  >
                    Save & Continue
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {/* {step === 'preview' && <FinancialYearPreview />} */}
    </>
  );
};

export default StrategicPillarUpdate;
