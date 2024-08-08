import React, { useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { missionStatementSchema } from "@/utils/schema/mission-plan";
import { useCreateMissionStatementMutation, useGetMyMissionPlanQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { PageLoader } from "@/components/custom-loader";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dictionary } from "@/@types/dictionary";
import routesPath from "@/utils/routes";

const { ADMIN } = routesPath

const MissionStatement = () => {
  const router = useRouter();
  const location = usePathname();
  const dispatch = useAppDispatch();

  const { data: mission_plan, isLoading: isLoadingMissionPlan, isFetching: isFetchingMissionPlan, isSuccess: fetchedMissionPlan, refetch: refetchMissionPlan } = useGetMyMissionPlanQuery({})
  const [createMissionStatement, { isLoading }] = useCreateMissionStatementMutation()

  const { mission_plan: mission_plan_info } = useAppSelector((state) => state.mission_plan)
  console.log(mission_plan)
  const handleFormSubmit = async (values: Dictionary) => {
    createMissionStatement(values)
    .unwrap()
    .then((data) => {
      console.log(data)
      toast.success("Mission Statement Created Successfully")
      router.push(`${ADMIN.CREATE_MISSION_PLAN}?ui=measure-success`);
    })
  }

  const formik = useFormik({
    initialValues: {
      mission: (mission_plan_info?.mission_plan?.mission_statement?.mission as string) || "",
      mission_statement_id: mission_plan_info?.mission_plan?.mission_statement?.id || "",
      mission_plan_id: mission_plan_info?.mission_plan?.id || "",
      fiscal_year_id: mission_plan_info?.mission_plan?.fiscal_year_id || mission_plan_info?.active_fy_info?.id || "",
    },
    validationSchema: missionStatementSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true
  });


  useEffect(() => {
    refetchMissionPlan()
  },[])

  useEffect(() => {
    if (fetchedMissionPlan) {
      dispatch(updateMissionPlanDetails({ slug: 'mission_plan', data: mission_plan?.data }))
    }
  }, [mission_plan, fetchedMissionPlan])

  return (
    <form onSubmit={formik.handleSubmit} className="w-full ">
      {/* Mission and Vision */}
      {
        isLoadingMissionPlan || isFetchingMissionPlan ?
          <div className="h-[75vh] grid place-content-center">
            <PageLoader />
          </div> :
          <div className="mb-8">
            <div className="flex items-center gap-x-2 mb-6">
              <h1 className="text-[#3E4345]">Mission statement</h1>
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
                placeholder="Input Staff Name"
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
      }

    </form>
  );
};

export default MissionStatement;
