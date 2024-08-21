import { Dictionary } from "@/@types/dictionary";
import { ManceLogoLoader, PageLoader } from "@/components/custom-loader";
import { EmptyState } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { updateMissionPlanPreview } from "@/redux/features/mission-plan/missionPlanPreviewSlice";
import { useLazyGetMyMissionPlanQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppSelector } from "@/redux/store";
import { SUPER_ADMIN } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Preview from "./preview";

const { ADMIN } = routesPath;

const MyMissionPlan = () => {
  const [getMyMissionPlan, { data: my_mission_plan, isLoading }] = useLazyGetMyMissionPlanQuery({});

  const user_info: Dictionary = useAppSelector((state) => state?.auth?.user);

  const { mission_plan: mission_plan_info } = useAppSelector((state) => state.mission_plan)

  const FISCAL_YEAR_ID = mission_plan_info?.active_fy_info?.id || ""


  const dispatch = useDispatch();
  const router = useRouter();

  const handleGetMyMissionPlan = async () => {
    const payload = {id: FISCAL_YEAR_ID}
    getMyMissionPlan(payload)
    .unwrap()
    .then(() => {})
  }


  useEffect(() => {
    handleGetMyMissionPlan()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[FISCAL_YEAR_ID])

  useEffect(() => {
    if (!isLoading && my_mission_plan?.data?.mission_plan) {
      dispatch(
        updateMissionPlanPreview({
          isPreview: true,
        })
      );
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="p-5">
      {isLoading ? (
        <div className="h-[70vh] grid place-content-center">
          <ManceLogoLoader />
        </div>
      ) : !my_mission_plan?.data?.mission_plan ? (
        <EmptyState text="Create your Mission plan by using the button below">
          <div className="flex flex-col gap-3">
            <Button
              onClick={() =>
                router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=overview`)
              }
            >
              Create Mission Plan{" "}
            </Button>
            {user_info?.role !== SUPER_ADMIN &&
              (user_info?.is_line_manager as boolean) && (
                <Button variant="outline"> Assign Task </Button>
              )}
          </div>
        </EmptyState>
      ) : (
        <Preview data={my_mission_plan?.data?.mission_plan} />
      )}
    </div>
  );
};

export default MyMissionPlan;
