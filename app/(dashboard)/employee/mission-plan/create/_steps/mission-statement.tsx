import { Dictionary } from "@/@types/dictionary";
import { PageLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import {
  useCreateMissionStatementMutation,
  useLazyGetMyMissionPlanQuery,
} from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import routesPath from "@/utils/routes";
import { missionStatementSchema } from "@/utils/schema/mission-plan";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { toast } from "sonner";

// const { ADMIN, EMPLOYEE } = routesPath;

interface myComponentProps {
  onNextStep?: () => void
}

const MissionStatement = ({onNextStep}: myComponentProps) => {
  const router = useRouter();
  const location = usePathname();
  const dispatch = useAppDispatch();

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

  const [createMissionStatement, { isLoading }] =
    useCreateMissionStatementMutation();

  const handleGetMyMissionPlan = async () => {
    const payload = { id: FISCAL_YEAR_ID };
    getMyMissionPlan(payload)
      .unwrap()
      .then((payload) => {});
  };

  const handleFormSubmit = async (values: Dictionary) => {
    createMissionStatement(values)
      .unwrap()
      .then((data) => {
        toast.success("Mission Statement Created Successfully");
        onNextStep && onNextStep()
        // router.push(`${EMPLOYEE.CREATE_MISSION_PLAN}?ui=measure-success`);
      });
  };

  const formik = useFormik({
    initialValues: {
      mission:
        (mission_plan_info?.mission_plan?.mission_statement
          ?.mission as string) || "",
      mission_statement_id:
        mission_plan_info?.mission_plan?.mission_statement?.id || "",
      mission_plan_id: mission_plan_info?.mission_plan?.id || "",
      fiscal_year_id:
        mission_plan_info?.mission_plan?.fiscal_year_id ||
        mission_plan_info?.active_fy_info?.id ||
        "",
    },
    validationSchema: missionStatementSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

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

  return (
    <form onSubmit={formik.handleSubmit} className="w-full ">
      {/* Mission and Vision */}
      {isLoadingMissionPlan || isFetchingMissionPlan ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <div className="mb-8">
          <div className="flex items-center gap-x-2 mb-6">
            <h2 className="text-[#3E4345]">Mission statement</h2>
            <span>
              <BsFillInfoCircleFill color="#84919A" />
            </span>
          </div>
          <div className="w-full flex-1">
            <label
              htmlFor="missionstatement"
              className=" text-xs text-[#6E7C87] font-normal pb-2"
            >
              Set Mission Statement
            </label>
            <Textarea
              rows={3}
              id="mission"
              name="mission"
              placeholder="Input Mission Statement"
              className="mt-1 lg:w-1/2 block px-3 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
              onChange={formik.handleChange}
              touched={formik.touched.mission}
              value={formik.values.mission}
              error={formik.errors.mission}
            />
            {/* {formik.errors.mission &&
                formik.touched.mission && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.mission}
                  </div>
                )} */}
          </div>
          <div className="mt-8 flex gap-x-2 items-center">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push(`${location}?ui=overview`)}
              className={`text-[var(--primary-color)] py-5 px-2 rounded-sm bg-transparent border border-[var(--primary-color)] min-w-28`}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loadingText="Save & Continue"
              className={cn(
                "w-full",
                !formik.isValid || !formik.dirty
                  ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm "
                  : "cursor-pointer text-white py-5 px-2 rounded-sm bg-[var(--primary-color)] border border-[var(--primary-color)] w-max"
              )}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default MissionStatement;
