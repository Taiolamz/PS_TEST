import { Dictionary } from "@/@types/dictionary";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useUpdateFiscalYearMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { missionVissionSchema } from "@/utils/schema/mission-plan";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const { ADMIN } = routesPath;

const MissionVisionUpdate = () => {
  const {
    active_fy_info: { id: FYID, status, vision, mission, review_period },
  } = useAppSelector((state) => state?.mission_plan?.mission_plan);

  const [initialValues, setInitialValues] = useState<{
    mission: string;
    vision: string;
    id: string;
    review_period: string;
  }>({
    id: FYID || "",
    review_period: review_period || "",
    mission: mission,
    vision: vision || {
      mission: "",
      vision: "",
    },
  });
  const [updateFiscalYear, { isLoading }] = useUpdateFiscalYearMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ui = useSearchParams().get("ui");
  const step = useSearchParams().get("step");

  const handleFormSubmit = async (values: Dictionary) => {
    let payload = {
      ...values,
    };

    updateFiscalYear(payload)
      .unwrap()
      .then(() => {
        toast.success("Mission and Vision Updated Successfully");
        router.push(`${ADMIN.SINGLE_MISSION_PLAN}?id=${FYID}`);
      });

    const dispatchPayload = {
      ...payload,
      status,
    };

    dispatch(
      updateMissionPlanDetails({
        slug: "active_fy_info",
        data: { ...dispatchPayload },
      })
    );
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: missionVissionSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="w-[40vw]">
      <h1>Mission and Vision</h1>
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="gap-5">
          <div className="">
            <Textarea
              label="1. Company Vision"
              id="vision"
              name="vision"
              rows={5}
              value={formik.values.vision}
              onChange={formik.handleChange}
              touched={formik.touched.vision}
              error={formik.errors.vision}
              placeholder="To be a pacesetter in digital transformation and software solutions in West Africa by 2025"
              className="bg-white"
            />
          </div>

          <div className="mt-5">
            <Textarea
              label="2. Company Mission"
              id="mission"
              name="mission"
              rows={5}
              value={formik.values.mission}
              onChange={formik.handleChange}
              touched={formik.touched.mission}
              error={formik.errors.mission}
              placeholder="Providing you with innovative software solutions that exceed your expectations."
              className="bg-white"
            />
          </div>
        </div>
        <div className="mt-5 flex gap-4 items-center">
          <Button
            className="border"
            type="submit"
            disabled={
              isLoading ||
              !formik.values.vision ||
              !formik.values.mission ||
              status !== "active"
            }
            loading={isLoading}
            loadingText="Save Changes"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MissionVisionUpdate;
