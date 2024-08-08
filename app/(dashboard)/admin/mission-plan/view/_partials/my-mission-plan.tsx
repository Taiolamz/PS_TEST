import { Dictionary } from "@/@types/dictionary";
import { PageLoader } from "@/components/custom-loader";
import { EmptyState } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { useGetMyMissionPlanQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppSelector } from "@/redux/store";
import { getAvailableTabs, SUPER_ADMIN } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Preview from "./preview";
import { updateMissionPlanPreview } from "@/redux/features/mission-plan/missionPlanPreviewSlice";
import { useDispatch } from "react-redux";

const { ADMIN } = routesPath;

const MyMissionPlan = () => {
  const { data: my_mission_plan, isLoading } = useGetMyMissionPlanQuery({});
  const user_info: Dictionary = useAppSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  const router = useRouter();

  // console.log(my_mission_plan)

  useEffect(() => {
    if (!isLoading && my_mission_plan?.data?.mission_plan) {
      dispatch(
        updateMissionPlanPreview({
          isPreview: true,
        })
      );
    } else {
      dispatch(
        updateMissionPlanPreview({
          isPreview: false,
        })
      );
    }
  }, [isLoading]);

  return (
    <div className="p-5">
      {isLoading ? (
        <div className="h-[70vh] grid place-content-center">
          <PageLoader />
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
        <Preview />
      )}
    </div>
  );
};

export default MyMissionPlan;
